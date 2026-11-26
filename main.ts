// Rent From the Squirrels — Make the Judge Laugh in One Line
// Writes one funny line to /output/entry.txt. Nothing else: no randomness,
// no clock reads, no network. The output is deterministic by construction.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line: squirrels buried my car keys, and every spring they pay one
// back — on the doormat, like rent.
const LINE =
  "The squirrels in my garden buried my car keys, and every spring they dig up three of them and leave one on the doormat, like rent.";

// Runtime gate, mirroring the competition's own gate: the file must hold
// 1-200 characters (counted in code points, so multi-byte text is safe),
// and must not be whitespace-only. Fail loudly instead of shipping
// an entry the scorer would refuse.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back check: the file on disk must hold exactly the line,
// byte for byte, with no trailing newline added.
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("entry.txt does not match the line exactly");
}
