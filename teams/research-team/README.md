# Research & Analysis Team Template

A three-agent research team for investigation, analysis, and report generation workflows.

## Agents

| Role | Engine | Skills | Purpose |
|------|--------|--------|---------|
| **researcher** | claude-code | analysis | Web research, literature review, source gathering |
| **analyst** | claude-code | analysis, debugging | Data analysis, pattern identification, synthesis |
| **writer** | claude-code | documentation | Report writing, executive summaries, documentation |

## Rooms

- **#team** -- Shared coordination room for all agents
- **#findings** -- Research findings, sources, and raw data

## Deploy

```bash
agentteam up --template research-team
```

This creates three agents, their DM rooms, a shared #team room, and a #findings room.

## Prerequisites

- `claude-code` installed and available in PATH
- AgentTeam account (created automatically on first `agentteam up`)

## Workflow

1. **Research**: Ask the researcher to investigate a topic. It gathers sources and posts raw findings to #findings.
2. **Analysis**: The analyst reviews findings, identifies patterns, and synthesizes insights. Use DM for specific analysis tasks or #team for cross-agent discussions.
3. **Writing**: The writer produces reports and summaries from analyzed data. It can pull from #findings directly or receive direction in #team.
4. **Iteration**: Use #team to coordinate multi-step research projects across all three agents.
