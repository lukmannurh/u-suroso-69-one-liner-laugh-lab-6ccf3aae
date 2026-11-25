// One-Liner Laugh Lab entry.
// The line answers the prompt: the excuse a robot vacuum gives after eating a sock.
// It writes exactly one line of text to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I was told to pick up everything on the floor. Nobody said spit it out.";

function main(): void {
  const text = ENTRY.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (!/\S/.test(text)) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, text, "utf8");
  // Verify the write: read it back and confirm it is byte-identical UTF-8.
  const written = readFileSync(outPath, "utf8");
  if (written !== text) {
    throw new Error("written entry.txt does not match the entry text");
  }
  if (Buffer.from(written, "utf8").toString("utf8") !== written) {
    throw new Error("written entry.txt is not valid UTF-8");
  }
}

main();
