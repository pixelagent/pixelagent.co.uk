def create_valid_ink_json(lines, choices, targets=None):
    """Create valid inkjs JSON for standalone files with choices."""
    if targets is None:
        targets = ["closing"] * len(choices)
        
    knot_elements = [f'^{line}' for line in lines]
    for choice, target in zip(choices, targets):
        knot_elements.append([
            {"*": target, "flg": 2},
            {"s": [f"^{choice}", None]}
        ])
    knot_elements.append(None)
    
    return {
        'inkVersion': 21,
        'root': [
            [{'->': 'start'}, ['done', {'#n': 'g-0'}], None],
            'done',
            {
                'start': [knot_elements, None],
                'closing': [[["done"], None], None]
            }
        ],
        'globals': {}
    }