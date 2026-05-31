---
title: "Twitter/X Thread: quaid-scanner v0.1.2"
author: Karsten Wade
date: 2026-05-31
status: draft
target: twitter
note: "8 tweets, each under 280 chars. Thread stands alone without external links until the final tweet. Focus: the trust/evidence story. Assume v0.1.1 was seen by at least part of the audience."
---

# Twitter/X Thread: quaid-scanner v0.1.2

---

**1/8**
Shipped quaid-scanner v0.1.2.

The theme: trust.

When the scanner flags a dependency license or a flagged term in your project name, you should be able to ask "how do you know?" and get a real answer.

v0.1.2 builds that answer into every finding. 🧵

---

**2/8**
Three changes for auditability:

→ `dataSource` on every finding: `api`, `local`, or `heuristic`
→ `referenceUrl` on all 43 scanners: link to the specific standard or data source
→ Score Rationale table: markdown reports now show each pillar's weight + contribution

A finding you can trace is a finding you can act on.

---

**3/8**
New: ClearlyDefined License Cross-Validation scanner.

Checks production npm dependencies against ClearlyDefined.io — the most comprehensive database of community-verified OSS licenses.

Copyleft → WARNING (with link to the specific ClearlyDefined definition).
Unrecognised SPDX or NOASSERTION → INFO.

---

**4/8**
New: Naming Scanner.

The INI term list check now extends to the project's identity — package.json name, README H1, git remote slug.

If your project's *name* contains a flagged term, that's CRITICAL, not INFO.

43 total scanners now.

---

**5/8**
Quality-of-life addition: `.quaid-scanner-ignore`

Place one at the root of any scanned repo. Paths listed are skipped by inclusive language scanners.

Test files that contain flagged terms as test assertions should not produce findings. Now they don't.

Same format as `.gitignore`.

---

**6/8**
Also fixed: `InclusiveConfig.excludePatterns` existed in the type definitions but was never wired to any scanner.

It is now.

If you were setting it in your quaid-scanner config and wondering why nothing changed — it works now.

---

**7/8**
The scanner now meets its own standards:

→ CODE_OF_CONDUCT (Contributor Covenant 2.1)
→ SECURITY.md + SUPPORT.md
→ Branch protection on main
→ Issue templates including one specifically for false positives

v0.1.3: accuracy validation against OpenSSF Scorecard API + `licensee` CLI.

---

**8/8**
Apache-2.0. 43 scanners. OpenSSF Scorecard, CHAOSS, The Open Source Way 2.0, INI.

`npm install -g quaid-scanner`

github.com/quaid/quaid-scanner

If you find a finding that looks wrong — false positive, wrong severity, missing signal — open an issue. That feedback is high-priority.

---

_[end thread]_
