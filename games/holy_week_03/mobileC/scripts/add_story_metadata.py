#!/usr/bin/env python3
"""
add_story_metadata.py — Add story/prophecy/Bible metadata comments to all .ink files.

This script enriches every .ink file in story/ with a structured comment header containing:
  - CHARACTER name and role
  - ACT and CASE assignment
  - PROPHECIES FULFILLED / BIBLICAL REFERENCES for that case
  - BIBLICAL CONTEXT (summary, historical note)
  - CASE FACTS (Truth Object: culprit, motive, method)
  - WITNESS STATUS (RELIABLE / UNRELIABLE based on case file isLie flags)
  - SOURCE case file reference

For files NOT referenced in any actX_case_2d.js, the script pulls
prophecies from the nearest act's case files based on narrative phase.

Usage:
    python add_story_metadata.py              # add/update all .ink files
    python add_story_metadata.py --dry-run    # preview without writing
    python add_story_metadata.py --reset      # strip existing metadata first
"""

import os
import re
import json
import sys
from pathlib import Path

# ─────────────────────────────────────────────────────────────────────────────
# CONFIGURATION: case file → case export mapping
# ─────────────────────────────────────────────────────────────────────────────
CASE_FILES = [
    ("act1_case.js", [
        "act1CaseA",  # triumpal_entry / The Missing Donkey
        "act1CaseB",  # temple_cleansing / The Overturned Tables
    ]),
    ("act2_case.js", [
        "act2CaseA",  # authority_challenged / The Silenced Teacher
        "act2CaseB",  # lazarus_plot / The Price of Life
    ]),
    ("act3_case.js", [
        "act3CaseA",  # last_supper / The Broken Cup
        "act3CaseB",  # gethsemane_arrest / The Severed Ear
        "act3CaseC",  # crucifixion_det / The Curtain and the Cross
    ]),
    ("act4_case.js", [
        "act4CaseA",  # resurrection / The Empty Tomb
        "act4CaseB",  # roman_inquiry / The Guard's Report
        "act4CaseC",  # peter_restoration / Peter's Restoration
        "act4CaseD",  # barabbas_choice / The People's Choice
    ]),
]

CASE_EXPORT_TO_ID = {
    'act1CaseA': 'triumphal_entry',
    'act1CaseB': 'temple_cleansing',
    'act2CaseA': 'authority_challenged',
    'act2CaseB': 'lazarus_plot',
    'act3CaseA': 'last_supper',
    'act3CaseB': 'gethsemane_arrest',
    'act3CaseC': 'crucifixion_det',
    'act4CaseA': 'resurrection',
    'act4CaseB': 'roman_inquiry',
    'act4CaseC': 'peter_restoration',
    'act4CaseD': 'barabbas_choice',
}

ACT_MAP = {
    'triumphal_entry': 'Act I',
    'temple_cleansing': 'Act I',
    'authority_challenged': 'Act II',
    'lazarus_plot': 'Act II',
    'last_supper': 'Act III',
    'gethsemane_arrest': 'Act III',
    'crucifixion_det': 'Act III/IV',
    'resurrection': 'Act IV/V',
    'barabbas_choice': 'Act IV',
}

# Verified mapping from backward search of storyFile references
STORY_NPC_MAP = {
    'galilean_pilgrim': {'case_export': 'act1CaseA', 'npc_id': 'owner', 'npc_name': 'Tobias'},
    'jerusalem_local': {'case_export': 'act1CaseA', 'npc_id': 'local_skeptic', 'npc_name': 'Jemimah'},
    'peter_donkey': {'case_export': 'act1CaseA', 'npc_id': 'peter', 'npc_name': 'Peter'},
    'john_donkey': {'case_export': 'act1CaseA', 'npc_id': 'john', 'npc_name': 'John'},
    'money_changer': {'case_export': 'act1CaseB', 'npc_id': 'none', 'npc_name': 'Malachi (Money Changer)'},
    'guard_report': {'case_export': 'act1CaseB', 'npc_id': 'garrison_guard', 'npc_name': 'Marcus (Garrison Guard)'},
    'temple_spy': {'case_export': 'act2CaseB', 'npc_id': 'temple_spy', 'npc_name': 'Maluch (Temple Spy)'},
    'annas_patriarch': {'case_export': 'act2CaseB', 'npc_id': 'annas_patriarch', 'npc_name': 'Annas the Patriarch'},
    'martha_bethany': {'case_export': 'act2CaseB', 'npc_id': 'martha_bethany', 'npc_name': 'Martha of Bethany'},
    'john_disciple': {'case_export': 'act3CaseA', 'npc_id': 'john_mark', 'npc_name': 'John Mark'},
    'rhoda_servant': {'case_export': 'act3CaseA', 'npc_id': 'servant', 'npc_name': 'Rhoda'},
    'judas_iscariot': {'case_export': 'act3CaseA', 'npc_id': 'judas', 'npc_name': 'Judas Iscariot'},
    'peter_defense': {'case_export': 'act3CaseB', 'npc_id': 'simon_peter', 'npc_name': 'Simon Peter'},
    'peter_defense_simple': {'case_export': 'act3CaseB', 'npc_id': 'simon_peter', 'npc_name': 'Simon Peter (Simple Defense)'},
    'roman_assessment': {'case_export': 'act3CaseC', 'npc_id': 'centurion_longinus', 'npc_name': 'Centurion Longinus'},
    'caiaphas_priest': {'case_export': 'act3CaseC', 'npc_id': 'temple_priest_pashhur', 'npc_name': 'Pashhur (Temple Priest)'},
    'joseph_arimathea': {'case_export': 'act3CaseC', 'npc_id': 'joseph_arimathea', 'npc_name': 'Joseph of Arimathea'},
    'execution_soldier': {'case_export': 'act4CaseA', 'npc_id': 'marcus', 'npc_name': 'Marcus (Execution Soldier)'},
    'mary_magdalene': {'case_export': 'act4CaseA', 'npc_id': 'mary_magdalene', 'npc_name': 'Mary Magdalene'},
    'barabbas_insurgent': {'case_export': 'act4CaseB', 'npc_id': 'barabbas_insurgent', 'npc_name': 'Barabbas the Insurgent'},
    'pontius_pilate': {'case_export': 'act4CaseB', 'npc_id': 'pontius_pilate', 'npc_name': 'Pontius Pilate'},
    'pilates_secretary': {'case_export': 'act4CaseB', 'npc_id': 'pilates_secretary', 'npc_name': "Pilate's Secretary"},
    'informant_bribe': {'case_export': 'act4CaseB', 'npc_id': 'informant_bribe', 'npc_name': 'Market Informant'},
    'eleazar_sadducee': {'case_export': 'act1CaseA', 'npc_id': 'eleazar', 'npc_name': 'Eleazar (Sadducee)'},
    'simon_cyrene': {'case_export': 'act4CaseB', 'npc_id': 'simon_cyrene', 'npc_name': 'Simon of Cyrene'},
    'peter_denial': {'case_export': 'act3CaseB', 'npc_id': 'peter_denial', 'npc_name': 'Simon Peter (Denial)'},
    'pharisee_critique': {'case_export': 'act2CaseA', 'npc_id': 'pharisee', 'npc_name': 'Pharisee (Nathanael)'},
    'priest_objection': {'case_export': 'act2CaseA', 'npc_id': 'priest_objection', 'npc_name': 'Temple Priest Objection'},
    'parable_meaning': {'case_export': 'act2CaseA', 'npc_id': 'parable_meaning', 'npc_name': 'Thomas (Parable Discussion)'},
    'parable_vineyard': {'case_export': 'act2CaseA', 'npc_id': 'parable_vineyard', 'npc_name': 'Thomas (Vineyard Parable)'},
    'rumor_whisper': {'case_export': 'act2CaseB', 'npc_id': 'rumor_whisper', 'npc_name': 'Rumor Whisperer'},
    'witness_healed': {'case_export': 'act2CaseB', 'npc_id': 'witness_healed', 'npc_name': 'Witness to Healing'},
    'market_rumors': {'case_export': 'act2CaseB', 'npc_id': 'market_rumors', 'npc_name': 'Market Vendor'},
    'teaching_mount': {'case_export': 'act2CaseB', 'npc_id': 'teaching_mount', 'npc_name': 'Teaching on the Mount'},
    'trial_rumors': {'case_export': 'act2CaseB', 'npc_id': 'trial_rumors', 'npc_name': 'Trial Rumors'},
    'upper_room_prep': {'case_export': 'act3CaseA', 'npc_id': 'upper_room_prep', 'npc_name': 'Upper Room Preparation'},
    'nicodemus_conflicted': {'case_export': 'act2CaseB', 'npc_id': 'nicodemus', 'npc_name': 'Nicodemus'},
    'simon_leper': {'case_export': 'act2CaseB', 'npc_id': 'simon_leper', 'npc_name': 'Simon the Leper'},
    'secret_visit': {'case_export': 'act3CaseB', 'npc_id': 'secret_visit', 'npc_name': 'Secret Visit'},
    'board_debate': {'case_export': 'investigation_board', 'npc_id': 'board_debate', 'npc_name': 'Senior Scribe - Debate'},
    'board_review': {'case_export': 'investigation_board', 'npc_id': 'board_review', 'npc_name': 'Senior Scribe - Review'},
    'scribe_intro': {'case_export': 'investigation_board', 'npc_id': 'scribe_intro', 'npc_name': 'Senior Scribe - Intro'},
}

# Fallback descriptions for orphan files
ORPHAN_DESCRIPTIONS = {
    'barabbas_insurgent': 'A revolutionary zealot and militant prisoner favored by populist flashpoints over peaceful reformers.',
    'board_debate': 'The senior scribe managing investigation board debates about evidence connections.',
    'board_review': 'The senior scribe reviewing completed investigation boards.',
    'informant_bribe': 'A street collaborator who sells inner-circle coordinates to the highest bidder.',
    'market_rumors': 'A street stall operator balancing hospitality with community chatter.',
    'parable_meaning': 'Discussion of parable meanings with analytical insight.',
    'parable_vineyard': 'A merchant from Tyre who heard the Galilean s teachings.',
    'peter_defense_simple': 'A simplified version of Simon Peter defense of his actions.',
    'peter_denial': 'The broken informal leader of the disciples, hiding after his public collapse.',
    'pharisee_critique': 'A localized civic judge tracking public boundary compliance.',
    'pilates_secretary': 'An educated Roman administrative recorder responsible for tracking judicial files.',
    'pontius_pilate': 'The Roman Prefect of Judea, responsible for imperial security.',
    'priest_objection': 'An elite Sadducean aristocrat focused on ritual purity and covenantal hierarchy.',
    'rumor_whisper': 'An ordinary resident spreading whispers through the city.',
    'scribe_intro': 'The senior scribe introducing the investigation board.',
    'secret_visit': 'A secret nighttime visit with hidden motives.',
    'simon_cyrene': 'A foreign pilgrim from North Africa forced into carrying the cross.',
    'teaching_mount': 'A teacher from the Mount of Olives area sharing wisdom.',
    'trial_rumors': 'People spreading rumors about the upcoming trial.',
    'upper_room_prep': 'Preparation activities in the upper room before the Passover meal.',
    'witness_healed': 'A witness to the healing at Bethesda.',
    'execution_soldier': 'A regular Roman infantryman desensitized by routine executions.',
    'joseph_arimathea': 'A prominent Sanhedrin member who secretly looked for the Kingdom of God.',
    'mary_magdalene': 'A steadfast follower whose past restoration anchors her to the movement.',
}


# ─────────────────────────────────────────────────────────────────────────────
# Case file parser
# ─────────────────────────────────────────────────────────────────────────────

def load_case_file(cf_name):
    with open(cf_name, 'r', encoding='utf-8') as f:
        return f.read()


def find_case_block(content, case_id):
    """Find the case block by case_id string."""
    idx = content.find(f'id: "{case_id}"')
    if idx == -1:
        return None
    start = content.rfind('export const', 0, idx)
    end = content.find('export const', start + 20)
    if end == -1:
        end = len(content)
    return content[start:end]


def get_case_metadata(case_block):
    """Pull prophecies, biblical context, truth, and reactions from a case block."""
    meta = {}

    # Prophecies
    prop_match = re.search(r'prophecies:\s*\[([\s\S]*?)\]\s*[,}]', case_block)
    if prop_match:
        text = prop_match.group(1)
        refs = re.findall(r'"([^"]+)"', text)
        meta['prophecies'] = refs[:8]

    # Biblical context
    ctx_match = re.search(r'biblicalContext:\s*\{([\s\S]*?)\}', case_block)
    if ctx_match:
        ctx_text = ctx_match.group(1)
        for field in ['summary', 'historicalNote', 'significance']:
            m = re.search(rf'{field}:\s*`([^`]+)`', ctx_text)
            if m:
                meta[field] = m.group(1)

    # Truth object
    truth_match = re.search(r'truth:\s*\{([\s\S]*?)\}', case_block)
    if truth_match:
        t = truth_match.group(1)
        for field in ['culprit', 'motive', 'method']:
            m = re.search(rf'{field}:\s*"([^"]+)"', t)
            if m:
                meta[field] = m.group(1)

    # Case title
    title_m = re.search(r'title:\s*"([^"]+)"', case_block)
    if title_m:
        meta['case_title'] = title_m.group(1)

    return meta


def extract_npc_info(case_block, npc_id):
    """Get NPC name, background, bibleRef, reactions (isLie)."""
    lines = case_block.split('\n')
    start_idx = None
    for i, line in enumerate(lines):
        if f'id: "{npc_id}"' in line:
            start_idx = i
            break
    if start_idx is None:
        return None, []

    npc_lines = lines[start_idx:start_idx + 80]
    npc_text = '\n'.join(npc_lines)

    fields = {}
    for field in ['name', 'background', 'bibleRef', 'truthfulness']:
        m = re.search(rf'{field}:\s*"([^"]+)"', npc_text)
        if m:
            fields[field] = m.group(1)

    # Reactions with isLie flags
    lies = []
    react_match = re.search(r'reactions:\s*\{([\s\S]*?)\}', npc_text)
    if react_match:
        for m in re.finditer(r'"([^"]+)":\s*\{[^}]*isLie:\s*true', react_match.group(1)):
            lies.append(m.group(1))

    return fields, lies


# ─────────────────────────────────────────────────────────────────────────────
# Metadata builder
# ─────────────────────────────────────────────────────────────────────────────

def build_metadata(basename, case_meta, npc_fields, lies, act_name, case_title, npc_name):
    """Build the // comment header block."""
    lines = []

    lines.append("// ============================================================")
    lines.append(f"// CHARACTER: {npc_name}")

    background = npc_fields.get('background', ORPHAN_DESCRIPTIONS.get(basename, ''))
    if background:
        bg = background[:200] + ('...' if len(background) > 200 else '')
        lines.append(f"// BACKGROUND: {bg}")

    lines.append(f"// ACT: {act_name}")
    lines.append(f"// CASE: {case_title}")

    bible_ref = npc_fields.get('bibleRef', '')
    if bible_ref:
        lines.append(f"// BIBLE REFERENCE: {bible_ref}")

    # Prophecies
    prophecies = case_meta.get('prophecies', [])
    if prophecies:
        lines.append("// ------------------------------------------------------------")
        lines.append("// PROPHECIES FULFILLED IN THIS CASE:")
        for p in prophecies[:6]:
            lines.append(f"//   - {p}")
        if case_meta.get('gospel_link'):
            lines.append(f"//     Gospel: {case_meta['gospel_link']}")
        if case_meta.get('significance'):
            sig = case_meta['significance'][:180] + ('...' if len(case_meta['significance']) > 180 else '')
            lines.append(f"//     Insight: {sig}")

    # Biblical context
    if case_meta.get('summary') or case_meta.get('historicalNote'):
        lines.append("// ------------------------------------------------------------")
        lines.append("// BIBLICAL CONTEXT:")
        if case_meta.get('summary'):
            s = case_meta['summary'][:220] + ('...' if len(case_meta['summary']) > 220 else '')
            lines.append(f"//   Summary: {s}")
        if case_meta.get('historicalNote'):
            h = case_meta['historicalNote'][:220] + ('...' if len(case_meta['historicalNote']) > 220 else '')
            lines.append(f"//   Historical Note: {h}")

    # Case facts
    if case_meta.get('culprit') or case_meta.get('motive'):
        lines.append("// ------------------------------------------------------------")
        lines.append("// CASE FACTS (Truth Object):")
        for k in ['culprit', 'motive', 'method']:
            if case_meta.get(k):
                v = case_meta[k][:220] + ('...' if len(case_meta[k]) > 220 else '')
                lines.append(f"//   {k}: {v}")

    # Witness status
    lines.append("// ------------------------------------------------------------")
    if lies:
        lines.append(f"// WITNESS STATUS: UNRELIABLE — Lies detected in reactions: {', '.join(lies)}")
    else:
        lines.append("// WITNESS STATUS: RELIABLE — No lies detected in reactions")

    lines.append("// ============================================================")
    lines.append("//")

    return lines


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def strip_existing_metadata(content):
    """Remove existing // metadata header block from .ink file."""
    lines = content.split('\n')
    new_lines = []
    skip_until_story = True
    for line in lines:
        stripped = line.strip()
        if skip_until_story:
            # Skip comment lines and blank lines at the top
            if stripped.startswith('//') or stripped == '':
                continue
            else:
                skip_until_story = False
                new_lines.append(line)
        else:
            new_lines.append(line)
    return '\n'.join(new_lines)


def process_file(ink_path, case_lookup, dry_run=False, reset=False):
    """Process a single .ink file."""
    basename = ink_path.stem
    content = ink_path.read_text(encoding='utf-8')

    # Skip pure-comment files (no story nodes)
    if not re.search(r'^===\s*\w+\s*===', content, re.MULTILINE):
        return 'skip', 'no story nodes'

    if reset:
        content = strip_existing_metadata(content)
        # Re-add from scratch
        if basename not in case_lookup:
            return 'skip', 'no case mapping for orphan file'

    # Look up case info
    info = case_lookup.get(basename)
    if not info:
        return 'skip', 'no case mapping'

    case_export = info['case_export']
    npc_id = info['npc_id']
    npc_name = info['npc_name']
    cf_name = info['cf']

    # Find case block
    case_id = CASE_EXPORT_TO_ID.get(case_export, case_export)
    case_content = load_case_file(cf_name)
    case_block = find_case_block(case_content, case_id)
    if not case_block:
        return 'skip', f'case block not found for {case_export} ({case_id})'

    # Extract metadata
    case_meta = get_case_metadata(case_block)
    npc_fields, lies = extract_npc_info(case_block, npc_id)

    act_name = ACT_MAP.get(case_id, 'Unknown')
    case_title = case_meta.get('case_title', case_export)

    # Build header
    header_lines = build_metadata(basename, case_meta, npc_fields, lies, act_name, case_title, npc_name)

    # Remove existing header if present
    clean_content = content
    if re.search(r'^// ={70}', content, re.MULTILINE):
        clean_content = strip_existing_metadata(content)

    new_content = '\n'.join(header_lines) + '\n\n' + clean_content.lstrip('\n')

    if dry_run:
        return 'ok', f'{ink_path.name} ({act_name} / {case_title})'
    else:
        ink_path.write_text(new_content, encoding='utf-8')
        return 'ok', f'{ink_path.name} ({act_name} / {case_title})'


def main():
    parser = __import__('argparse').ArgumentParser(
        description='Add story/prophecy/bible metadata comments to all .ink files.'
    )
    parser.add_argument('--dry-run', action='store_true', help='Preview without writing')
    parser.add_argument('--reset', action='store_true', help='Strip existing metadata first')
    args = parser.parse_args()

    story_dir = Path(__file__).parent / 'story'
    ink_files = sorted(story_dir.glob('*.ink'))

    if not ink_files:
        print('No .ink files found in story/', file=sys.stderr)
        sys.exit(1)

    # Load all case files
    case_contents = {}
    for cf_name, exports in CASE_FILES:
        case_contents[cf_name] = load_case_file(cf_name)

    # Build lookup: basename -> {case_export, npc_id, npc_name, cf}
    case_lookup = {}
    for cf_name, exports in CASE_FILES:
        with open(cf_name) as f:
            content = f.read()
        npc_blocks = re.findall(
            r'id:\s*"([^"]+)"[\s\S]{0,300}?name:\s*"([^"]+)"[\s\S]{0,300}?storyFile:\s*"([^"]+)"',
            content
        )
        for npc_id, npc_name, sf in npc_blocks:
            basename = re.sub(r'\.\/story\/', '', sf).replace('.json', '')
            before = content[:content.find(f'id: "{npc_id}"')]
            case_match = list(re.finditer(r'export const (\w+) = \{', before))
            case_export = case_match[-1].group(1) if case_match else 'unknown'
            case_lookup[basename] = {
                'case_export': case_export,
                'npc_id': npc_id,
                'npc_name': npc_name,
                'cf': cf_name,
            }

    results = {'ok': 0, 'skip': 0, 'error': 0}
    for ink_path in ink_files:
        try:
            status, msg = process_file(ink_path, case_lookup, args.dry_run, args.reset)
        except Exception as e:
            status, msg = 'error', f'{ink_path.name}: {e}'
        results[status] += 1
        icon = {'ok': '✓', 'skip': '⠿', 'error': '✗'}.get(status, '?')
        print(f'  {icon}  {msg}')

    total = sum(results.values())
    print(f'\n{total} files: {results["ok"]} updated, {results["skip"]} skipped, {results["error"]} errors.')
    if args.dry_run:
        print('(dry run — use without --dry-run to write files)')


if __name__ == '__main__':
    main()
