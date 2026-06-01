---
title: "Bluesky Thread: quaid-scanner v0.1.2"
author: Karsten Wade
date: 2026-05-31
status: draft
target: bluesky
note: "8 posts. Bluesky audience skews OSS and fediverse-adjacent — lean into open standards, CHAOSS, auditability. The v0.1.1 thread introduced the tool; this one assumes some familiarity and focuses on the trust/evidence story."
---

# Bluesky Thread: quaid-scanner v0.1.2

---

**1/8**
Shipped: quaid-scanner v0.1.2

The theme is trust.

When a scanner tells you a dependency license might be copyleft-incompatible, you should be able to ask _how do you know?_ and get a traceable answer.

v0.1.2 builds that answer into every finding.

🧵

---

**2/8**
Three additions to address auditability:

→ `dataSource` field on every finding: `api`, `local`, or `heuristic`
→ `referenceUrl` on all 43 scanners: links to the OpenSSF Scorecard viewer, ClearlyDefined definition page, CHAOSS metric, or relevant standard
→ Score Rationale section: markdown reports now end with a pillar-by-pillar weight/score/contribution table

A finding you can trace is a finding you can act on.

---

**3/8**
New scanner: ClearlyDefined License Cross-Validation.

Production npm dependencies are now cross-validated against the ClearlyDefined.io public API — the most comprehensive open database of community-verified OSS licenses.

Copyleft → WARNING.
Unrecognised SPDX → WARNING.
NOASSERTION → INFO.

Each finding links to the specific ClearlyDefined definition page for that dependency.

---

**4/8**
New scanner: Naming Scanner.

The INI term list check now extends to the project's own identity — `package.json` name, README H1 heading, git remote repo slug.

If your project's name contains a flagged term, that is a CRITICAL finding, not an INFO.

(43 total scanners now.)

---

**5/8**
Practical: `.quaid-scanner-ignore` support.

Place a `.quaid-scanner-ignore` at the root of any scanned repo to exclude paths from inclusive language scanning. Follows `.gitignore` format.

This matters because test fixtures often contain flagged terms as intentional test assertions. Without noise management, every false positive erodes trust in the real findings.

---

**6/8**
This also fixes a long-standing gap: `excludePatterns` in `InclusiveConfig` existed in the type definitions but was never wired to any scanner.

It now is.

If you were setting it and wondering why it had no effect — it works now.

---

**7/8**
The scanner now meets the standards it enforces:

→ `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1)
→ `SECURITY.md` + `SUPPORT.md`
→ Branch protection on main
→ Issue templates for bug reports, feature requests, and false positives

The false positive template exists because that feedback is the one I most want.

---

**7b/8 — roadmap**
v0.1.2 answers: _where does this finding come from?_

v0.1.3 answers: _is this finding correct?_

Two mechanisms:

→ **Cross-validation harness**: diffs quaid findings against OpenSSF Scorecard API + `licensee` CLI independently; fails if discrepancy rate exceeds threshold. Runs weekly in CI.

→ **Ground-truth corpus**: synthetic repos, precisely known properties. Mutation tests: start from a "perfect repo", apply one change, assert the finding appears. Runs on every `npm test`.

---

**8/8**
Apache-2.0. 43 scanners. Built on OpenSSF Scorecard, CHAOSS metrics, The Open Source Way 2.0, and the Inclusive Naming Initiative.

`npm install -g quaid-scanner`

github.com/quaid/quaid-scanner

False positives are high-priority issues — the false positive report template in the issue tracker is the feedback I most want.

---

_[end thread]_
