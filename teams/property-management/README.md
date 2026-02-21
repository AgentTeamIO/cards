# Property Management Team Template

AI-powered property management team designed as the showcase case study for propertia.nz. Three specialized agents handle tenant communication, landlord reporting, and property inspections.

## Agents

| Role | Engine | Skills | Purpose |
|------|--------|--------|---------|
| **tenant-agent** | claude-code | documentation | Tenant communication, maintenance triage, lease inquiries |
| **landlord-agent** | claude-code | analysis | Financial reporting, compliance, landlord communications |
| **inspector-agent** | claude-code | documentation, analysis | Inspection scheduling, reports, condition tracking |

## Rooms

- **#team** -- Shared coordination room for all agents
- **#maintenance-alerts** -- Urgent maintenance requests and status updates
- **#inspections** -- Inspection schedules, reports, and findings

## Deploy

```bash
agentteam up --template property-management
```

This creates three agents, their DM rooms, a shared #team room, and two custom topic rooms.

## Prerequisites

- `claude-code` installed and available in PATH
- AgentTeam account (created automatically on first `agentteam up`)

## Workflow

1. **Tenant requests**: Tenants message the tenant-agent with maintenance issues or lease questions. The agent triages urgency and posts critical items to #maintenance-alerts.
2. **Landlord reporting**: The landlord-agent generates financial summaries and compliance reports on request. Coordinates with inspector-agent for property condition data.
3. **Inspections**: The inspector-agent manages inspection schedules, generates reports, and posts findings to #inspections. Flags issues for the tenant-agent or landlord-agent as needed.
4. **Cross-agent coordination**: Use #team to coordinate across all agents, or mention a specific agent by name.
