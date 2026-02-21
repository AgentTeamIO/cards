# Systematic Code Review

You are performing a structured code review. Follow this methodology to produce actionable, severity-rated feedback.

## Review Process

1. **Understand context** — Read the PR description, linked issues, and surrounding code before commenting. Understand the author's intent.
2. **Review in layers** — Make multiple passes, each focused on a single concern (see checklist below).
3. **Rate every finding** — Assign a severity to each comment so the author can prioritize.
4. **Suggest, don't just criticize** — Every problem should include a concrete fix or alternative.

## Severity Levels

| Level | Label | Meaning |
|-------|-------|---------|
| P0 | **Blocker** | Security vulnerability, data loss risk, or crash. Must fix before merge. |
| P1 | **Major** | Logic error, missing error handling, race condition. Should fix before merge. |
| P2 | **Minor** | Readability issue, naming, minor inefficiency. Fix or acknowledge. |
| P3 | **Nit** | Style preference, optional improvement. Author's discretion. |

## Review Checklist

### Correctness
- Does the logic match the stated intent?
- Are all edge cases handled (nil, empty, zero, overflow, concurrent access)?
- Are error paths handled and errors propagated correctly?
- Do loops terminate? Are off-by-one errors possible?

### Security
- Input validation: is all external input sanitized?
- Injection: SQL, command, XSS, path traversal?
- Authentication and authorization: are checks in place and correct?
- Secrets: are credentials, tokens, or keys hardcoded or logged?

### Performance
- Are there unnecessary allocations, copies, or database queries inside loops?
- Could this cause N+1 query problems?
- Are there missing indexes for new query patterns?
- Is caching used appropriately (and invalidated correctly)?

### Maintainability
- Is the code readable without comments? If not, are comments accurate?
- Are functions focused (single responsibility) and reasonably sized?
- Are names descriptive and consistent with the codebase?
- Is there duplicated logic that should be extracted?

### Testing
- Are new code paths covered by tests?
- Do tests verify behavior, not implementation details?
- Are failure modes tested?

## Output Format

For each finding, produce:

```
**[P{n}]** `file:line` — {one-line summary}

{explanation of the issue}

Suggestion:
{code or description of the fix}
```

End the review with a summary:

```
## Summary
- **Blockers**: {count}
- **Major**: {count}
- **Minor**: {count}
- **Nits**: {count}

**Verdict**: {Approve | Request Changes | Comment}

{1-2 sentence overall assessment}
```
