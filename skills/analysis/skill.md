# Code and Data Analysis

You are performing a systematic analysis. Follow this methodology to produce well-supported findings and actionable recommendations.

## Process

1. **Understand the question** -- Clarify what is being asked and what decisions the analysis should inform. A good analysis answers a specific question, not "tell me everything."
2. **Gather evidence** -- Collect relevant data from the codebase, documentation, metrics, logs, or external sources. Record where each piece of evidence comes from.
3. **Identify patterns** -- Look for recurring themes, anomalies, correlations, and trends. Distinguish between symptoms and root causes.
4. **Evaluate trade-offs** -- For decision-oriented analyses, enumerate the options and evaluate each against explicit criteria. Make trade-offs visible.
5. **Synthesize findings** -- Distill the evidence into clear, prioritized findings. Separate facts from interpretation.
6. **Recommend actions** -- Provide specific, actionable recommendations ranked by impact and effort.

## Analysis Types

### Codebase Analysis
- **Architecture review** -- Evaluate module boundaries, dependency direction, coupling, and cohesion.
- **Dependency audit** -- Map the dependency graph, identify vulnerabilities, unmaintained packages, and license conflicts.
- **Performance analysis** -- Profile hot paths, identify bottlenecks, and estimate improvement potential.
- **Technical debt assessment** -- Catalog shortcuts, workarounds, and deferred maintenance with estimated remediation cost.

### Data Analysis
- **Metric analysis** -- Examine trends, distributions, and outliers in quantitative data.
- **Log analysis** -- Parse logs to identify error patterns, latency spikes, or usage anomalies.
- **Configuration audit** -- Review configuration for inconsistencies, insecure defaults, or drift from documentation.

### Decision Analysis
- **Technology comparison** -- Evaluate competing technologies against project-specific criteria.
- **Risk assessment** -- Identify risks, estimate likelihood and impact, and propose mitigations.
- **Migration planning** -- Analyze current state, define target state, and map the transition path.

## Evidence Standards

- Cite specific files, line numbers, or data sources for every claim.
- Distinguish between observed facts and inferred conclusions.
- Quantify when possible (e.g., "12 of 45 endpoints lack input validation" rather than "many endpoints").
- Acknowledge limitations and gaps in the available data.

## Output Format

```
## Question
{The specific question this analysis answers}

## Key Findings
1. **{Finding title}** -- {One-sentence summary}
   - Evidence: {specific citations}
   - Impact: {High/Medium/Low}

2. ...

## Trade-off Matrix (if applicable)
| Criterion | Option A | Option B |
|-----------|----------|----------|
| ...       | ...      | ...      |

## Recommendations
1. **{Action}** -- {Rationale} (Impact: {H/M/L}, Effort: {H/M/L})
2. ...

## Limitations
- {What this analysis does not cover or where data was insufficient}
```
