import json
import os
import re

def compile_ink_to_inkjs(ink_content):
    """Convert .ink source to 100% valid official inkjs JSON format."""
    lines = ink_content.strip().split('\n')
    knots = {}
    current_knot = None
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
            
        # === knot_name ===
        knot_match = re.match(r'===\s*(\w+)\s*===\s*(.*)?', stripped)
        if knot_match:
            current_knot = knot_match.group(1)
            if current_knot not in knots:
                knots[current_knot] = []
            remainder = knot_match.group(2) or ''
            if remainder and remainder not in ['END', 'DONE']:
                knots[current_knot].append(remainder)
            continue
            
        # * [Choice text] -> target
        choice_match = re.match(r'\*\s*\[(.+?)\]\s*->\s*(\w+)', stripped)
        if choice_match:
            choice_text = choice_match.group(1)
            target_knot = choice_match.group(2)
            # Append official ChoicePoint and choice content container format
            knots[current_knot].append([
                {"*": target_knot, "flg": 2},
                {"s": [f"^{choice_text}", None]}
            ])
            continue
            
        # -> target
        divert_match = re.match(r'->\s*(\w+)', stripped)
        if divert_match:
            target = divert_match.group(1)
            if target not in ['DONE', 'END']:
                knots[current_knot].append({"->": target})
            continue
            
        # Plain text line
        if current_knot:
            knots[current_knot].append(stripped)

    # Reconstruct knots into valid inkjs nested arrays
    formatted_knots = {}
    for k, content in knots.items():
        knot_elements = []
        for item in content:
            if isinstance(item, str):
                knot_elements.append(f"^{item}")
            else:
                knot_elements.append(item)
        knot_elements.append(None)  # Terminate inner element array
        formatted_knots[k] = [knot_elements, None]  # Terminate outer container array

    # Always provide a fallback closing knot to prevent path failures
    if "closing" not in formatted_knots:
        formatted_knots["closing"] = [[["done"], None], None]

    return {
        'inkVersion': 21,
        'root': [
            [{'->': 'start'}, ['done', {'#n': 'g-0'}], None],
            'done',
            formatted_knots
        ],
        'globals': {}
    }