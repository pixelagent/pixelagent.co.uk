strudel-node-schema.json# Strudel Advanced Features Integration

This document describes the new advanced Strudel features that have been integrated into the Pixel Music Grid application.

## Overview

The application now supports the complete Strudel pattern language including:

1. **Pattern Combinators** - Higher-order composition functions
2. **Mini-Notation** - Compact pattern strings (TidalCycles-inspired)
3. **Pattern Functions** - Pattern constructors and chainable methods

## New Schema Files

### 1. Pattern Combinators (`strudel-pattern-combinators.json`)

**Higher-order composition functions:**

- **Structural Combinators:**
  - `stack()` - Layers patterns in parallel
  - `cat()`, `seq()` - Sequences patterns in time
  - `superimpose()` - Layers transformed version on original
  - `layer()` - Applies multiple transformations

- **Rhythmic Functions:**
  - `struct()` - Applies rhythmic structure/euclidean patterns
  - `mask()` - Filters events using boolean patterns
  - `euclidean()` - Generates euclidean rhythms

- **Temporal Transforms:**
  - `off()` - Time-shifted transformations
  - `slow()` - Slows down patterns
  - `fast()` - Speeds up patterns

- **Conditional Functions:**
  - `every()` - Applies transformation every N cycles
  - `whenmod()` - Applies transformation when cycle modulo matches

### 2. Mini-Notation (`strudel-mini-notation.json`)

**Complete DSL syntax:**

- **Basic Operators:**
  - `~` (rest) - Silence/rest in pattern
  - `_` (hold) - Extends previous event
  - ` ` (space) - Fast concatenation (default separator)

- **Structural Operators:**
  - `[ ]` (grouping) - Groups events to subdivide time equally
  - `,` (parallel) - Plays multiple patterns simultaneously (within brackets)
  - `< >` (alternate) - Alternates between options each cycle

- **Repetition Operators:**
  - `*` (multiply) - Repeats event N times within timespan
  - `/` (divide) - Slows down pattern by dividing time
  - `!` (replicate) - Repeats entire pattern N times per cycle

- **Timing Operators:**
  - `@` (elongate) - Extends event duration by N steps

- **Rhythm Generators:**
  - `(pulses,steps)` - Euclidean rhythm generation
  - `{pulses,steps}` - Bjorklund (alternative euclidean syntax)

- **Chance Operators:**
  - `?` (probability) - Event occurs with given probability
  - `:` (degradeBy) - Randomly removes events with given probability

- **Utility:**
  - `..` (range) - Creates range of numbers

### 3. Pattern Functions (`strudel-pattern-functions.json`)

**Pattern constructors and chainable methods:**

- **Constructor Functions:**
  - `s()` - Creates pattern from sound sample names
  - `n()` - Creates pattern from numeric values
  - `note()` - Creates pattern from musical note names
  - `chord()` - Creates pattern from chord symbols
  - `scale()` - Creates pattern of scale degrees

- **Chainable Methods:**
  - `.bank()` - Sets sound bank/kit for drum sounds
  - `.room()` - Sets room size for reverb (supports mini-notation)
  - `.gain()`, `.pan()`, `.speed()` - Audio properties
  - `.lpf()`, `.hpf()`, `.delay()`, `.reverb()` - Audio effects
  - `.struct()`, `.mask()`, `.euclidean()` - Rhythmic transformations
  - `.slow()`, `.fast()` - Temporal transformations
  - `.every()`, `.whenmod()` - Conditional transformations

## Implementation Details

### Node Manager Updates

The `NodeManager` class has been enhanced with:

1. **Schema Loading:**
   - Loads all new schema files on initialization
   - Supports pattern combinators, functions, and mini-notation

2. **Node Creation:**
   - Supports new combinator node types
   - Supports new pattern function node types
   - Automatic property initialization from schemas

3. **Pattern Generation:**
   - Enhanced `buildNodePattern()` method
   - New `buildCombinatorPattern()` method
   - New `buildPatternFunctionPattern()` method
   - New `buildCombinatorPatternWithChildren()` method

4. **Mini-Notation Support:**
   - `parseMiniNotation()` method for validation and parsing
   - Automatic mini-notation detection in pattern strings
   - Bracket balancing validation

### Pattern Generation Examples

#### Basic Example
```javascript
// Simple stack with mini-notation
stack(
  s('bd').struct('x ~ x ~'),
  s('hh*4')
)
```

#### Advanced Example (from task)
```javascript
stack(
  s('bd').struct('<[x*<1 2> [~@3 x]] x>'),
  s('~ [rim, sd:<2 3>]').room('<0 .2>'),
  n('[0 <1 3>]*<2!3 4>').s('hh')
).bank('tr909')
```

This example demonstrates:
- `stack()` combinator for parallel patterns
- `struct()` method with complex mini-notation
- `room()` method with mini-notation pattern
- `n()` function with complex mini-notation
- `bank()` method for drum kit selection

## Usage

### Creating Nodes

```javascript
// Create a stack combinator node
const stackNode = nodeManager.createNode('stack', 'parallel_stack', 300, 300);

// Create a pattern function node with mini-notation
const sNode = nodeManager.createNode('s', 'bd ~ sd ~', 100, 100);

// Create a combinator with properties
const structNode = nodeManager.createNode('struct', 'rhythmic', 500, 100);
structNode.properties.strudelProperties.structure = 'x ~ x ~';
```

### Connecting Nodes

```javascript
// Connect pattern nodes to combinators
nodeManager.createConnection(sNode, 'output', structNode, 'input');
nodeManager.createConnection(structNode, 'output', stackNode, 'input');
```

### Testing Features

```javascript
// Test the new features
nodeManager.testNewStrudelFeatures();

// Generate example nodes
nodeManager.generateExampleNodes();
```

## UI Integration

New buttons have been added to the interface:

- **Generate Examples** - Creates example nodes demonstrating new features
- **Test New Features** - Runs tests for mini-notation, combinators, and pattern functions
- **Show Normalization** - Shows graph normalization information
- **Clear Connections** - Removes all connections
- **Test Connection** - Tests node connections

## Technical Implementation

### Schema Integration

The application loads and integrates multiple schema files:

1. **Node Schema** - Node types, sockets, execution stages
2. **Property Schema** - UI controls and property mappings
3. **Control Nodes Schema** - Control signal generators
4. **Pattern Combinators Schema** - Higher-order composition functions
5. **Pattern Functions Schema** - Pattern constructors and methods
6. **Mini-Notation Schema** - DSL syntax and parsing rules

### Execution Flow

1. **Schema Loading** - All schemas loaded on initialization
2. **Node Creation** - Nodes created with appropriate properties
3. **Connection Validation** - Connections validated against schemas
4. **Pattern Generation** - Patterns generated from node graphs
5. **Mini-Notation Parsing** - Pattern strings parsed and validated
6. **Strudel Execution** - Generated patterns executed in Strudel

### Error Handling

- Schema loading errors are caught and logged
- Invalid mini-notation patterns are detected and handled gracefully
- Missing schemas fall back to basic functionality
- Connection validation prevents invalid node graphs

## Examples

### Example 1: Simple Stack

```javascript
// Create nodes
const bd = nodeManager.createNode('DrumSymbol', 'bd', 100, 100);
const hh = nodeManager.createNode('DrumSymbol', 'hh*4', 300, 100);
const stack = nodeManager.createNode('stack', 'drum_stack', 200, 300);

// Connect nodes
nodeManager.createConnection(bd, 'output', stack, 'input');
nodeManager.createConnection(hh, 'output', stack, 'input');

// Generated pattern: stack(s("bd"), s("hh*4"))
```

### Example 2: Rhythmic Structure

```javascript
// Create nodes
const bd = nodeManager.createNode('DrumSymbol', 'bd', 100, 100);
const struct = nodeManager.createNode('struct', 'rhythm', 300, 100);
struct.properties.strudelProperties.structure = 'x ~ x ~';

// Connect nodes
nodeManager.createConnection(bd, 'output', struct, 'input');

// Generated pattern: s("bd").struct("x ~ x ~")
```

### Example 3: Complex Mini-Notation

```javascript
// Create node with complex mini-notation
const complex = nodeManager.createNode('s', '<[x*<1 2> [~@3 x]] x>', 100, 100);

// Generated pattern: s("<[x*<1 2> [~@3 x]] x>")
```

## Troubleshooting

### Mini-Notation Issues

- **Unbalanced brackets**: Check for matching `[ ]`, `< >`, `( )`, `{ }` pairs
- **Invalid syntax**: Refer to the mini-notation schema for valid operators
- **Parsing errors**: Use the test function to validate patterns

### Connection Issues

- **Invalid connections**: Check node types and socket compatibility
- **Missing schemas**: Ensure all schema files are properly loaded
- **Execution order**: Verify node execution stages and priorities

### Performance Issues

- **Complex patterns**: Break down large patterns into smaller nodes
- **Deep nesting**: Limit mini-notation nesting depth (max 8 levels)
- **Many connections**: Use combinators to reduce connection complexity

## Future Enhancements

- **Visual mini-notation editor**: Interactive editor for pattern strings
- **Pattern preview**: Real-time visualization of generated patterns
- **Schema validation**: More comprehensive validation rules
- **Performance optimization**: Caching and optimization of pattern generation

## References

- **Strudel Documentation**: https://strudel.cc/
- **TidalCycles Documentation**: https://tidalcycles.org/
- **Schema Files**: `/nodes/` directory
- **Node Manager**: `js/nodeManager.js`

## Support

For issues or questions about the new Strudel features:

1. Check the console for error messages
2. Use the test functions to validate patterns
3. Refer to the schema files for detailed definitions
4. Consult the Strudel documentation for language reference