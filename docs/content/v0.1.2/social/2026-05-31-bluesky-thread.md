---
title: "Bluesky Thread: Announcing quaid-scanner"
author: Karsten Wade
date: 2026-05-31
status: draft
target: bluesky
note: "9 posts. First public announcement — audience knows nothing about the tool. Bluesky audience skews OSS and fediverse-adjacent — lean into open standards, CHAOSS, personal accountability, fork philosophy. Build the story: why I built it → what it is → why agent-first → what's in it → fork invitation → roadmap."
---

# Bluesky Thread: Announcing quaid-scanner

---

**1/9**
Today I'm publicly releasing quaid-scanner — an agent-first OSS repository health scanner I've been building.

I named it after my GitHub handle (`quaid`) because I'm putting my name on the checks inside it.

These are my scanners. You may want different ones. Fork it your way.

🧵

---

**2/9**
The backstory: twenty years of OSS community work, watching projects fail not from technical debt but from unexamined health debt.

Governance never written down. Contributor funnels never cultivated. Security posture assumed but unverified. Inclusive language adopted only after someone pointed out a problem.

I wanted a tool that made that debt visible at machine speed.

---

**3/9**
What it does:

43 scanners across 6 weighted pillars — security (25%), governance (20%), community health (15%), AI readiness (15%), inclusive language (15%), technical rigor (10%).

Built on OpenSSF Scorecard, CHAOSS metrics, The Open Source Way 2.0, and the Inclusive Naming Initiative.

Point it at a local path or a GitHub URL.

---

**4/9**
Why agent-first changes the design:

JSON is the primary output, not a dashboard. Every finding has a `severity`, `category`, and `suggestion`. The suggestion is raw material for a backlog story.

MCP server exposes `scan_repository` + `graph_query`. Claude Code skill ships in the repo.

The goal: scan → parse findings → fill report → write stories → open issues. Agent-driven, human-reviewed.

---

**5/9**
Current release (v0.1.2) has an evidence layer:

→ `dataSource` on every finding: `api`, `local`, or `heuristic`
→ `referenceUrl` on all 43 scanners: links to the OpenSSF viewer, ClearlyDefined, CHAOSS metric, or relevant standard
→ Score Rationale at end of every markdown report: pillar weights, raw scores, weighted contributions

When you ask "how do you know?" there's now a traceable answer.

---

**6/9**
Two new scanners in v0.1.2:

→ **Naming Scanner**: INI term check extended to the project's own identity — `package.json` name, README H1, git remote slug. Flagged project name = CRITICAL, not INFO.

→ **ClearlyDefined License Cross-Validation**: production npm dependencies cross-validated against clearlydefined.io, with per-dependency reference links.

43 total.

---

**7/9**
The fork philosophy:

quaid-scanner represents _my_ judgment about what OSS health means — grounded in four frameworks I trust but filtered through twenty years of experience.

You might weight things differently. You might know checks I'm missing. Apache-2.0 for a reason.

Build your own opinionated scanner. And if a scanner or skill would be useful to others, open a PR.

---

**8/9**
v0.1.3 roadmap — answering _are the findings correct?_

→ **Cross-validation harness**: diffs quaid vs OpenSSF Scorecard API + `licensee` CLI independently; fails CI if discrepancy rate exceeds threshold. Weekly.

→ **Ground-truth corpus**: synthetic repos with known properties. Mutation tests: start from a "perfect repo", apply one change, assert the scanner catches it. Runs on every `npm test`.

---

**9/9**
Apache-2.0. 43 scanners. OpenSSF Scorecard, CHAOSS, The Open Source Way 2.0, INI.

`npm install -g quaid-scanner`

github.com/quaid/quaid-scanner

If you find a finding that looks wrong, the issue tracker has a false-positive template. That feedback is high-priority.

These are my scanners. I hope they're a starting point for yours.

---

_[end thread]_
