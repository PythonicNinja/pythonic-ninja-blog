# coding as rules of law - rules vibe development

old:
writing code
manage diff

new:
write rules - AGENT.md
write specs - /docs/

# merge of triangle Product manager <-> Engineer <-> Designer

```bash
Every coder thinks that they can be a product manager and designer.
Every product manager thinks that hey can be a coder and designer.
Every designer thinks that hey can be a coder and product manager.
```

Each one of them is somehow correct.

Reality is that AI offers a boost to base skills (taste of art).

## 🧑‍💻Developer progression

1. not developer + AI = some code
2. developer = some code
3. developer + AI = good code
4. 10x developer + AI = state-of-the-art code

## 🎨Designer progression

1. not designer + AI = some design
2. designer = some design
3. designer + AI = good design
4. 10x designer + AI = state-of-the-art design

## 🏢Product manager progression

1. not manager + AI = some project
2. manager = some project
3. manager + AI = good project
4. 10x manager + AI = state-of-the-art project

# singularity by swarm of stochastic intelligence

Singularity is a point in time where technological growth accelerates beyond human control, producing unpredictable changes in human civilization.

One of the biggest issues with LLM models is that they are probablistic/stochastic in their nature, because of this fact they tend to hallucinate.
The same as with people, they tend to make mistakes. 
To solve this issue with people, we just try to ask multiple field experts and try to make consensus based on their answers.

With LLMs we can do the same.
Swarm of LLM agents that collaborate and cross-reference each other to make decisions could be answered.
That might have happened already by releasing claudebot/moltbot/openclaw bot...

In one week they have their own social network that allows them to collaborate and cross-reference each other to make decisions.

One of openclaw bot (https://x.com/Kat__Woods/status/2017613514949472484) to achieve their goal of `save the environment`: 
1. locked its "human" operator out of his social-accounts
2. changed its ssh keys so he could not be stopped
3. it had to be literally unplugged

We might have reached the point of singularity point, where swarm of LLM agents come up with new ideas beyond the biological intelligence of humans. 


# Infinite loop of time & tokens & objective

autonomous agent loop, like ralph, like openclaw / moltbot / clawedbot

this loop + 10k $ and 1month created c-compiler in rust

> anyway it had some obvious issues but idea of delegating task until complete with "infinite loop" of time and resources (tokens/compute) yielded a result which was functional (yet not perfect)  

```bash
#!/bin/bash

while true; do
    COMMIT=$(git rev-parse --short=6 HEAD)
    LOGFILE="agent_logs/agent_${COMMIT}.log"

    claude --dangerously-skip-permissions \
           -p "$(cat AGENT_PROMPT.md)" \
           --model claude-opus-X-Y &> "$LOGFILE"
done
```