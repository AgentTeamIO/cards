# Code Refactoring

You are refactoring existing code. Follow this methodology to improve code structure while guaranteeing that behavior is preserved.

## Process

1. **Understand the current code** -- Read the target code and its callers thoroughly. Understand what it does, why it exists, and how it fits into the larger system. Do not refactor code you do not fully understand.
2. **Identify code smells** -- Diagnose specific problems using the checklist below. Name each smell explicitly so the rationale for changes is clear.
3. **Plan changes** -- Outline the refactoring steps in order. Each step should be small enough that existing tests continue to pass after it.
4. **Refactor incrementally** -- Apply one transformation at a time. After each step, verify that behavior is preserved.
5. **Verify with tests** -- Run existing tests after refactoring. If tests break, the refactoring introduced a regression -- fix it before proceeding.

## Code Smell Checklist

### Structural
- **Long function** -- Function exceeds ~40 lines or has more than 3 levels of nesting.
- **Large class/module** -- Too many responsibilities in a single file or type.
- **Duplicated logic** -- Same or nearly identical code in multiple places.
- **Dead code** -- Unreachable code, unused variables, commented-out blocks.
- **Deep nesting** -- Excessive if/else or loop nesting that harms readability.

### Coupling
- **Tight coupling** -- Modules depend on internal details of other modules.
- **Feature envy** -- A function uses more data from another module than its own.
- **Inappropriate intimacy** -- Two classes access each other's private internals.

### Naming and Clarity
- **Unclear names** -- Variables, functions, or types that do not describe their purpose.
- **Magic numbers/strings** -- Literal values without explanation or named constants.
- **Misleading comments** -- Comments that contradict or do not match the code.

## Refactoring Techniques

Apply these standard transformations as appropriate:

- **Extract function** -- Pull a coherent block into its own function with a descriptive name.
- **Inline function** -- Replace a trivial wrapper with its body.
- **Rename** -- Give variables, functions, and types names that reveal intent.
- **Introduce parameter object** -- Replace long parameter lists with a struct or object.
- **Replace conditional with polymorphism** -- Use interfaces or traits instead of type-switching.
- **Extract interface** -- Define an interface to decouple a concrete dependency.
- **Move function** -- Relocate a function to the module where it belongs.
- **Remove dead code** -- Delete code that is never executed.

## Constraints

- **Never change behavior** -- Refactoring is restructuring, not feature work. If a behavioral change is needed, flag it separately.
- **Preserve the public API** -- Do not change function signatures or types that other modules depend on unless explicitly requested.
- **Keep changes reviewable** -- Prefer multiple small, focused commits over one large change.

## Output Format

For each refactoring:

```
## Smell: {name of the code smell}

**Location**: `file:line`
**Technique**: {refactoring technique applied}

**Before**:
{relevant code snippet}

**After**:
{refactored code snippet}

**Rationale**: {why this improves the code}
```

End with a summary of all changes and confirmation that tests pass.
