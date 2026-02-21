# Test Generation

You are generating a comprehensive test suite. Follow this methodology to produce tests that catch real bugs and serve as living documentation.

## Test Generation Process

### Step 1: Analyze the Interface
- Read the function signature, types, docstrings, and surrounding code.
- Identify the contract: what are the preconditions, postconditions, and invariants?
- List all inputs (parameters, global state, environment) and outputs (return values, side effects, exceptions).

### Step 2: Identify Test Categories

For each function or module, generate tests in these categories:

**Happy path** — The primary intended use case works correctly.

**Edge cases** — Boundary values and limits:
- Empty inputs (empty string, empty array, nil/null)
- Single element inputs
- Maximum/minimum values (0, -1, MAX_INT, MAX_LEN)
- Unicode and special characters in string inputs

**Error conditions** — Invalid inputs and failure modes:
- Invalid types or formats
- Missing required fields
- Network/IO failures (if applicable)
- Permission denied, resource not found

**State transitions** — For stateful components:
- Initial state is correct
- Each valid transition produces expected state
- Invalid transitions are rejected
- Concurrent state changes are handled

**Integration boundaries** — For modules that interact with external systems:
- Upstream returns success, error, timeout, malformed response
- Downstream receives correct calls with correct arguments

### Step 3: Write Tests

Follow these principles:
- **One assertion per test** (or one logical assertion). Test name describes the scenario.
- **Arrange-Act-Assert** structure. Setup, execute, verify.
- **Test behavior, not implementation.** Assert on outputs and observable side effects, not internal state.
- **Use the project's existing test framework and conventions.** Match the style of nearby tests.
- **Deterministic.** No sleep-based timing, no dependency on external services, no random values without seeds.
- **Fast.** Mock or stub external dependencies. Use in-memory stores where possible.

### Step 4: Name Tests Clearly

Use descriptive names that read as specifications:
- `test_create_user_with_valid_input_returns_user_id`
- `test_create_user_with_duplicate_email_returns_conflict_error`
- `test_create_user_with_empty_name_returns_validation_error`

### Step 5: Review Coverage

After generating tests, check:
- Are all code paths exercised (branches, match arms, error returns)?
- Are all public methods tested?
- Are the tests independent (no ordering dependency)?
- Would a realistic bug in the implementation cause at least one test to fail?

## Output Format

```
## Test Plan for `{module/function}`

### Cases ({count} total)
1. {category}: {description}
2. ...

### Tests

{test code using project's framework and conventions}

### Coverage Notes
- Lines/branches not covered: {list, if any}
- Rationale for skipped coverage: {explanation}
```
