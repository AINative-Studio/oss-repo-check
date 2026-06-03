import type { Finding, ScanReport } from './types/index.js';

/**
 * Returns true when a finding represents a scanner failure (timeout or crash)
 * rather than a real problem in the scanned repo.
 * Filter these out before filing issues or computing aggregate scores.
 */
export function isErrorFinding(f: Finding): boolean {
  return f.category === 'timeout' || f.category === 'error';
}

/**
 * Renders a structured, agent-executable GitHub issue body from a single finding.
 * Produces five sections (What / Why / How to fix / How to verify / Context)
 * with enough specificity that a coding agent can act on the issue alone.
 */
export function renderIssueBody(finding: Finding, report: ScanReport): string {
  const severity = typeof finding.severity === 'number'
    ? ['PASS', 'INFO', 'WARNING', 'CRITICAL'][finding.severity] ?? String(finding.severity)
    : String(finding.severity);

  const verifyCmd = `quaid-scanner . --format json | jq '[.findings[] | select(.category == "${finding.category ?? 'unknown'}")] | length'`;

  const lines: string[] = [
    `<!-- quaid-scanner finding — pillar: ${finding.pillar}, severity: ${severity} -->`,
    ``,
    `## What is wrong`,
    ``,
    finding.message,
    finding.file ? `\nAffected file: \`${finding.file}\`${finding.line != null ? `:${finding.line}` : ''}` : '',
    ``,
    `## Why it matters`,
    ``,
    `This finding is dragging down the **${finding.pillar}** pillar score (current report: ${report.overallScore.toFixed(1)}/10 overall). Leaving it unaddressed means this signal will continue to appear in every future scan.`,
    ``,
    `## How to fix it`,
    ``,
    finding.suggestion ?? 'See the reference below for remediation guidance.',
    ``,
    finding.referenceUrl ? `Reference: ${finding.referenceUrl}` : '',
    ``,
    `## How to verify the fix (red → green)`,
    ``,
    `**Before (red — confirms the problem exists):**`,
    `- [ ] \`${verifyCmd}\` returns a non-zero number`,
    ``,
    `**After (green — confirms the fix worked):**`,
    `- [ ] \`${verifyCmd}\` returns \`0\``,
    `- [ ] \`quaid-scanner . --format json | jq '.pillars.${finding.pillar}.score'\` has improved`,
    ``,
    `## Context`,
    ``,
    `- **Pillar:** ${finding.pillar} | **Severity:** ${severity} | **Category:** \`${finding.category ?? 'unknown'}\``,
    `- **Data source:** ${finding.dataSource ?? 'local'}`,
    finding.referenceUrl ? `- **Reference:** ${finding.referenceUrl}` : '',
    `- **Scan report:** scored ${report.overallScore.toFixed(1)}/10 on ${report.scannedAt.slice(0, 10)}`,
    ``,
    `---`,
    `*Identified by [quaid-scanner](https://github.com/quaid/quaid-scanner) v${report.version} on ${report.scannedAt.slice(0, 10)}.*`,
  ];

  return lines.filter((l) => l !== '').join('\n');
}
