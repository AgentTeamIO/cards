# code-review

Systematic code review skill that produces structured, severity-rated feedback covering correctness, security, performance, and maintainability.

## Usage

Load this skill when you want an AI agent to review code changes (diffs, PRs, or files) with a consistent methodology.

**Example prompts:**
- "Review this PR for security issues"
- "Review the changes in this diff for correctness"
- "Do a full code review of the authentication module"

## What It Does

1. Reads the code changes and surrounding context
2. Reviews in multiple passes: correctness, security, performance, maintainability, testing
3. Rates each finding by severity (P0 Blocker through P3 Nit)
4. Provides concrete fix suggestions for every issue
5. Produces a summary with verdict (Approve / Request Changes / Comment)

## Compatible Engines

- claude-code
- gemini-cli
- codex
