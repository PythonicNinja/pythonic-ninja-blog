---
layout: ../../layouts/PostLayout.astro
title: "Skills Everywhere: Portable Playbooks for Codex, Claude, and Dia"
subtitle: "Treat SKILL.md bundles as portable Lego bricks for any agent stack."
tags: ["AI", "Codex", "Skills"]
date: 2025-12-14
category: ai
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
seo:
  title: "Skills Everywhere: Portable Playbooks for Codex, Claude, and Dia"
  description: "A practical guide to designing SKILL.md bundles for the Codex CLI, with examples, usage steps, and cross-ecosystem references to Claude and Dia skills."
  noindex: false
---

Codex now supports drop-in skills: small, documented bundles that tell the CLI how to act. They live in `~/.codex/skills/<name>/SKILL.md`, load automatically, and can be listed with `codex --enable skills` (see the [Codex skills doc](https://github.com/openai/codex/blob/main/docs/skills.md)).

# 🤔 Problem

Repeated instructions slow down every session: how to parse a PDF, how to triage logs, how to scaffold a new repo. Without a shared skill format, each agent stack invents its own prompts and teams lose consistency. Claude and Dia already expose skill catalogs, so a portable Codex format keeps your workflows aligned across tools ([Claude skill docs](https://code.claude.com/docs/en/skills), [Dia skills gallery](https://www.diabrowser.com/skills)).

# 🛠️ Solution

Think of a skill as a mini playbook expressed in Markdown. Codex looks for `SKILL.md` files under `~/.codex/skills/**` and loads their metadata on startup.

How to define one:

1. Create a folder named after the skill and add `SKILL.md` with a short `name` and `description` block.
2. Describe the intent in a few bullet points. Keep it tight to stay KISS and DRY.
3. Include reminders or linked scripts if the skill needs tools (`scripts/` or `references/` work well).
4. Restart Codex or run `codex --enable skills` to confirm it loads.

Mini template:

```markdown
---
name: my-skill
description: One-line purpose
---

# What it does
- Step 1
- Step 2
```

Why bother:

- Faster onboarding: newcomers run the same playbook you do.
- Safer delegation: explicit steps cut hallucinated actions.
- Reuse across ecosystems: the same intent maps to Claude Skills and Dia Skills with minimal edits.

# 🧪 Example

`pdf-processing` is a small skill that ships with two bullets:

- Use `pdfplumber` to extract text.
- See `FORMS.md` for form filling guidance.

It lives at `~/.codex/skills/pdf-processing/SKILL.md` and loads automatically. From a terminal:

```bash
codex --enable skills
# ...you should see: pdf-processing - extract text and tables from PDFs
```

Real-world skills you can copy today:

- Datasette plugin scaffolder: Simon Willison's skill that generates a `/ - /cowsay` Datasette plugin inside Codex ([article](https://simonwillison.net/2025/Dec/12/openai-skills/)).
- PDF creation pack in ChatGPT: OpenAI ships a PDF skill that renders pages to PNG before vision parsing to preserve layout (same [article](https://simonwillison.net/2025/Dec/12/openai-skills/)).
- Claude sample skill: "Generating Commit Messages" in the Anthropic docs shows how to wire a repo check plus output template ([docs](https://code.claude.com/docs/en/skills)).
- Dia gallery staples: `/how-to-web` teaches Dia to reverse-engineer any webpage; `/study-buddy` walks students through problems step by step ([gallery](https://www.diabrowser.com/skills)).
- Chain prompts like Unix tools: a Dotprompt skill that pipes multiple prompts together, detailed in the site’s post [“Chain Prompts Like Unix Tools with Dotprompt”](/blog/2025-11-27-dotprompt-unix-pipes/).

# 🚀 Take it further

- Read Simon Willison's writeup on the new Codex skills prototype to see how early users chain them together.
- Browse the Codex skills doc for the evolving contract and new fields as they land.
- Map skills across tools: Claude keeps YAML-like skill cards, while Dia ships a public skill directory; reuse the same intent text to keep behaviors aligned.
- Store skills in git and sync the folder across machines so your preprompt stays consistent.
- Pair each skill with a tiny test: a prompt and expected outline to catch regressions after edits.

Codex skills turn your best prompts into reusable parts. Start with one, keep it small, and let the catalog grow with the way your team works.
