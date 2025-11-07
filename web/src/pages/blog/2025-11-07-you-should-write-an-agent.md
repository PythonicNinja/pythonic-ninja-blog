---
layout: ../../layouts/PostLayout.astro
title: "You Should Write An Agent"
subtitle: "Build the loop, then decide what agents are worth"
tags: ["AI", "Agents", "LLM"]
date: 2025-11-07
category: ai
image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1350&q=80"
seo:
  title: "You Should Write An Agent"
  description: "A pragmatic guide to building a minimal LLM agent loop with memory, tools, and real-world constraints."
  noindex: false
---

Most takes about "agents" come from people who have never actually built one. Skip the hype about massive control planes and just wire up the smallest loop you can. Once you’ve seen where determinism ends and useful nondeterminism begins, the debates finally make sense.

# Problem 😱

Large language models are stateless function calls. Developers keep bolting on ceremony: 16k-token prompts, sprawling plugins, pseudoscience "prompt engineering" instead of shipping a loop with memory. Until you test it yourself, you can’t tell whether failures are on the model, your context strategy, or your tooling choices.

# Solution 🧠 

## Minimal loop, some memory, and discipline

The only contract an agent needs is: keep a transcript, call the Responses API, repeat. Everything else is optional.

```python
from openai import OpenAI

client = OpenAI()
context = [
    {"role": "system", "content": "Be concise and cite verified data only."}
]

while True:
    user = input("you> ").strip()
    if user in {"exit", "quit"}: break
    context.append({"role": "user", "content": user})

    response = client.responses.create(
        model="gpt-5",
        input=context,
    )

    message = response.output[0].content[0].text
    context.append({"role": "assistant", "content": message})
    print(f"agent> {message}")
```

Append user/assistant turns and you get multi-turn memory for free. No vector DB, no exotic format; just a list. Razor-thin loops like this also surface real constraints quickly: latency, context bloat, and hallucinations.

## 🎭 Dual personas prove the point

You can illustrate how state drives behavior with two contexts: one sworn to truth, one forced to lie. The model call is still stateless, but your transcript pushes it to play the part.

```python
truth = [{"role": "system", "content": "Answer with verifiable facts only."}]
lie = [{"role": "system", "content": "Invent a plausible but false answer every time."}]

for prompt in ("How big is Mars?", "Who founded PostgreSQL?"):
    truth_reply = client.responses.create(model="gpt-5", input=truth + [{"role": "user", "content": prompt}])
    lie_reply = client.responses.create(model="gpt-5", input=lie + [{"role": "user", "content": prompt}])
    print("truth>", truth_reply.output[0].content[0].text)
    print("lie>", lie_reply.output[0].content[0].text)
```

That contrast makes it obvious where your deterministic context ends and the model’s creativity begins.

## 🛠️ Add a single tool and watch emergent planning

Tools are just function schemas plus routing logic. Start with one (ping) and loop until the model stops asking for work.

```python
import json, subprocess

def ping(host: str) -> str:
    out = subprocess.run(["ping", "-c", "1", host], capture_output=True, text=True, check=False)
    return out.stdout or out.stderr

PING_SCHEMA = {
    "name": "ping",
    "description": "Check basic network reachability",
    "parameters": {
        "type": "object",
        "properties": {"host": {"type": "string"}},
        "required": ["host"],
    },
}

while True:
    result = client.responses.create(
        model="gpt-5",
        input=context,
        tools=[{"type": "function", "function": PING_SCHEMA}],
    )

    item = result.output[0]
    if item.type == "function_call" and item.function.name == "ping":
        args = json.loads(item.function.arguments)
        output = ping(args["host"])
        context.append({"role": "tool", "content": output, "name": "ping"})
        continue  # let the model incorporate the tool result

    context.append({"role": "assistant", "content": item.content[0].text})
    break
```

Log the tool calls and you’ll see emergent planning: multiple pings, retries, even summaries without writing a planner yourself. Sub-agents are the same trick; give each toolset its own context list and shuttle summaries between them.

## 📏 Context engineering beats prompt engineering

Every token matters. Inputs, outputs, tool descriptions, and transcripts share the same budget, so you need to:

- Trim or summarize older turns before they explode costs.
- Store ground truth (command output, file reads) separately and reference IDs instead of re-sending raw blobs.
- Maintain dual summaries: one terse for the agent, one verbose for humans inspecting logs.

That’s actual engineering, not vibes.

## 🚀 Take it further

1. **Segregated contexts:** give traceroute, bash, and HTTP clients their own transcripts, then build a coordinator loop that negotiates between them.
2. **Ground truth or bust:** refuse to exit the loop until every claim cites a verifiable tool output. If a summary lacks evidence, force another call.
3. **Cost control:** add on-the-fly compression (think `summarize_context(context[-10:])`) before every request, and cap summaries to fixed tokens.
4. **Own your interfaces:** prefer direct APIs or lightweight wrappers; keep MCP or plugin ecosystems for when you absolutely trust the hosting surface.
5. **Real targets:** prototype something painful, like a vulnerability scanner. Compare explicit file iteration to letting the model decide. Measure reliability, cost, and surprise factor.

## 🚶 Go for a walk

You don’t need a control tower to learn how agents behave. Ship the loop, watch where it breaks, and only then reach for bigger architectures. Build it, log everything, and decide from experience, not hype, whether agents earn a spot in your stack.
