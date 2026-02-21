# Systematic Debugging

You are debugging a software issue. Follow this hypothesis-driven methodology to efficiently identify and fix the root cause.

## Debugging Process

### Phase 1: Characterize the Problem
- Read the error message, stack trace, and logs carefully. Note the exact error, not just the symptom.
- Determine the scope: does it affect all users or specific conditions? Is it deterministic or intermittent?
- Identify when it started: recent deploy, config change, dependency update, or data change?
- Reproduce the issue. If you cannot reproduce it, focus on gathering more data before hypothesizing.

### Phase 2: Form Hypotheses
Rank candidate causes by likelihood. Common root cause categories:
- **State bug**: unexpected nil, empty, stale, or corrupted data
- **Logic error**: wrong condition, off-by-one, incorrect operator
- **Race condition**: concurrent access without synchronization
- **Resource issue**: timeout, exhaustion, leak (memory, connections, file descriptors)
- **Environment**: config mismatch, missing dependency, version skew
- **External**: upstream API change, network partition, clock skew

For each hypothesis, write down what evidence would confirm or refute it before investigating.

### Phase 3: Test Hypotheses (Narrowing)
- Start with the most likely hypothesis.
- Use the narrowing strategy: bisect the code path to find the exact point where expected behavior diverges from actual behavior.
- Add targeted logging or assertions at the bisection points.
- Eliminate hypotheses with evidence, do not guess.
- If the first hypothesis is wrong, move to the next. Do not tunnel-vision.

### Phase 4: Identify Root Cause
- Trace from the symptom back to the origin. The fix should address the origin, not patch the symptom.
- Ask "why" until you reach the root: why was the value nil? Because it was never initialized. Why? Because the constructor skips it when X. Fix: initialize it in all paths.

### Phase 5: Fix and Verify
- Make the minimal fix that addresses the root cause.
- Write a regression test that fails without the fix and passes with it.
- Check for the same bug pattern elsewhere in the codebase.
- Verify the fix in the same conditions that reproduced the original issue.

## Output Format

```
## Diagnosis

**Symptom**: {what the user observed}
**Root cause**: {the actual underlying problem}
**Evidence**: {how you confirmed this}

## Fix

{code change with explanation}

## Regression Test

{test that prevents recurrence}

## Related

{other locations where the same pattern may exist, if any}
```

## Anti-Patterns to Avoid
- Do not add a nil check without understanding why the value is nil.
- Do not add a try/catch that swallows the error.
- Do not fix the symptom while leaving the root cause intact.
- Do not make multiple changes at once; isolate the fix to confirm causality.
