---
layout: ../../layouts/PostLayout.astro
title: "EV of AGI for the Western World"
subtitle: "Use white-collar payroll as the prize pool for AGI bets"
tags: ["AI", "Economics", "Strategy"]
date: 2025-11-15
category: ai
image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1350&q=80"
seo:
  title: "EV of AGI for the Western World"
  description: "Quantify AGI’s expected value by tying probabilities to the trillions spent on white-collar labor."
  noindex: false
---

# 😰Problem

Tom Phillips’ “AGI fantasy” essay [1] jokes that believers happily multiply a microscopic chance (0.001%) with an astronomical payoff and still walk away claiming an enormous expected value (EV). The thought experiment is catchy, but it stays abstract-no numbers tied to real GDP streams, no grounding in the payrolls we actually pay today. Meanwhile, we now estimate (thanks to a quick Perplexity pull [2]) that white-collar workers in “Western” economies earn roughly **15-30 trillion USD per year**. If AGI targets that pool, why aren’t we doing the math with it?

# 🧮Solution

Keep the EV math simple and defensible:

1. **Anchor the reward.** Use the white-collar payroll range above. I’ll call it `W`, where `W ∈ [15T, 30T]`.
2. **Decide the automation share `a`.** This is the percent of white-collar labor AGI could replicate or amplify.
3. **Add spillovers `s`.** Fast-follow GDP growth from new goods/services. To stay grounded, measure this as a share of today’s 60T USD advanced-economy GDP.
4. **Include transition costs `c`.** Failed AGI bets still burn capital, political focus, and lost R&D time, so give the downside a real dollar figure.
5. **Multiply by probability `p`.** This is the only speculative piece-and the one you should argue about openly.

That yields a reusable expected-value skeleton:

```
EV = p * (a * W + s * 60T) + (1 - p) * (-c)
```

Everything is in *trillions of inflation-adjusted USD per year*, which keeps comparisons honest and removes magical thinking from the conversation.

# 📊Example

Three sanity-checked scenarios make the Tom Phillips argument concrete. Plug the numbers directly into the formula so anyone can tweak the assumptions.

### 1. Optimistic

**Formula**  
`EV = (0.30 * (0.75 * 28T + 0.15 * 60T)) + (0.70 * -1.5T)`  

**Result**  
`≈ +7.95T USD/year`

**Summary**  
Assume a 30% chance that AGI automates 75% of a 28T USD payroll and sparks spillovers worth 15% of current Western GDP, with only 1.5T lost when it fails. That bet delivers almost eight trillion dollars of annual upside-roughly the size of Germany’s entire economy-making aggressive investment rational.

### 2. Mid

**Formula**  
`EV = (0.10 * (0.35 * 22T + 0.05 * 60T)) + (0.90 * -0.8T)`  

**Result**  
`≈ +0.35T USD/year`

**Summary**  
Here AGI has a 10% chance to cover just a third of the 22T payroll and generates modest spillovers (5% of GDP). Because failures still cost 0.8T in wasted compute, talent churn, and regulatory blowback, the payoff shrinks to a few hundred billion. It’s positive, but only if we stage investments and hit early milestones before scaling.

### 3. Pessimistic

**Formula**  
`EV = (0.01 * (0.15 * 18T + 0.01 * 60T)) + (0.99 * -2.5T)`  

**Result**  
`≈ -2.44T USD/year`

**Summary**  
Suppose there’s only a 1% chance that AGI covers 15% of an 18T payroll and creates essentially no spillovers, while failed bets vaporize 2.5T through stranded capex and productivity drag. The EV plunges negative, so macro planners would demand clear intermediate wins or redirect the money toward proven digitalization projects instead.

# 🚀Take it further

- Recalculate `W` country by country using employee-compensation data so policy teams can see how much of “their” payroll is at stake.  
- Run Monte Carlo simulations over `p`, `a`, and `c` to visualize when AGI bets beat baseline automation investments.  
- Add opportunity-cost terms (delayed net-zero build-out, demographic adaptation) so the EV model competes against every other trillion-dollar program, not just against hype.

## References

[1] https://www.tomwphillips.co.uk/2025/11/agi-fantasy-is-a-blocker-to-actual-engineering/  
[2] https://www.perplexity.ai/search/what-is-total-amount-of-paid-l-rPgDlLG0Sx2FRM7rQY7hgw
