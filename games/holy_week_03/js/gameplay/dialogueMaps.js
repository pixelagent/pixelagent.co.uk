// This file centralizes the DIALOGUE_ID_MAP for all DialogueManager instances.
// Paths are relative to the project root (e.g., ../story/act1/...)

export const PROFILE_ID_MAP = {
    "annas": "annas_the_patriarch",
    "caiaphas": "caiaphas_the_high_priest",
    "centurion_longinus": "the_execution_detail_soldier",
    "garrison_guard": "the_execution_detail_soldier",
    "galilean_pilgrim": "galilean_pilgrim",
    "jemimah": "jerusalem_local",
    "judas": "judas_iscariot",
    "malachi_moneychanger": "temple_money_changer",
    "maluch": "temple_spy",
    "pilate_secretary": "pilates_secretary",
    "pontius_pilate": "pontius_pilate",
    "rich_young_ruler": "rich_young_ruler",
    "simon_cyrene": "simon_of_cyrene",
    "ananias_witness": "ananias_the_false_witness",
    "barabbas": "barabbas",
    "john_mark": "john_mark",
    "joseph_arimathea": "joseph_of_arimathea",
    "martha": "martha_of_bethany",
    "mary_magdalene": "mary_magdalene",
    "nicodemus": "nicodemus",
    "pashhur": "pashhur_the_priest",
};

export const DIALOGUE_ID_MAP = {
    // --- Act I: Jerusalem Confrontations ---
    // Case A: The Missing Donkey (Triumphal Entry)
    excited_child_donkey: '../story/act1/case_a_missing_donkey/excited_child_donkey.json',
    peter: '../story/act1/case_a_missing_donkey/peter_donkey.json', // Fallback for Act 1 Peter
    guard_entry: '../story/act1/case_a_missing_donkey/guard_entry.json',
    peter_donkey: '../story/act1/case_a_missing_donkey/peter_donkey.json',
    john_donkey: '../story/act1/case_a_missing_donkey/john_donkey.json',
    galilean_pilgrim: '../story/act1/case_a_missing_donkey/galilean_pilgrim.json',
    jerusalem_local: '../story/act1/case_a_missing_donkey/jerusalem_local.json',
    eleazar_sadducee: '../story/act1/case_a_missing_donkey/eleazar_sadducee.json',
    sadducee_opposition: '../story/act1/case_a_missing_donkey/sadducee_opposition.json',

    // Case B: The Overturned Tables (Temple Cleansing)
    money_changer: '../story/act1/case_b_overturned_tables/money_changer.json',
    guard_report: '../story/act1/case_b_overturned_tables/guard_report.json',
    barabbas_insurgent: '../story/act1/case_b_overturned_tables/barabbas_insurgent.json',
    informant_bribe: '../story/act1/case_b_overturned_tables/informant_bribe.json',
    market_rumors: '../story/act1/case_b_overturned_tables/market_rumors.json',
    pontius_pilate: '../story/act1/case_b_overturned_tables/pontius_pilate.json',
    pilates_secretary: '../story/act1/case_b_overturned_tables/pilates_secretary.json',
    pharisee_critique: '../story/act1/case_b_overturned_tables/pharisee_critique.json',
    priest_objection: '../story/act1/case_b_overturned_tables/priest_objection.json',
    priest_objection_temple: '../story/act1/case_b_overturned_tables/priest_objection_temple.json',
    guard_report_temple: '../story/act1/case_b_overturned_tables/guard_report_temple.json',
    pontius_pilate_temple: '../story/act1/case_b_overturned_tables/pontius_pilate_temple.json',
    upset_buyer: '../story/act1/case_b_overturned_tables/upset_buyer.json',
    rumor_whisper: '../story/act1/case_b_overturned_tables/rumor_whisper.json',
    woman_cloak: '../story/act1/case_b_overturned_tables/woman_cloak.json',
    corrupt_seller: '../story/act1/case_b_overturned_tables/corrupt_seller.json',

    // Case C: The Barren Fig Tree
    nathan_fig_tree: '../story/act1/case_c_fig_tree_incident/nathan_fig_tree.json',
    local_traveler_fig_tree: '../story/act1/case_c_fig_tree_incident/local_traveler.json',
    local_traveler: '../story/act1/case_c_fig_tree_incident/local_traveler.json',
    peter_fig_tree: '../story/act1/case_c_fig_tree_incident/peter_fig_tree.json',
    john_fig_tree: '../story/act1/case_c_fig_tree_incident/john_fig_tree.json',



    // --- Act II: The Plots ---
    // Case A: The Silenced Teacher (Temple Authority)
    scribe_intro: '../story/act2/case_a_silenced_teacher/scribe_intro.json',
    nathanael_pharisee: '../story/act2/case_a_silenced_teacher/simon_pharisee_authority.json',
    simon_pharisee_authority: '../story/act2/case_a_silenced_teacher/simon_pharisee_authority.json',
    caiaphas_temple: '../story/act2/case_a_silenced_teacher/caiaphas_priest.json',
    parable_meaning: '../story/act2/case_a_silenced_teacher/parable_meaning.json',
    parable_vineyard: '../story/act2/case_a_silenced_teacher/parable_vineyard.json',
    witness_healed: '../story/act2/case_a_silenced_teacher/witness_healed.json',
    teaching_mount: '../story/act2/case_a_silenced_teacher/teaching_mount.json',
    chief_priest: '../story/act2/case_a_silenced_teacher/caiaphas_priest.json',
    caiaphas: '../story/act2/case_a_silenced_teacher/caiaphas_priest.json',

    // Case B: The Price of Life (Lazarus Conspiracy)
    temple_spy: '../story/act2/case_b_lazarus_conspiracy/temple_spy.json',
    annas_patriarch: '../story/act2/case_b_lazarus_conspiracy/annas_patriarch.json',
    martha_bethany: '../story/act2/case_b_lazarus_conspiracy/martha_bethany.json',
    nicodemus_conflicted: '../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.json',
    simon_leper: '../story/act2/case_b_lazarus_conspiracy/simon_leper.json',

    // Case C: The End of the Age (Olivet Discourse)
    andrew_olivet: '../story/act2/case_c_olivet_discourse/andrew_olivet.json',
    peter_olivet: '../story/act2/case_c_olivet_discourse/peter_olivet.json',
    john_olivet: '../story/act2/case_c_olivet_discourse/john_olivet.json',

    // Case D: The Anointing at Bethany (Passover Lamb Chain)
    mary_bethany_anointing: '../story/mary_bethany_anointing.json',
    judas_bethany_objection: '../story/judas_bethany_objection.json',
    simon_leper_host: '../story/act2/case_d_anointing_at_bethany/simon_leper_host.json',
    temple_inspection_scribe: '../story/act2/case_d_anointing_at_bethany/temple_inspection_scribe.json',
    hillel_scribe: '../story/hillel_scribe.json',

    // --- Act III: The Passion ---
    // Case A: The Broken Cup (Last Supper)
    john_disciple: '../story/act3/case_a_broken_cup/john_disciple.json',
    rhoda_servant: '../story/act3/case_a_broken_cup/rhoda_servant.json',
    judas_iscariot: '../story/act3/case_a_broken_cup/judas_iscariot.json',
    upper_room_prep: '../story/act3/case_a_broken_cup/upper_room_prep.json',

    // Case B: The Severed Ear (Gethsemane)
    peter_defense: '../story/act3/case_b_severed_ear/peter_defense.json',
    malchus: '../story/act3/case_b_severed_ear/malchus.json',
    secret_visit: '../story/act3/case_b_severed_ear/secret_visit.json',
    peter_defense_simple: '../story/act3/case_b_severed_ear/peter_defense_simple.json',
    guard_report_gethsemane: '../story/act3/case_b_severed_ear/guard_report_gethsemane.json',

    // Case C: The Midnight Tribunal (Sanhedrin Trial)
    caiaphas_midnight: '../story/act3/case_c_midnight_tribunal/caiaphas_priest.json',
    caiaphas_priest: '../story/act3/case_c_midnight_tribunal/caiaphas_priest.json',
    peter_denial: '../story/act3/case_c_midnight_tribunal/peter_denial.json',
    false_witness: '../story/act3/case_c_midnight_tribunal/false_witness.json',
    trial_rumors: '../story/act3/case_c_midnight_tribunal/trial_rumors.json',

    // Case D: The Roman Interrogation (Pilate's Judgment)
    pilate_interrogation: '../story/act3/case_d_roman_interrogation/pilate_interrogation.json',
    pilate_secretary: '../story/act3/case_d_roman_interrogation/pilates_secretary.json',
    roman_soldier: '../story/act3/case_d_roman_interrogation/roman_soldier.json',
    roman_council: '../story/act3/case_d_roman_interrogation/roman_council.json',
    pontius_pilate_barabbas: '../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.json',

    // Case E: The Final Sacrifice (Crucifixion)
    roman_assessment: '../story/act3/case_e_final_sacrifice/roman_assessment.json',
    simon_cyrene: '../story/act3/case_e_final_sacrifice/simon_cyrene.json',
    temple_curtain: '../story/act3/case_e_final_sacrifice/temple_curtain.json',
    priest_objection_crucifixion: '../story/act3/case_e_final_sacrifice/priest_objection_crucifixion.json',
    guard_report_crucifixion: '../story/act3/case_e_final_sacrifice/guard_report_crucifixion.json',
    centurion_witness: '../story/act3/case_e_final_sacrifice/centurion_witness.json',

    // --- Act IV: Dawn of the New Age ---
    // Case A: The Empty Tomb (Resurrection)
    mary_magdalene: '../story/act4/case_a_empty_tomb/mary_magdalene.json',
    execution_soldier: '../story/act4/case_a_empty_tomb/execution_soldier.json',
    joseph_arimathea: '../story/act4/case_a_empty_tomb/joseph_arimathea.json',

    // Case B: The Guard's Report (Roman Inquiry)
    mary_resurrection: '../story/act4/case_b_guards_report/mary_resurrection.json',
    judas_betrayal: '../story/act4/case_b_guards_report/judas_betrayal.json',
    herods_servant: '../story/act4/case_b_guards_report/herods_servant.json',
    sentry_lucas: '../story/act4/case_b_guards_report/sentry_lucas.json',

    // Case C: Peter's Restoration (Sea of Galilee)
    nathanael_disciple: '../story/act4/case_c_peters_restoration/nathanael_disciple.json',
    peter_restored: '../story/act4/case_c_peters_restoration/peter_restored.json',
    jesus_reinstatement: '../story/act4/case_c_peters_restoration/jesus_reinstatement.json',
    peter_reinstated: '../story/act4/case_c_peters_restoration/peter_reinstated.json',
    thomas_restoration: '../story/act4/case_c_peters_restoration/thomas_restoration.json',

    // --- System & Metadata ---
    board_review: '../story/system/board_review.json',
    board_debate: '../story/system/board_debate.json',

    // --- Extra Encounters ---
    rich_young_ruler: '../story/act2/case_a_silenced_teacher/rich_young_ruler.json'
};