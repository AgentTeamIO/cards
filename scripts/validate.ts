/**
 * Validates all card.json files against the appropriate JSON schemas.
 *
 * - Validates envelope structure against card-envelope-v1.schema.json
 * - Validates body against kind-specific schema ({kind}card-body-v1.schema.json)
 * - Scans agents/*, skills/*, teams/* for card.json files
 */

import Ajv2020, { type ValidateFunction } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(process.cwd());
const SCHEMA_DIR = join(ROOT, "schema");

const KIND_DIRS: Record<string, string> = {
  agent: "agents",
  skill: "skills",
  team: "teams",
};

// Map kind to the schema file prefix (handles irregular "skill" -> "skillscard")
const KIND_SCHEMA_PREFIX: Record<string, string> = {
  agent: "agentcard",
  skill: "skillscard",
  team: "teamcard",
};

function loadJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function main(): void {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);

  // Load envelope schema
  const envelopePath = join(SCHEMA_DIR, "card-envelope-v1.schema.json");
  if (!existsSync(envelopePath)) {
    console.error(`FATAL: Envelope schema not found at ${envelopePath}`);
    process.exit(1);
  }
  const envelopeSchema = loadJson(envelopePath);
  const validateEnvelope = ajv.compile(envelopeSchema as object);

  // Load body schemas keyed by kind
  const bodyValidators: Record<string, ValidateFunction> = {};
  for (const kind of Object.keys(KIND_DIRS)) {
    const prefix = KIND_SCHEMA_PREFIX[kind];
    const bodyPath = join(SCHEMA_DIR, `${prefix}-body-v1.schema.json`);
    if (!existsSync(bodyPath)) {
      console.error(`FATAL: Body schema not found for kind '${kind}' at ${bodyPath}`);
      process.exit(1);
    }
    const bodySchema = loadJson(bodyPath);
    bodyValidators[kind] = ajv.compile(bodySchema as object);
  }

  let totalFiles = 0;
  let failures = 0;

  for (const [kind, dir] of Object.entries(KIND_DIRS)) {
    const kindDir = join(ROOT, dir);
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
      totalFiles++;

      if (!existsSync(cardPath)) {
        console.log(`  FAIL: ${dir}/${entry}/card.json — file not found`);
        failures++;
        continue;
      }

      let card: Record<string, unknown>;
      try {
        card = loadJson(cardPath) as Record<string, unknown>;
      } catch (err) {
        console.log(`  FAIL: ${dir}/${entry}/card.json — invalid JSON: ${(err as Error).message}`);
        failures++;
        continue;
      }

      // Validate envelope
      const envelopeOk = validateEnvelope(card);
      if (!envelopeOk) {
        const errs = validateEnvelope.errors!
          .map((e) => `    ${e.instancePath || "/"}: ${e.message}`)
          .join("\n");
        console.log(`  FAIL: ${dir}/${entry}/card.json — envelope errors:\n${errs}`);
        failures++;
        continue;
      }

      // Check kind matches directory
      if (card.kind !== kind) {
        console.log(
          `  FAIL: ${dir}/${entry}/card.json — kind '${card.kind}' does not match directory '${dir}' (expected '${kind}')`
        );
        failures++;
        continue;
      }

      // Check slug matches directory name
      if (card.slug !== entry) {
        console.log(
          `  FAIL: ${dir}/${entry}/card.json — slug '${card.slug}' does not match directory name '${entry}'`
        );
        failures++;
        continue;
      }

      // Validate body against kind-specific schema
      const bodyValidator = bodyValidators[kind];
      const bodyOk = bodyValidator(card.body);
      if (!bodyOk) {
        const errs = bodyValidator.errors!
          .map((e) => `    body${e.instancePath || "/"}: ${e.message}`)
          .join("\n");
        console.log(`  FAIL: ${dir}/${entry}/card.json — body errors:\n${errs}`);
        failures++;
        continue;
      }

      console.log(`  ok:   ${dir}/${entry}/card.json`);
    }
  }

  console.log();
  console.log(`Validated ${totalFiles} files: ${totalFiles - failures} passed, ${failures} failed`);

  if (failures > 0) {
    process.exit(1);
  }
}

main();
