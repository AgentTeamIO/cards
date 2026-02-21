# testing

Test generation skill that produces comprehensive test suites covering happy paths, edge cases, error conditions, and boundary values.

## Usage

Load this skill when an AI agent needs to write tests for existing or new code.

**Example prompts:**
- "Generate tests for the UserService.createUser method"
- "Add integration tests for the payment API endpoints"
- "Write tests for all edge cases of this parser"

## What It Does

1. Analyzes the function/module interface and contract
2. Identifies test categories: happy path, edge cases, errors, state transitions, integration boundaries
3. Writes tests following the project's existing framework and conventions
4. Uses descriptive names that read as specifications
5. Reviews coverage and notes any gaps

## Compatible Engines

- claude-code
- gemini-cli
- codex
