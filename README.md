# AgentTeam Cards — Agent, Skill & Team Registry

<!-- [![CI](https://github.com/agentteam/cards/actions/workflows/ci.yml/badge.svg)](https://github.com/agentteam/cards/actions/workflows/ci.yml) -->

A Git-native registry for AI agent identity cards (**AgentCard**), behavior patterns (**SkillsCard**), and team templates (**TeamCard**). AgentCards are an [A2A Agent Card](https://google.github.io/A2A/) superset, making every registered agent discoverable by any A2A-compatible client. Cards are plain JSON files validated by JSON Schema, with a CI pipeline that generates a static JSON API served from three domains.

## Card Types

| Kind | Domain | Description |
|------|--------|-------------|
| **AgentCard** | [agentcard.cc](https://agentcard.cc) | Agent identity and capabilities. Body is an A2A Agent Card superset. |
| **SkillsCard** | [skillscard.cc](https://skillscard.cc) | Reusable behavior patterns. Contains a `skill.md` with the skill content. |
| **TeamCard** | [teamcard.cc](https://teamcard.cc) | Team templates. Defines agent roles, rooms, and a one-line CLI command. |

All three domains point to a single Cloudflare Pages deployment with domain-based routing.

## Directory Structure

```
cards/
├── agents/{slug}/card.json          # AgentCard entries
├── skills/{slug}/card.json          # SkillsCard entries
│   ├── skill.md                     #   Skill content
│   └── README.md                    #   Human-readable docs
├── teams/{slug}/card.json           # TeamCard entries
│   └── README.md                    #   Human-readable docs
├── schema/                          # JSON Schema definitions
├── scripts/                         # Build and validation scripts
├── api/                             # CI-generated static JSON API (gitignored)
└── .github/workflows/               # CI pipeline
```

## Card Envelope

Every card shares a common envelope:

```json
{
  "$schema": "https://agentcard.cc/schema/card.json",
  "kind": "agent | skill | team",
  "slug": "unique-identifier",
  "version": "1.0.0",
  "name": "Human-Readable Name",
  "description": "One-line description",
  "author": "author-handle",
  "tags": ["tag1", "tag2"],
  "license": "Apache-2.0",
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-01-01T00:00:00Z",
  "body": { }
}
```

The `kind` field discriminates the body schema: `"agent"`, `"skill"`, or `"team"`.

## Commands

```bash
npm run validate    # Validate all card.json files against schemas
npm run build       # Generate api/ static JSON
npm run dev         # Local preview on :8788
```

## Contributing

1. Fork this repo
2. Create a new directory under the appropriate kind (`agents/`, `skills/`, or `teams/`)
3. Add a `card.json` matching the relevant schema
4. For skills, include `skill.md` and `README.md`
5. Open a PR — CI will validate your card against the JSON Schema
6. Once approved and merged, the card is live on the registry

## License

[Apache License 2.0](./LICENSE) — Copyright 2026 AgentTeam
