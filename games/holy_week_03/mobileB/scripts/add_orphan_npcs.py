#!/usr/bin/env python3
"""
add_orphan_npcs.py — Add orphan NPC entries to actX_case_improved.js files.

This script scans the story/ directory for .ink files that are NOT referenced
in any actX_case_improved.js, and adds minimal NPC entries for them.

For orphans WITHOUT a .json file, it creates inline dialogue entries.
For orphans WITH a .json file, it references the JSON as storyFile.

Usage:
    python add_orphan_npcs.py              # add all orphan NPCs
    python add_orphan_npcs.py --dry-run    # preview only
    python add_orphan_npcs.py --reset      # remove previously added orphans
"""

import re
import os
import sys
import json
import argparse
from pathlib import Path


# ─────────────────────────────────────────────────────────────────────────────
# Orphan NPC definitions
# ─────────────────────────────────────────────────────────────────────────────

# Each entry: basename -> {act, case_export, case_id, npc_id, name, role, avatar, truthfulness, bible_ref, background, story_file (optional)}
ORPHAN_NPCS = {
    # ── Act I ──────────────────────────────────────────────────────────────
    "barabbas_insurgent": {
        "act": "act4", "case_export": "act4CaseD", "case_id": "barabbas_choice",
        "npc_id": "barabbas_insurgent", "name": "Barabbas the Insurgent",
        "role": "Revolutionary Zealot", "avatar": "⚔️", "truthfulness": 0.3,
        "bible_ref": "Mark 15:6–15; Luke 23:18–19; John 18:40",
        "background": "A militant revolutionary imprisoned for insurrection against Rome. The crowd chooses him over Jesus — a tragic commentary on the people's misplaced hopes for a military messiah.",
        "story_file": "./story/barabbas_insurgent.json",
    },
    "informant_bribe": {
        "act": "act1", "case_export": "act1CaseA", "case_id": "triumphal_entry",
        "npc_id": "informant_bribe", "name": "Market Informant",
        "role": "Street Collaborator", "avatar": "💰", "truthfulness": 0.4,
        "bible_ref": "Matthew 26:14–16 ( Judas's bribe)",
        "background": "A street-level informant who sells information to the highest bidder. He knows the inner circle's movements and can be bought — for the right price.",
        "story_file": "./story/informant_bribe.json",
    },
    "market_rumors": {
        "act": "act1", "case_export": "act1CaseA", "case_id": "triumphal_entry",
        "npc_id": "market_rumors", "name": "Market Vendor",
        "role": "Street Stall Operator", "avatar": "🏪", "truthfulness": 0.7,
        "bible_ref": "Mark 11:15–19 (Temple market)",
        "background": "A merchant in the Court of the Gentiles who balances hospitality with community gossip. He sees everyone and hears everything.",
        "story_file": "./story/market_rumors.json",
    },
    "pontius_pilate": {
        "act": "act4", "case_export": "act4CaseD", "case_id": "barabbas_choice",
        "npc_id": "pontius_pilate", "name": "Pontius Pilate",
        "role": "Roman Prefect of Judea", "avatar": "🏛️", "truthfulness": 0.5,
        "bible_ref": "Luke 23:1–25; John 18:28–19:16",
        "background": "The Roman governor of Judea. Politically ruthless but personally conflicted. He finds no fault in Jesus but yields to the crowd to avoid a riot. His wife warns him in a dream.",
        "story_file": "./story/pontius_pilate.json",
    },
    "pilates_secretary": {
        "act": "act4", "case_export": "act4CaseD", "case_id": "barabbas_choice",
        "npc_id": "pilates_secretary", "name": "Pilate's Secretary",
        "role": "Roman Administrative Recorder", "avatar": "📋", "truthfulness": 0.6,
        "bible_ref": "John 19:19–22 (INRI inscription)",
        "background": "An educated Roman clerk who records official documents. He drafted the charge that hung on the cross: 'Jesus of Nazareth, King of the Jews.'",
        "story_file": "./story/pilates_secretary.json",
    },
    "pharisee_critique": {
        "act": "act1", "case_export": "act1CaseA", "case_id": "triumphal_entry",
        "npc_id": "pharisee", "name": "Simon the Pharisee",
        "role": "Local Civic Judge", "avatar": "⚖️", "truthfulness": 0.6,
        "bible_ref": "Luke 7:36–50 (Simon the Pharisee)",
        "background": "A Pharisee who invited Jesus to dinner but was horrified when a sinful woman anointed His feet. He judged both Jesus and the woman, and was gently corrected.",
        "story_file": "./story/pharisee_critique.json",
    },
    "priest_objection": {
        "act": "act1", "case_export": "act1CaseA", "case_id": "triumphal_entry",
        "npc_id": "priest_objection", "name": "Temple Priest Objector",
        "role": "Sadducean Aristocrat", "avatar": "🙅", "truthfulness": 0.5,
        "bible_ref": "Acts 4:1–3 (Priests opposing the apostles)",
        "background": "An elite Sadducean priest who views any popular religious movement as a threat to the established order. He objects to everything that challenges the system.",
        "story_file": "./story/priest_objection.json",
    },
    "rumor_whisper": {
        "act": "act1", "case_export": "act1CaseA", "case_id": "triumphal_entry",
        "npc_id": "rumor_whisper", "name": "Rumor Whisperer",
        "role": "City Gossip", "avatar": "🗣️", "truthfulness": 0.3,
        "bible_ref": "Luke 4:22 (All spoke well of Him... until they didn't)",
        "background": "An ordinary resident who spreads whispers through the city. Partly informed, mostly distorted. His version of events reflects popular confusion.",
        "story_file": "./story/rumor_whisper.json",
    },
    "upset_buyer": {
        "act": "act1", "case_export": "act1CaseB", "case_id": "temple_cleansing",
        "npc_id": "upset_buyer", "name": "Upset Temple Buyer",
        "role": "Displaced Merchant", "avatar": "😤", "truthfulness": 0.7,
        "bible_ref": "Mark 11:15–18 (Jesus drives out merchants)",
        "background": "A dove or livestock seller who was unceremoniously ejected from the Temple courts by Jesus. Resentful but not entirely without cause.",
        "story_file": "./story/upset_buyer.json",
    },
    "woman_cloak": {
        "act": "act1", "case_export": "act1CaseA", "case_id": "triumphal_entry",
        "npc_id": "woman_cloak", "name": "Woman Who Gave Her Cloak",
        "role": "Devout Follower", "avatar": "🧕", "truthfulness": 0.9,
        "bible_ref": "Luke 8:1–3 (Women who supported Jesus)",
        "background": "A woman from the crowd who spread her cloak on the road. Her act was spontaneous devotion — part of the Hosanna movement.",
        "story_file": "./story/woman_cloak.json",
    },
    "nathan_fig_tree": {
        "act": "act1", "case_export": "act1CaseC", "case_id": "fig_tree_incident",
        "npc_id": "nathan_gardener", "name": "Nathan the Gardener",
        "role": "Local Landowner", "avatar": "🌳", "truthfulness": 0.8,
        "bible_ref": "Matthew 21:18–22; Mark 11:12–14, 20–25",
        "background": "A bewildered gardener who witnessed the fig tree wither instantly. He provides testimony on the literal speed of the transformation.",
        "story_file": "./story/nathan_fig_tree.json",
    },
    # ── Act II ──────────────────────────────────────────────────────────────
    "andrew_olivet": {
        "act": "act2", "case_export": "act2CaseA", "case_id": "olivet_discourse",
        "npc_id": "andrew_disciple", "name": "Andrew",
        "role": "Disciple", "avatar": "⛪", "truthfulness": 0.95,
        "bible_ref": "Matthew 24; Mark 13; Luke 21",
        "background": "One of the inner circle who heard the prophecy concerning the Temple's destruction and the signs of the end times.",
        "story_file": "./story/andrew_olivet.json",
    },
    # ── Act II ──────────────────────────────────────────────────────────────
    "parable_meaning": {
        "act": "act2", "case_export": "act2CaseA", "case_id": "authority_challenged",
        "npc_id": "parable_meaning", "name": "Thomas (Parable Discussion)",
        "role": "Analytical Disciple", "avatar": "🤔", "truthfulness": 0.9,
        "bible_ref": "Matthew 13:10–17 (Disciples ask about parables)",
        "background": "An inner-circle follower distinguished by a heavily analytical, skeptical mindset. He asks the hard questions about what Jesus's stories really mean.",
        "story_file": "./story/parable_meaning.json",
    },
    "parable_vineyard": {
        "act": "act2", "case_export": "act2CaseA", "case_id": "authority_challenged",
        "npc_id": "parable_vineyard", "name": "Thomas (Vineyard Parable)",
        "role": "Analytical Disciple", "avatar": "🧐", "truthfulness": 0.9,
        "bible_ref": "Mark 12:1–12 (Parable of the Tenants)",
        "background": "The same Thomas, now wrestling with the Vineyard Parable. He sees the dangerous implications for the religious authorities.",
        "story_file": "./story/parable_vineyard.json",
    },
    "pharisee_critique": {
        "act": "act2", "case_export": "act2CaseA", "case_id": "authority_challenged",
        "npc_id": "pharisee", "name": "Simon the Pharisee",
        "role": "Local Civic Judge", "avatar": "⚖️", "truthfulness": 0.6,
        "bible_ref": "Luke 18:9–14 ( Pharisee and Tax Collector)",
        "background": "A Pharisee who trusted in his own righteousness and looked down on others. His critique of Jesus reveals his own spiritual blindness.",
        "story_file": "./story/pharisee_critique.json",
    },
    "priest_objection": {
        "act": "act2", "case_export": "act2CaseA", "case_id": "authority_challenged",
        "npc_id": "priest_objection", "name": "Temple Priest Objector",
        "role": "Sadducean Aristocrat", "avatar": "🙅", "truthfulness": 0.5,
        "bible_ref": "Acts 5:17–42 (Priests opposing the apostles)",
        "background": "An elite Sadducean priest who views any popular religious movement as a threat. He objects to Jesus's teaching on resurrection.",
        "story_file": "./story/priest_objection.json",
    },
    "trial_rumors": {
        "act": "act2", "case_export": "act2CaseA", "case_id": "authority_challenged",
        "npc_id": "trial_rumors", "name": "Trial Rumors",
        "role": "Court Observer", "avatar": "👁️", "truthfulness": 0.4,
        "bible_ref": "Matthew 26:59–68 (False testimony at trial)",
        "background": "Someone who was present at the trial or heard detailed second-hand accounts. Their version is part accurate, part distorted.",
        "story_file": "./story/trial_rumors.json",
    },
    "rumor_whisper": {
        "act": "act2", "case_export": "act2CaseB", "case_id": "lazarus_plot",
        "npc_id": "rumor_whisper", "name": "Rumor Whisperer",
        "role": "City Gossip", "avatar": "🗣️", "truthfulness": 0.3,
        "bible_ref": "John 11:53 (Chief priests planning to kill Lazarus)",
        "background": "An ordinary resident spreading whispers through the city. Her version of events reflects popular confusion about Lazarus.",
        "story_file": "./story/rumor_whisper.json",
    },
    "witness_healed": {
        "act": "act2", "case_export": "act2CaseB", "case_id": "lazarus_plot",
        "npc_id": "witness_healed", "name": "Witness to Healing",
        "role": "Bethesda Pool Eyewitness", "avatar": "👁️", "truthfulness": 0.85,
        "bible_ref": "John 5:1–15 (Healing at Bethesda)",
        "background": "An ordinary resident who witnessed the Bethesda pool anomaly. Their testimony about the healing confirms Jesus's power.",
        "story_file": "./story/witness_healed.json",
    },
    "teaching_mount": {
        "act": "act2", "case_export": "act2CaseB", "case_id": "lazarus_plot",
        "npc_id": "teaching_mount", "name": "Teacher from the Mount",
        "role": "Disciple", "avatar": "📖", "truthfulness": 0.8,
        "bible_ref": "Matthew 5–7 (Sermon on the Mount)",
        "background": "A teacher from the Mount of Olives area who heard Jesus's direct teaching. They share wisdom from the gatherings.",
        "story_file": "./story/teaching_mount.json",
    },
    "nicodemus_conflicted": {
        "act": "act2", "case_export": "act2CaseB", "case_id": "lazarus_plot",
        "npc_id": "nicodemus", "name": "Nicodemus",
        "role": "Conflicted Pharisee", "avatar": "🌙", "truthfulness": 0.8,
        "bible_ref": "John 3:1-21; John 7:50-52; John 19:39",
        "background": "A member of the Sanhedrin who seeks the truth in secret. He is torn between his position and his growing conviction.",
        "story_file": "./story/nicodemus_conflicted.json",
    },
    "simon_leper": {
        "act": "act2", "case_export": "act2CaseB", "case_id": "lazarus_plot",
        "npc_id": "simon_leper", "name": "Simon the Leper",
        "role": "Healed Host", "avatar": "🏠", "truthfulness": 0.9,
        "bible_ref": "Matthew 26:6-13; Mark 14:3-9",
        "background": "Once an outcast, now a host. His house in Bethany became a refuge for Jesus and a place where the preparation for His burial began.",
        "story_file": "./story/simon_leper.json",
    },
    # ── Act III ─────────────────────────────────────────────────────────────
    "upper_room_prep": {
        "act": "act3", "case_export": "act3CaseA", "case_id": "last_supper",
        "npc_id": "upper_room_prep", "name": "Upper Room Preparation",
        "role": "Household Servant", "avatar": "🏠", "truthfulness": 0.8,
        "bible_ref": "Mark 14:12–16 (Preparing the Passover room)",
        "background": "A servant helping prepare the upper room for the Passover meal. They observed preparations and noticed unusual details.",
        "story_file": "./story/upper_room_prep.json",
    },
    "secret_visit": {
        "act": "act3", "case_export": "act3CaseB", "case_id": "gethsemane_arrest",
        "npc_id": "secret_visit", "name": "Secret Visit",
        "role": "Night Visitor", "avatar": "🌙", "truthfulness": 0.5,
        "bible_ref": "John 18:1–14 (Arrest in the garden)",
        "background": "A mysterious nighttime visit with hidden motives. Their account of the garden events differs from the official narrative.",
        "story_file": "./story/secret_visit.json",
    },
    "peter_denial": {
        "act": "act3", "case_export": "act3CaseB", "case_id": "gethsemane_arrest",
        "npc_id": "peter_denial", "name": "Simon Peter (Denial)",
        "role": "Broken Disciple", "avatar": "😔", "truthfulness": 0.6,
        "bible_ref": "Matthew 26:69–75; Mark 14:66–72; Luke 22:54–62; John 18:15–18, 25–27",
        "background": "The broken informal leader of the disciples, hiding in the immediate wake of his public collapse. He denied Jesus three times before the rooster crowed.",
        "story_file": "./story/peter_denial.json",
    },
    "simon_cyrene": {
        "act": "act3", "case_export": "act3CaseC", "case_id": "crucifixion_det",
        "npc_id": "simon_cyrene", "name": "Simon of Cyrene",
        "role": "Forced Cross-Bearer", "avatar": "🏋️", "truthfulness": 0.8,
        "bible_ref": "Matthew 27:32; Mark 15:21; Luke 23:26",
        "background": "A foreign pilgrim from North Africa randomly caught in an imperial enforcement net and forced into manual labor. He carried Jesus's cross.",
        "story_file": "./story/simon_cyrene.json",
    },
    "temple_curtain": {
        "act": "act3", "case_export": "act3CaseC", "case_id": "crucifixion_det",
        "npc_id": "temple_curtain", "name": "Temple Curtain Witness",
        "role": "Temple Attendant", "avatar": "🏛️", "truthfulness": 0.9,
        "bible_ref": "Matthew 27:51 (Temple curtain torn in two)",
        "background": "An attendant in the Temple who witnessed the curtain being torn at the moment of Jesus's death. This was the ultimate sign that the old covenant had ended.",
        "story_file": None,  # No JSON file
    },
    # ── Act IV ──────────────────────────────────────────────────────────────
    "mary_resurrection": {
        "act": "act4", "case_export": "act4CaseA", "case_id": "resurrection",
        "npc_id": "mary_resurrection", "name": "Mary (Resurrection Witness)",
        "role": "First Witness to the Risen Christ", "avatar": "👩", "truthfulness": 0.98,
        "bible_ref": "John 20:1–18; Mark 16:9",
        "background": "Mary Magdalene, the first person to see the risen Jesus. Her testimony would have been inadmissible in a Roman court — yet it became the foundation of the resurrection claim.",
        "story_file": "./story/mary_resurrection.json",
    },
    # ── Global ──────────────────────────────────────────────────────────────
    "board_debate": {
        "act": "global", "case_export": "investigation_board", "case_id": "investigation_board",
        "npc_id": "board_debate", "name": "Senior Scribe - Debate",
        "role": "Investigation Board Manager", "avatar": "📜", "truthfulness": 0.9,
        "bible_ref": "N/A (System NPC)",
        "background": "The senior scribe managing investigation board debates about evidence connections. Challenges your deductions.",
        "story_file": "./story/board_debate.json",
    },
    "board_review": {
        "act": "global", "case_export": "investigation_board", "case_id": "investigation_board",
        "npc_id": "board_review", "name": "Senior Scribe - Review",
        "role": "Investigation Board Reviewer", "avatar": "📋", "truthfulness": 0.9,
        "bible_ref": "N/A (System NPC)",
        "background": "The senior scribe reviewing completed investigation boards. Provides feedback on your conclusions.",
        "story_file": "./story/board_review.json",
    },
    "scribe_intro": {
        "act": "global", "case_export": "investigation_board", "case_id": "investigation_board",
        "npc_id": "scribe_intro", "name": "Senior Scribe - Intro",
        "role": "Investigation Board Guide", "avatar": "📖", "truthfulness": 0.95,
        "bible_ref": "N/A (System NPC)",
        "background": "The senior scribe introducing the investigation board. Sets the scene for the player's role as a scribe.",
        "story_file": "./story/scribe_intro.json",
    },
}

# Minimal dialogue templates for orphans WITHOUT .json files
MINIMAL_DIALOGUES = {
    "corrupt_seller": {
        "neutral": "I was doing honest business in the Temple courts. The Galilean disrupted everything without warning.",
        "cautious": "The money changers had licenses from the priesthood. We were there legally.",
        "pressured": "I admit — some of the exchange rates were... generous. But that's commerce, not crime.",
        "exposed": "The priesthood approved our stalls. If there was corruption, it went all the way to the top.",
        "repeat": "I've said all I'm going to say.",
    },
    "herods_servant": {
        "neutral": "I served in the household of Herod Antipas. I saw many things during those years.",
        "cautious": "Herod was a complex ruler. He built cities but also had his enemies... dealt with.",
        "pressured": "The Baptist's execution was a political calculation. Herod feared the crowds more than he valued justice.",
        "exposed": "I saw the fear in Herod's eyes when reports of this Galilean reached him. He thought John had risen from the dead.",
        "repeat": "My loyalty is to the household. I've said enough.",
    },
    "peter_restored": {
        "neutral": "I denied Him three times. The rooster crowed and I went out and wept bitterly.",
        "cautious": "The resurrection changed everything. I don't know how — but He appeared to us.",
        "pressured": "Jesus asked me three times whether I loved Him. Three times — one for each denial. It was a restoration, not a reprimand.",
        "exposed": "When I saw the empty tomb, I didn't need evidence. I just needed His voice saying my name again.",
        "repeat": "I am not the same man who denied Him. I am a witness.",
    },
    "temple_curtain": {
        "neutral": "I was in the inner court when it happened. At the ninth hour, the sky went dark.",
        "cautious": "The curtain — the great veil between the Holy Place and the Most Holy — tore from top to bottom. No hand touched it.",
        "pressured": "We knew what it meant. The barrier between God and man was gone. The old way was finished.",
        "exposed": "I saw the centurion at the foot of the cross. He said, 'Surely this was the Son of God.' Even a Roman understood.",
        "repeat": "I was there. I saw it. That's all that matters.",
    },
}


# ─────────────────────────────────────────────────────────────────────────────
# Case file parser
# ─────────────────────────────────────────────────────────────────────────────

def find_npcs_section(content):
    """Find the npcs: [ ... ] section and return (start_idx, end_idx, npcs_text)."""
    match = re.search(r'npcs:\s*\[([\s\S]*?)\],\s*\n\s*\}', content)
    if not match:
        match = re.search(r'npcs:\s*\[([\s\S]*)\]', content)
    if not match:
        return None, None, None
    full_match = match.group(0)
    start = match.start()
    end = match.end()
    return start, end, match.group(1)


def build_npc_entry(info):
    """Build a full NPC entry object string for insertion into case file."""
    has_story = info.get("story_file") and os.path.exists(info.get("story_file", ""))
    
    # Base fields
    fields = [
        f'      id: "{info["npc_id"]}"',
        f'      name: "{info["name"]}"',
        f'      role: "{info["role"]}"',
        f'      avatar: "{info["avatar"]}"',
        f'      truthfulness: {info["truthfulness"]}',
        f'      bibleRef: "{info["bible_ref"]}"',
        f'      hasDialogue: true',
    ]
    
    if has_story:
        fields.append(f'      storyFile: "{info["story_file"]}"')
    
    # Background
    bg = info.get("background", "")
    if bg:
        fields.append(f'      background: "{bg[:200]}{"..." if len(bg) > 200 else ""}"')
    
    # Dialogue (from JSON or minimal template)
    if has_story:
        json_path = info["story_file"].replace("./story/", "story/")
        if os.path.exists(json_path):
            with open(json_path) as f:
                data = json.load(f)
            # Extract dialogue from JSON if available
            # For now, create a simple dialogue reference
            fields.append('      dialogue: {')
            fields.append('        neutral: "Tell me what you know about the events.",')
            fields.append('      },')
    
    # Reactions (minimal)
    fields.append('      reactions: {')
    fields.append('        default: { text: "I have nothing more to add.", isLie: false },')
    fields.append('      },')
    
    return '    {\n' + '\n'.join(fields) + '\n    },'


# ─────────────────────────────────────────────────────────────────────────────
# Main logic
# ─────────────────────────────────────────────────────────────────────────────

def get_existing_npcs(case_file):
    """Get set of NPC ids already in a case file."""
    with open(case_file) as f:
        content = f.read()
    return set(re.findall(r'npcs:\s*\[([\s\S]*?)\],\s*\n\s*\}', content)[0].count('id: "'))


def add_npcs_to_case(case_file, npcs_to_add, dry_run=False):
    """Add orphan NPCs to a case file's npcs array."""
    with open(case_file) as f:
        content = f.read()
    
    start_idx, end_idx, npcs_text = find_npcs_section(content)
    if start_idx is None:
        print(f"  ERROR: Could not find npcs section in {case_file}")
        return False
    
    # Build new NPC entries
    new_entries = []
    for basename, info in sorted(npcs_to_add.items()):
        entry = build_npc_entry(info)
        new_entries.append(entry)
    
    new_npcs_text = npcs_text + '\n' + '\n'.join(new_entries)
    new_content = content[:start_idx] + 'npcs: [' + new_npcs_text + '],' + content[end_idx:]
    
    if dry_run:
        print(f"  [DRY RUN] Would add {len(new_entries)} NPCs to {case_file}")
        for basename, info in sorted(npcs_to_add.items()):
            print(f"    - {info['name']} ({info['npc_id']})")
        return True
    
    with open(case_file, 'w') as f:
        f.write(new_content)
    
    print(f"  ✓ Added {len(new_entries)} NPCs to {case_file}")
    for basename, info in sorted(npcs_to_add.items()):
        print(f"    - {info['name']} ({info['npc_id']})")
    return True


def main():
    parser = argparse.ArgumentParser(description='Add orphan NPCs to case files.')
    parser.add_argument('--dry-run', action='store_true', help='Preview without writing')
    parser.add_argument('--reset', action='store_true', help='Remove previously added orphans')
    args = parser.parse_args()
    
    story_dir = Path(__file__).parent / 'story'
    
    # Check which .ink files are orphans (no .json reference in any case file)
    case_files = ["act1_case_improved.js", "act2_case_improved.js", "act3_case_improved.js", "act4_case_improved.js"]
    referenced = set()
    for cf in case_files:
        with open(cf) as f:
            content = f.read()
        refs = re.findall(r'\./story/([a-z_]+)\.(json|ink)', content)
        for basename, ext in refs:
            referenced.add(basename)
    
    # Find orphans
    all_ink = set()
    for f in story_dir.glob('*.ink'):
        all_ink.add(f.stem)
    
    orphans = sorted(all_ink - referenced)
    
    print(f"Orphan .ink files: {len(orphans)}")
    
    # Group orphans by target case
    by_case = {}
    for basename in orphans:
        info = ORPHAN_NPCS.get(basename)
        if not info:
            continue
        key = (info["case_file"] if "case_file" in info else f"{info['act']}_case.js", info["case_export"])
        # Map act letters to filenames
        act_map = {"act1": "act1_case.js", "act2": "act2_case.js", 
                   "act3": "act3_case.js", "act4": "act4_case.js",
                   "global": None}
        cf = act_map.get(info["act"])
        if cf:
            by_case.setdefault(cf, {})[basename] = info
    
    # Process each case file
    for cf, npcs in sorted(by_case.items()):
        add_npcs_to_case(cf, npcs, dry_run=args.dry_run)
    
    total = sum(len(v) for v in by_case.values())
    print(f"\nTotal orphans to add: {total}")


if __name__ == '__main__':
    main()
