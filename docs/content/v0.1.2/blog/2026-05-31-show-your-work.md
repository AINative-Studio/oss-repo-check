---
title: "Show Your Work: quaid-scanner v0.1.2 and the Evidence Layer"
slug: quaid-scanner-v012-evidence-layer
description: quaid-scanner v0.1.2 adds dataSource labels, referenceUrl links, a Score Rationale section, and two new scanners — because a finding you can trace is a finding you can act on.
author: Karsten Wade
date: 2026-05-31
status: draft
target: iquaid.org
tags: [quaid-scanner, open-source, oss-health, agents, chaoss, inclusive-naming, trust, auditability]
---

# Show Your Work: quaid-scanner v0.1.2 and the Evidence Layer

There is a moment that happens when you hand someone a scan report.

They look at a CRITICAL finding — say, a dependency license that might be copyleft-incompatible with their commercial product — and they ask: _Where is this coming from? How do you know?_

It is a fair question.
A tool that produces findings without traceable evidence is a tool you cannot fully trust.
And a tool you cannot trust becomes a tool you stop using.

v0.1.2 is mostly an answer to that question.

---

## The Evidence Layer

Three additions in this release address the same underlying need: auditability.

**`dataSource` on every finding.**
Every finding now carries a tag indicating where its data originated: `api` (cross-validated against an external service), `local` (derived from the repository contents), or `heuristic` (inferred from structure or absence).

This matters for the same reason lab reports mark their methodology.
A finding that says "this Action dependency is pinned to a mutable tag" derived from reading the workflow file directly is fundamentally different from a finding derived from an AI inference about project structure.
Now those differences are visible in the output and rendered in markdown reports.

**`referenceUrl` on all 43 scanners.**
Every scanner now populates a `referenceUrl` pointing to the authoritative source for that check.
For OpenSSF Scorecard findings, the URL is a dynamically computed link to the Scorecard viewer for the specific project.
For ClearlyDefined license cross-validation, it links to the definition page for the specific dependency.
For governance checks, it links to the CHAOSS metric definition or the relevant section of The Open Source Way.

When someone asks _what does this check against_, the answer is a click away.

**Score Rationale section in markdown reports.**
Every markdown report now ends with a table showing each pillar's weight, raw score, and weighted contribution to the overall score.
The overall score is no longer a number that appears from somewhere; it is the sum of a transparent calculation you can verify.

---

## New Scanners

v0.1.2 adds two scanners, bringing the total to 43.

**Naming Scanner.**
The Inclusive Naming Initiative's term list has always been checked against source code and documentation.
v0.1.2 adds a check one level up: the project's own `package.json` name, README H1 heading, and git remote repository slug.
If the project's identity — not just its prose — contains a flagged term, that is a CRITICAL finding, not an INFO.
The severity tiers (CRITICAL for tier 1, WARNING for tier 2, INFO for tier 3) and rename suggestions follow the same pattern as the code and doc scanners.

**ClearlyDefined License Cross-Validation.**
The existing license scanner checks a project's own license file.
The new scanner checks its production npm dependencies against the [ClearlyDefined.io](https://clearlydefined.io/) public API — the most comprehensive open database of machine-readable, community-verified OSS licenses.
Copyleft dependencies get a WARNING.
Unrecognised SPDX expressions get a WARNING.
`NOASSERTION` or missing license data gets an INFO.

The scanner degrades gracefully on network failure: if ClearlyDefined is unreachable, the findings are skipped rather than erroring.
For test isolation, the `fetchFn` is injectable.

---

## Managing Noise

One practical addition that is easy to overlook: `.quaid-scanner-ignore` file support.

Place a `.quaid-scanner-ignore` file at the root of any scanned repository and the inclusive language scanners will skip the listed paths.
The format follows `.gitignore` conventions — one glob pattern per line, `#` comments, blank lines ignored.

This matters because test files and documentation often contain flagged terms intentionally — as test assertions or as examples of what _not_ to write.
Without a way to exclude these paths, the scanner produces false positives that erode trust in the real findings.

This also activates the `excludePatterns` configuration option that existed in the type definitions but was never wired to any scanner.
If you have been setting it and wondering why it had no effect, it now does.

---

## Community Health for the Tool Itself

The scanner now also meets the standards it enforces.

`CODE_OF_CONDUCT.md` (Contributor Covenant 2.1), `SECURITY.md`, and `SUPPORT.md` are committed.
Branch protection is on `main`: required PR review, force push disabled.
GitHub issue templates are in place for bug reports, feature requests, and false positives.

These are not performative.
The issue template for false positives exists because false positives are the feedback loop I most want to close — every confirmed false positive is either a tuning problem or a documentation gap that should be fixed.

---

## What Is Next

v0.1.2 answers the question _where does this finding come from?_
v0.1.3 answers the adjacent question _is this finding correct?_

These are related but distinct.
Transparency about sources does not substitute for verification of accuracy.
You need both.

The v0.1.3 roadmap has two epics.

**Epic 11: Cross-Validation Harness.**
A developer script (`scripts/cross-validate.ts`) that runs the same check independently through quaid and through an authoritative external tool, then diffs the outputs.
The initial targets are the two scanners most exposed to accuracy questions:

- `openssf-scorecard` — quaid already calls the OpenSSF Scorecard API; the cross-validator calls it independently and compares per-check verdicts.
  Any discrepancy (quaid flags something the API does not, or misses something it does) surfaces as a diff.
- `license-detection` — quaid's keyword-based local matching is compared against the `licensee` CLI, which is the same detector GitHub uses internally.
  SPDX identifiers are compared side by side.

This also becomes a weekly GitHub Actions workflow running against five reference repositories.
If the discrepancy rate on any check exceeds a configured threshold, the workflow fails.
That is the feedback loop that catches scanner drift before users do.

**Epic 12: Ground-Truth Corpus.**
A set of synthetic fixture repositories, each with precisely known properties, run through the full orchestrator on every `npm test` run.
The corpus is built from factory functions rather than checked-in fixtures, so it cannot drift.

The mutation testing variant is the most useful: start from a "perfect repo" — one where every check passes — apply a single controlled change (remove a `permissions:` block from one workflow, pin a dependency to a mutable tag, add a flagged term to the package name), run the scanner, assert that exactly the expected finding now appears.

If the mutation test passes, the scanner catches what it claims to catch.
If it does not, you have a regression — and you have it before it reaches a user.

```bash
# Update
npm install -g quaid-scanner

# Add a .quaid-scanner-ignore to exclude test fixtures
echo 'tests/**' >> .quaid-scanner-ignore

# Scan with the new evidence layer
quaid-scanner . --depth standard --format markdown
```

github.com/quaid/quaid-scanner

If you find a finding that looks wrong, the [issue tracker](https://github.com/quaid/quaid-scanner/issues) is the right place to bring it.
False positives are high-priority issues.
