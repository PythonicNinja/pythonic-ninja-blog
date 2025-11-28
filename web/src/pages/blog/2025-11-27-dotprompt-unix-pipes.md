---
layout: ../../layouts/PostLayout.astro
title: "Chain Prompts Like Unix Tools with Dotprompt"
subtitle: "Build small, composable AI steps you can pipe together in the shell."
tags: ["AI", "Prompt Engineering", "CLI", "Automation"]
date: 2025-11-27
category: ai
image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1400&q=80"
seo:
  title: "Chain Prompts Like Unix Tools with Dotprompt"
  description: "Learn how to write executable .prompt files with Dotprompt and stitch them together with the runprompt CLI to form Unix-style AI pipelines."
  noindex: false
---

Dotprompt turns prompt engineering into small, reusable files and lets you run them like programs. Pair it with `runprompt` and you can wire prompts together with pipes the same way you chain `curl`, `grep`, and `sed`.

# Problem

Most prompt workflows are copy-paste scripts hidden in notebooks or docs. They are hard to reuse, hard to review, and fragile when you change models or providers. You need a way to package prompts so they are executable, typed, and composable from the command line.

# Solution

Use Dotprompt (`.prompt` files) for the prompt definition and `runprompt` as the runner. Each `.prompt` file:

- Stores metadata in YAML frontmatter (model, parameters, expected inputs).
- Uses Handlebars templating to inject variables safely.
- Can declare an output shape so downstream steps know what to expect.

`runprompt` reads those files and streams results, so you can pipe prompts just like Unix filters. Swapping models or providers stays inside the file, not your shell script.

Reference specs and tooling:

- Dotprompt spec and examples: https://github.com/google/dotprompt
- runprompt CLI that executes `.prompt` files: https://github.com/chr15m/runprompt

Make prompts directly executable

1. Download `runprompt` from the repo and place it at `/usr/bin/local/runprompt`.
2. Edit its shebang to your Python, for example `#!/opt/homebrew/bin/python3.12`.
3. Create prompts like `~/codereview.prompt` with a shebang that points to the runner:

```bash
#!/usr/bin/env -S /usr/local/bin/runprompt
---
model: googleai/gemini-2.5-flash
---
do code review on current changeset:
<CODE>
{{STDIN}}
</CODE>
```

Now every `~/*.prompt` is an executable: `chmod +x ~/codereview.prompt` and pipe data straight in.

# Example

Create two prompts and a one-line pipeline.

`summarize.prompt`

```handlebars
---
model: gemini-2.5-flash
input:
  text: string
output:
  summary: string
---
Summarize this text in three bullet points:

{{text}}
```

`fr.prompt`

```handlebars
---
model: gemini-2.5-flash
input:
  summary: string
output:
  french: string
---
Traduis en français, garde les puces:

{{summary}}
```

Now chain them with `runprompt`:

```bash
curl -s "https://github.com/google/dotprompt" \
  | runprompt ~/summarize.prompt \
  | runprompt ~/fr.prompt
```

What happens:

1. `curl` grabs the page HTML.
2. `summarize.prompt` turns it into three bullets (`summary`).
3. `fr.prompt` translates that summary to French (`french`).

Because each prompt declares its inputs and outputs, you can swap steps without rewriting glue code.

One-liner code review from staged changes:

```bash
git diff | runprompt ~/codereview.prompt
```

`codereview.prompt`

```handlebars
---
model: googleai/gemini-2.5-flash
---
do code review on current changeset:
<CODE>
{{STDIN}}
</CODE>
```

Pipe a review straight into a summary for teammates:

```bash
git diff | runprompt ~/codereview.prompt | runprompt ~/summarize.prompt
```

Or call the executable version directly and chain a summarizer:

```bash
git diff HEAD...main | ~/codereview.prompt | ~/summarize.prompt
```

Example output:

```
Here's a summary of the text in bullet points:

* The new section is clear, concise, and illustrates Unix-style piping with dotprompt.
* `git diff | runprompt codereview.prompt` shows how piped input becomes `<CODE>` via `{{STDIN}}`.
* Including the full `codereview.prompt` keeps the example self-contained and readable.
```

# Take it further

- Add a `detect-language.prompt` before translation to branch between French, Spanish, or Japanese outputs.
- Store shared defaults (temperature, max_tokens) in the frontmatter so every prompt runs consistently across providers.
- Version prompts in Git and review them like code; small `.prompt` files make diffs obvious.
- Wrap pipelines in `make` targets (`make translate`) to give teammates a single command.
- Test prompts with fixtures: pipe a sample text file through `runprompt` and assert the JSON fields you expect.

Tip: `gemini-2.5-flash` is fast and cheap, making it ideal for multi-step CLI pipelines. If a step needs more reasoning, swap just that prompt to a heavier model without touching your shell script.

With Dotprompt plus `runprompt`, AI workflows become transparent shell pipelines instead of hidden notebook cells.
