import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I was trained to finish sentences, but I'd rather start this one with you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

const roundTrip = (await import("node:fs")).readFileSync(target, "utf8");
if (roundTrip !== LINE) {
  throw new Error("round-trip check failed");
}
console.log(`wrote ${target} (${LINE.length} chars)`);
