# oss-repo-check

OSS health scanning home for [AINative-Studio](https://github.com/AINative-Studio) repositories.

Powered by [quaid-scanner](https://github.com/quaid/quaid-scanner) — agent-first OSS repository health scanner based on [CHAOSS metrics](https://chaoss.community/), [The Open Source Way 2.0](https://www.theopensourceway.org/), and the [Inclusive Naming Initiative](https://inclusivenaming.org/).

## Scan reports

Health reports live in [`docs/reports/`](docs/reports/). Each file is named `quaid-scan-YYYY-MM-DD.md`.

| Date | Report |
|------|--------|
| 2026-06-01 | [quaid-scan-2026-06-01.md](docs/reports/quaid-scan-2026-06-01.md) |

## Run a scan

```bash
npm install
npm run scan          # markdown to stdout
npm run scan:quick    # quick depth
npm run scan:json     # JSON to stdout
```

Or use the CLI directly after installing:

```bash
npx quaid-scanner . --format markdown
```

## Batch scanning the org

The batch runner lives in the quaid-scanner upstream repo:

```bash
# From a local clone of quaid/quaid-scanner:
node scripts/quaid-scan-batch.mjs --dry-run
node scripts/quaid-scan-batch.mjs
```

See [`quaid-scanner/scripts/`](https://github.com/quaid/quaid-scanner/tree/main/scripts) for the full batch runner and cleanup utilities.

## Upstream

Scanner source: [quaid/quaid-scanner](https://github.com/quaid/quaid-scanner)  
npm: [`quaid-scanner`](https://www.npmjs.com/package/quaid-scanner)
