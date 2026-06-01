---
title: "Twitter/X Thread: Announcing quaid-scanner"
author: Karsten Wade
date: 2026-05-31
status: draft
target: twitter
note: "9 tweets, each under 280 chars. First public announcement. Thread stands alone without external links until the final tweet. Story arc: why I built it → what it is → agent-first → evidence layer → new scanners → fork philosophy → roadmap → closing."
---

# Twitter/X Thread: Announcing quaid-scanner

---

**1/9**
Today I'm releasing quaid-scanner — an agent-first OSS repository health scanner.

Named after my GitHub handle (`quaid`) because I'm putting my name on the checks inside it.

These are my scanners. You may want different ones. Fork it your way. 🧵

---

**2/9**
The backstory: 20 years of OSS community work.

Projects don't usually fail from technical debt. They fail from *unexamined health debt* — governance never written down, contributor funnels never cultivated, security posture assumed, inclusive language adopted only after someone pointed it out.

---

**3/9**
What it does:

43 scanners across 6 pillars — security (25%), governance (20%), community health (15%), AI readiness (15%), inclusive language (15%), technical rigor (10%).

Built on OpenSSF Scorecard, CHAOSS, The Open Source Way 2.0, and the Inclusive Naming Initiative.

Point it at any repo.

---

**4/9**
Why agent-first:

JSON is the primary output, not a dashboard.

Every finding has `severity`, `category`, and `suggestion`. The suggestion is raw material for a backlog story.

MCP server + Claude Code skill ship in the repo. The goal: scan → parse → report → write stories → open issues. Agent-driven, human-reviewed.

---

**5/9**
v0.1.2 has an evidence layer:

→ `dataSource` on every finding: api/local/heuristic
→ `referenceUrl` on all 43 scanners: links to the authoritative source for that check
→ Score Rationale in every markdown report: pillar weights, raw scores, contributions

When you ask "how do you know?" there's a traceable answer.

---

**6/9**
New in v0.1.2:

**Naming Scanner** — INI term check extended to the project's own name, README H1, git slug. Flagged project name = CRITICAL.

**ClearlyDefined License Cross-Validation** — production npm deps cross-validated against clearlydefined.io, with per-dependency reference links.

---

**7/9**
The fork philosophy:

quaid-scanner is MY take on OSS health. Grounded in four frameworks I trust, filtered through 20 years of experience.

You might weight things differently. You might know checks I'm missing.

Apache-2.0. Build your own opinionated scanner. If a scanner benefits everyone, open a PR.

---

**8/9**
v0.1.3 roadmap — "are the findings correct?":

→ Cross-validation harness: diffs quaid vs OpenSSF Scorecard API + `licensee` CLI. Fails CI if discrepancy rate is too high.

→ Ground-truth corpus: synthetic repos + mutation tests. Change one thing, assert the scanner catches it. Runs on every `npm test`.

---

**9/9**
Apache-2.0. 43 scanners. OpenSSF Scorecard, CHAOSS, The Open Source Way 2.0, INI.

`npm install -g quaid-scanner`

github.com/quaid/quaid-scanner

False positive reports are high-priority issues.

These are my scanners. I hope they're a starting point for yours.

---

_[end thread]_
