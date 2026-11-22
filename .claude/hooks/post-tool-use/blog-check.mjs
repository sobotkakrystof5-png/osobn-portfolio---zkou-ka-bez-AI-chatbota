#!/usr/bin/env node
// Claude Code hook (PostToolUse na Write/Edit/MultiEdit): po každé úpravě
// článku v content/blog/*.mdx nebo fronty _fronta.json spustí npm run blog:check.
// Chyby vrátí Claudovi (exit 2), ať je hned opraví. Upozornění pošle jako
// kontext. Při jakékoli vlastní chybě tiše skončí (exit 0), nikdy neblokuje.

import { spawnSync } from "node:child_process";

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  try {
    const input = JSON.parse(raw);
    const file = String(input?.tool_input?.file_path ?? "").normalize("NFC");
    if (!/content\/blog\/([^/]+\.mdx|_fronta\.json)$/.test(file)) process.exit(0);

    const cwd = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
    const res = spawnSync("node", ["scripts/blog-check.mjs", file], { cwd, encoding: "utf8" });
    const out = `${res.stdout ?? ""}${res.stderr ?? ""}`.trim();

    if (res.status === 1) {
      process.stderr.write(`blog:check našel chyby, oprav je:\n${out}\n`);
      process.exit(2);
    }
    if (/: W /.test(out)) {
      process.stdout.write(
        JSON.stringify({
          hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext: `blog:check upozornění:\n${out}` },
        }),
      );
    }
    process.exit(0);
  } catch {
    process.exit(0);
  }
});
