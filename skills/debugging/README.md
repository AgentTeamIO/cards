# debugging

Hypothesis-driven debugging skill that systematically identifies root causes rather than patching symptoms.

## Usage

Load this skill when an AI agent needs to diagnose and fix a software bug.

**Example prompts:**
- "Debug this NullPointerException in the user service"
- "The API returns 500 intermittently under load"
- "Find out why tests pass locally but fail in CI"

## What It Does

1. Characterizes the problem (scope, reproducibility, timeline)
2. Forms ranked hypotheses for the root cause
3. Tests each hypothesis with targeted evidence gathering
4. Traces from symptom to root cause
5. Produces a minimal fix with regression test

## Compatible Engines

- claude-code
- gemini-cli
