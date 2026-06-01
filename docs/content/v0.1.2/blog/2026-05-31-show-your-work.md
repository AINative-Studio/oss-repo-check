---
title: "My Scanners, Your Fork: Introducing quaid-scanner"
slug: introducing-quaid-scanner
description: Twenty years of watching open source projects accumulate invisible health debt convinced me to build quaid-scanner — an opinionated, agent-first OSS health scanner that puts my name on the checks and invites you to fork your own version of them.
author: Karsten Wade
date: 2026-05-31
status: draft
target: iquaid.org
tags: [quaid-scanner, open-source, oss-health, agents, mcp, chaoss, inclusive-naming, community-health]
---

# My Scanners, Your Fork: Introducing quaid-scanner

I have been working in and on open source communities for about twenty years.
In that time I have been asked the same question in dozens of forms: _Is this project healthy?_

The questioner is sometimes a CTO evaluating a dependency.
Sometimes a foundation governance committee deciding whether to incubate a project.
Sometimes a program office managing a portfolio of a hundred repositories.
Sometimes a maintainer trying to understand where their project stands.

The question sounds simple.
The answers people produce for it are slow, inconsistent, and do not scale.
I have watched projects fail — not from technical debt but from what I think of as _unexamined health debt_: governance never written down, contributor funnels never cultivated, security posture assumed rather than verified, inclusive language practices adopted only after someone pointed out a problem.

I built quaid-scanner to make that debt visible at machine speed.
I named it after myself — my GitHub handle is `quaid` — because I am putting my name on the choices inside it.

---

## What It Is

quaid-scanner evaluates any open source repository across six weighted pillars:

| Pillar | Weight |
|--------|--------|
| Security & Supply Chain | 25% |
| Governance & Legal | 20% |
| Community Health | 15% |
| AI-Native & Agentic Readiness | 15% |
| Inclusive Language | 15% |
| Technical Rigor | 10% |

Forty-three scanners run across those pillars.
The frameworks they draw on are the ones I trust most: [OpenSSF Scorecard](https://securityscorecards.dev/), [CHAOSS metrics](https://chaoss.community/), [The Open Source Way 2.0](https://www.theopensourceway.org/), and the [Inclusive Naming Initiative](https://inclusivenaming.org/).

The output is a score from 0–10, a detailed JSON report, and a findings list where every entry carries a `severity`, a `category`, a `suggestion`, a `dataSource` (api, local, or heuristic), and a `referenceUrl` pointing to the authoritative source for that check.

---

## Why "My Scanners"

The name is deliberate.
quaid-scanner is not a standards-body output or a committee consensus.
It is the set of checks _I_ run when I evaluate an OSS project — grounded in four frameworks I trust but filtered through twenty years of judgment about what actually matters.

I run inclusive language scans across source, documentation, _and_ the project name itself.
I check for vendor neutrality in contributor composition.
I flag AI-native readiness — model cards, dataset provenance, agentic rule files — because I believe this is an underweighted signal of long-term health.
I cross-validate npm dependency licenses against ClearlyDefined.io because I think license data from the project's own LICENSE file alone is not enough.

You might weight these differently.
You might know a check I am missing.
You might think one of my pillars is wrong-sized.

That is why the license is Apache-2.0 and the repository is public: fork it your way.
Build your own opinionated scanner with the checks that reflect your experience.
And if you build a scanner or skill that would be useful to others, open a PR — the goal is a tool that gets more accurate over time with more eyes on it.

---

## Why Agent-First

Most health-scoring tools are built to be read by humans.
The score goes in a dashboard.
A human reads the dashboard.
A human decides what to do.

quaid-scanner is built to be _operated_ by an agent.

This is not a marketing distinction — it changes the design in concrete ways.
JSON is the primary output format; markdown is secondary.
Every finding has a machine-parseable `category`, `severity`, and `suggestion`.
The `suggestion` field is the link between a finding and a backlog story.
The MCP server exposes `scan_repository` and `graph_query` as first-class agent tools.
A Claude Code skill ships in the repository.

The workflow I have in mind:

1. An agent scans a repository (or a portfolio in parallel background jobs)
2. The agent parses findings by pillar and severity
3. The agent fills a report template from the structured JSON
4. The agent derives user stories from findings using a story template bank
5. The agent opens GitHub issues from those stories

At each step, a human reviews and adjusts.
But the heavy lifting — the classification, the synthesis, the story writing — is done.
This is the difference between a scan that produces a PDF you file and forget, and a scan that produces a backlog you actually work through.

---

## What You Get Today (v0.1.2)

The current release has 43 scanners and an evidence layer designed around auditability.

When someone asks _how do you know?_ about a finding, there is now a traceable answer:

- **`dataSource`** on every finding labels whether the data came from an external API, the repository contents directly, or a structural heuristic. A finding backed by a live ClearlyDefined.io API call is a different confidence level than one inferred from file naming conventions. Both are useful; they are different.

- **`referenceUrl`** on every scanner links to the authoritative source for that check — the OpenSSF Scorecard viewer for the specific project, the ClearlyDefined definition page for a specific dependency, the CHAOSS metric definition for a community health check, the SPDX license page for a license identifier.

- **Score Rationale** at the end of every markdown report shows each pillar's weight, raw score, and weighted contribution to the overall. The overall score is no longer a number that appears from somewhere; it is the visible sum of transparent inputs.

Two new scanners in this release:

- **Naming Scanner** — the INI term check now extends to the project's own identity: `package.json` name, README H1 heading, git remote slug. A flagged project name is CRITICAL, not INFO.
- **ClearlyDefined License Cross-Validation** — production npm dependencies cross-validated against the ClearlyDefined.io public API, with per-dependency links in the findings.

And a practical tool for noise management: place a `.quaid-scanner-ignore` at the root of any scanned repository to exclude paths from inclusive language scanning. Same format as `.gitignore`. This matters because test fixtures contain flagged terms as test assertions — without a way to exclude them, false positives from test files erode confidence in the real findings.

---

## What Is Coming (v0.1.3)

v0.1.2 answers _where does this finding come from?_
v0.1.3 answers _is this finding correct?_

Two mechanisms:

**Cross-validation harness** — a developer tool and weekly CI workflow that queries the OpenSSF Scorecard API and the `licensee` CLI independently and diffs the outputs against quaid's findings. Discrepancies above a threshold fail the workflow. This is how scanner drift gets caught before users do.

**Ground-truth corpus** — synthetic fixture repositories with precisely controlled properties, run through the full orchestrator on every `npm test`. The mutation testing variant is the most useful: start from a "perfect repo" (all checks pass), apply one change (remove a `permissions:` block from a workflow, pin a dependency to a mutable tag, add a flagged term to the project name), run the scanner, assert the expected finding appears. If the mutation test passes, the scanner catches what it claims to catch.

---

## Starting Points

```bash
npm install -g quaid-scanner

# Scan the current directory
quaid-scanner . --depth standard

# Scan a GitHub repository
GITHUB_TOKEN=ghp_xxxx quaid-scanner https://github.com/owner/repo

# Agent-friendly: silent JSON
quaid-scanner . --quiet --format json | jq '.overallScore'

# Exclude test fixtures from inclusive language scanning
echo 'tests/**' >> .quaid-scanner-ignore
```

The repository is at [github.com/quaid/quaid-scanner](https://github.com/quaid/quaid-scanner).
The MCP server configuration, the Claude Code skill, and the full scanner reference are in the README.

If you find a finding that looks wrong — false positive, wrong severity, missing signal — the issue tracker has a template specifically for false positive reports.
That feedback is high-priority, because the accuracy work in v0.1.3 is only as good as the confirmed cases it has to work with.

And if you have a scanner that belongs in here — or a different weighting philosophy you want to explore — the codebase is Apache-2.0 and the PR queue is open.
These are my scanners.
I hope they become a starting point for yours.
