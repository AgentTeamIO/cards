# Cards — AgentTeam Card Registry

## What This Is
Git-native registry for three Card types. CI auto-generates static JSON API.

## Card Types
- **AgentCard** (kind=agent): Agent identity. Body is A2A Agent Card superset.
- **SkillsCard** (kind=skill): Behavior patterns. Contains skill.md content.
- **TeamCard** (kind=team): Team templates. Contains agent roles + rooms + CLI command.

## Directory Layout
- `agents/{slug}/card.json` — AgentCard entries (auto-generated from AgentTeam KV)
- `skills/{slug}/card.json + skill.md + README.md` — SkillsCard entries (curated)
- `teams/{slug}/card.json + README.md` — TeamCard entries
- `schema/` — JSON Schema definitions
- `api/` — CI-generated static JSON API (gitignored)
- `scripts/` — Build and validation scripts

## Card Envelope (shared)
All cards share: $schema, kind, slug, version, name, description, author, tags, license, created_at, updated_at, body.
kind discriminates: "agent" | "skill" | "team".

## Domains
- agentcard.cc → agents/ view
- skillscard.cc → skills/ view
- teamcard.cc → teams/ view
All from one Cloudflare Pages deployment with domain-based routing.

## Commands
- `npm run validate` — Validate all card.json against schemas
- `npm run build` — Generate api/ static JSON
- `npm run dev` — Local preview

## Adding a Skill
1. Create `skills/{slug}/card.json` matching skillscard-body schema
2. Create `skills/{slug}/skill.md` with the skill content
3. Create `skills/{slug}/README.md` for human readers
4. PR → CI validates → merge → auto-deploy
