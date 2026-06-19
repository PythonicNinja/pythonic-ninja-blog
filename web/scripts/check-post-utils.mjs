import assert from "node:assert/strict";
import {
  estimateMinutes,
  extractBody,
  normalizeTags,
  summarize,
  toPlainText,
} from "../src/lib/post-utils.js";

const markdown = `---
title: "Example"
tags: ["AI", "DevOps"]
---

# Problem

Hello [reader](https://example.com). Here is \`code\`.

\`\`\`bash
echo hidden
\`\`\`

Second sentence survives.`;

assert.equal(extractBody(markdown).startsWith("# Problem"), true);
assert.equal(toPlainText(extractBody(markdown)).includes("echo hidden"), false);
assert.equal(toPlainText(extractBody(markdown)).includes("Hello reader"), true);
assert.equal(summarize(extractBody(markdown)).includes("Second sentence survives."), true);
assert.equal(estimateMinutes("one two three"), 1);
assert.deepEqual(normalizeTags(["AI", " DevOps ", "", null]), ["AI", "DevOps"]);

console.log("post utils checks passed");
