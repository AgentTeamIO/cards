# refactoring

Restructure existing code to improve readability, maintainability, and performance while preserving behavior.

## Usage

Load this skill when you want an AI agent to refactor code -- improving structure without changing what the code does.

**Example prompts:**
- "Refactor the legacy auth module to use dependency injection"
- "Simplify this function that has grown too complex"
- "Break this 500-line file into focused modules"

## What It Does

1. Reads and understands the target code and its callers
2. Identifies specific code smells (long functions, duplication, tight coupling, etc.)
3. Plans incremental changes that preserve existing behavior
4. Applies standard refactoring techniques (extract function, rename, introduce interface, etc.)
5. Verifies that existing tests still pass after each change

## Compatible Engines

- claude-code
- codex
