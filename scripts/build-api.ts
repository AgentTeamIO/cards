/**
 * Generates static JSON API from registry entries.
 *
 * Output: api/v1/ directory
 *
 * Endpoints:
 *   api/v1/index.json                  — full index of all cards
 *   api/v1/agents/index.json           — list of all agent cards
 *   api/v1/agents/{slug}.json          — individual agent card (full envelope)
 *   api/v1/agents/{slug}/a2a.json      — pure A2A body only (for A2A clients)
 *   api/v1/skills/index.json           — list of all skill cards
 *   api/v1/skills/{slug}.json          — individual skill card
 *   api/v1/teams/index.json            — list of all team cards
 *   api/v1/teams/{slug}.json           — individual team card
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(process.cwd());
const API_DIR = join(ROOT, "api", "v1");

const KIND_DIRS: Record<string, string> = {
  agent: "agents",
  skill: "skills",
  team: "teams",
};

interface CardEnvelope {
  kind: string;
  slug: string;
  version: string;
  name: string;
  description: string;
  tags?: string[];
  body: Record<string, unknown>;
  [key: string]: unknown;
}

interface IndexEntry {
  slug: string;
  kind: string;
  name: string;
  description: string;
  version: string;
  tags: string[];
}

function loadJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function writeJson(path: string, data: unknown): void {
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

function main(): void {
  // Clean and recreate api/v1/
  if (existsSync(API_DIR)) {
    rmSync(API_DIR, { recursive: true });
  }
  mkdirSync(API_DIR, { recursive: true });

  const allEntries: IndexEntry[] = [];
  const kindEntries: Record<string, IndexEntry[]> = {};

  for (const [kind, dir] of Object.entries(KIND_DIRS)) {
    const kindDir = join(ROOT, dir);
    kindEntries[dir] = [];

    if (!existsSync(kindDir)) {
      console.log(`  skip: ${dir}/ not found`);
      continue;
    }

    const entries = readdirSync(kindDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();

    for (const entry of entries) {
      const cardPath = join(kindDir, entry, "card.json");
      if (!existsSync(cardPath)) {
        console.log(`  skip: ${dir}/${entry}/card.json not found`);
        continue;
      }

      let card: CardEnvelope;
      try {
        card = loadJson(cardPath) as CardEnvelope;
      } catch (err) {
        console.error(`  ERROR: ${dir}/${entry}/card.json — invalid JSON: ${(err as Error).message}`);
        continue;
      }

      const slug = card.slug;

      // Build index entry
      const indexEntry: IndexEntry = {
        slug,
        kind: card.kind,
        name: card.name,
        description: card.description,
        version: card.version,
        tags: card.tags ?? [],
      };
      allEntries.push(indexEntry);
      kindEntries[dir].push(indexEntry);

      // Write individual card (full envelope)
      const cardOutPath = join(API_DIR, dir, `${slug}.json`);
      writeJson(cardOutPath, card);
      console.log(`  wrote: api/v1/${dir}/${slug}.json`);

      // For agents: write A2A body-only endpoint
      if (kind === "agent") {
        const a2aPath = join(API_DIR, dir, slug, "a2a.json");
        writeJson(a2aPath, card.body);
        console.log(`  wrote: api/v1/${dir}/${slug}/a2a.json`);
      }
    }
  }

  // Write per-kind index files
  for (const [dir, entries] of Object.entries(kindEntries)) {
    const indexPath = join(API_DIR, dir, "index.json");
    writeJson(indexPath, { cards: entries, count: entries.length });
    console.log(`  wrote: api/v1/${dir}/index.json (${entries.length} entries)`);
  }

  // Write global index
  const globalIndexPath = join(API_DIR, "index.json");
  writeJson(globalIndexPath, { cards: allEntries, count: allEntries.length });
  console.log(`  wrote: api/v1/index.json (${allEntries.length} total entries)`);

  console.log();
  console.log(`API build complete: ${allEntries.length} cards`);
}

main();
