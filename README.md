
# Playwright – Demoblaze

End-to-end automation for Demoblaze using the Page Object Model and HTML reporter.

## Requirements
- Node.js 18+
- npm

## Installation
```bash
npm i
npx playwright install
```

Run tests

All tests:

```bash
npm test
```

UI Mode (useful for debugging):

```bash
npm run test:ui
```

Report

After running tests:

```bash
npm run report
```

Generates/opens reports/index.html with screenshots, videos, and traces (on failures).

---

Demoblaze environment notes

The exercise requests login with admin/admin. If the real environment does not accept it, the test documents the finding and intentionally marks the case as failed, with a note in the report.

Demoblaze does not allow editing quantities in the cart; the total is validated by adding the same product more than once.

There is no user profile on the site; it is simulated using localStorage to verify persistence of changes.

---

## 🧪 Criteria coverage
- **Part 1**: setup, dependencies, config, and README.
- **Part 2**: login (+/−), categories, complete purchase.
- **Part 3**: checkout without product (negative), total validation with simulated quantity.
- **Part 4 (Bonus)**: HTML reporter with automatic screenshots, video, and trace on failures.

> Would you like this packaged in a ready-to-download ZIP (with folder structure) or prefer it as README + snippets in your repo?
