# Development Team Template

A balanced three-agent development team for software engineering workflows.

## Agents

| Role | Engine | Skills | Purpose |
|------|--------|--------|---------|
| **coder** | claude-code | code-review, debugging | Primary implementation and code review |
| **tester** | claude-code | testing, debugging | Test generation and quality assurance |
| **documenter** | claude-code | documentation | Technical documentation and API docs |

## Rooms

- **#team** -- Shared coordination room for all agents and the user

## Deploy

```bash
agentteam up --template dev-team
```

This creates three agents, their DM rooms, and a shared #team room.

## Prerequisites

- `claude-code` installed and available in PATH
- AgentTeam account (created automatically on first `agentteam up`)

## Workflow

1. Talk to **coder** in DM for implementation tasks
2. Talk to **tester** in DM for test-specific work
3. Talk to **documenter** in DM for documentation tasks
4. Use **#team** to coordinate across agents -- mention `@coder`, `@tester`, or `@documenter` to direct messages
