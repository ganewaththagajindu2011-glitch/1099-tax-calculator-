# ClearTax SEO implementation and launch plan

## Current status

The owner’s Vercel dashboard shows a Ready production deployment at https://1099-tax-calculator-main.vercel.app/. This update configures that hostname in the source and release ZIP; redeployment is still required. The environment proxy blocks independent live verification. Local checks cannot establish indexing, HTTPS, Search Console verification, rankings, backlinks, or real-user Core Web Vitals. No ranking position is promised.

Implemented: one H1 per page, metadata, semantic content, accessible navigation, calculator, matching FAQ/WebApplication schema, two linked guides, robots.txt, sitemap.xml, and a social preview image. The calculator remains a dependency-free HTML/CSS/JS page. Deploy the entire folder so guides and the image are included.

## Keyword map: hypotheses to validate

These are intent-based targets, not measured high-volume or low-competition findings. No Ahrefs, Semrush, Keyword Planner, or Ubersuggest data was available. Do not label them low competition until research confirms it.

| Page | Primary target | Related searches | Intent |
| --- | --- | --- | --- |
| / | 1099 tax calculator | free 1099 tax calculator; self employment tax calculator 2026; freelance tax calculator | Use a tax estimation tool |
| /guides/quarterly-taxes/ | quarterly taxes for 1099 contractors | 1099 quarterly tax payment dates 2026; how much to save for quarterly taxes | Understand payments and deadlines |
| /guides/1099-tax-deductions/ | 1099 tax deductions | freelance business expense deductions; what can 1099 contractors deduct | Understand eligible costs |

Validate using US/English targeting: export keyword ideas and compare search volume, seasonal demand, organic competitors, intent, and difficulty where available. Google Keyword Planner's competition field measures advertiser competition, not organic ranking difficulty. Do not target unrelated Sri Lankan local-business terms for this US tax tool.

## Before publication

1. Choose a domain (a stable Vercel/Netlify hostname also works initially).
2. Preview URL updates: `python3 scripts/configure-domain.py https://YOUR-ACTUAL-DOMAIN --check`.
3. Apply them: `python3 scripts/configure-domain.py https://YOUR-ACTUAL-DOMAIN`.
4. Deploy the site with no build command. Serve the repository root as the published directory. Do not publish while canonical URLs still use yourdomain.com.
5. Verify HTTPS and that /, both guide directories, /robots.txt, /sitemap.xml, and /og-image.png return successfully. Pick one canonical hostname and configure other hostnames to redirect directly to it using the hosting platform.
6. Run PageSpeed Insights on the live homepage and guides, on mobile and desktop. Lab Lighthouse scores are diagnostic, not a guarantee of real-user performance. Core Web Vitals targets at the 75th percentile: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1. Field data may be unavailable until sufficient traffic is collected.
7. Validate structured data. FAQ schema matches visible content, but Google restricts FAQ rich results primarily to authoritative government and health sites. Do not add fake ratings, reviews, authors, or business identities.

## Search Console and monitoring

Once live, the site owner should create a Search Console property, verify ownership using the provided DNS record or HTML verification method, submit /sitemap.xml, and inspect the homepage and guide URLs. These actions have not been performed; they require the live property and owner access. Sitemap submission does not guarantee indexing.

Review monthly: impressions, clicks, CTR, query/page positions, indexing exclusions, referring domains, broken links, and live performance. Compare meaningful periods and account for tax-season changes. Improve low-CTR titles only where the page matches query intent. Do not repeatedly change dates to suggest nonexistent content updates.

GA4 is optional and is not installed. It requires an actual measurement ID and an appropriate privacy/consent implementation. Never send income, expenses, filing status, tax results, or form field values to analytics. Use only necessary aggregate page/CTA events if analytics is later added, and revise the current privacy copy if tracking changes it.

## Content and authority

Have a qualified US tax professional review calculations and tax content before representing it as professionally reviewed. Add a real reviewer identity and review date only after that review happens. Verify current IRS/SSA sources whenever rates or rules change. Current limitations include state/local taxes, other income, tax credits, QBI, and Additional Medicare Tax.

Next useful topics, after research: handling both W-2 and 1099 income; QBI limitations; uneven freelance income and annualized payments. Publish substantive explanations with relevant calculator links, not near-duplicate keyword pages. English fits the current US audience; add other languages only when properly translated and maintained.

Earn links by providing a useful calculator, accurate methodology, and original explainers. Potential audiences: freelancer communities, professional associations, and relevant accounting resources. Outreach, directory submissions, and partnerships have not been performed. Avoid purchased ranking links, mass submissions, fake reviews, and unsolicited automated messages.

A Google Business Profile is not automatically appropriate for an online-only calculator. Only create one if a real eligible business meets Google's in-person customer-contact requirements. Do not invent an address, opening hours, or NAP details.

## Local validation evidence

A mobile-emulated Lighthouse run against the local server returned performance: 100/100, accessibility: 100/100, best-practices: 100/100, seo: 100/100. largest-contentful-paint: 1.1 s, total-blocking-time: 10 ms, cumulative-layout-shift: 0. These are single-run lab observations, not field Core Web Vitals, production performance, or ranking predictions. INP needs interaction/field measurement.

All three pages passed local internal-link/anchor checks and automated WCAG A/AA checks. Calculator regression tests, responsive widths 320/375/768/1440, sitemap XML parsing, and domain configuration repeatability passed. External IRS/SSA link reachability was not verified: the environment previously returned proxy access denials for those destinations. Verify those source links and current guidance before publication.

## Production URL update

Canonical/schema/social URLs and the sitemap now use https://1099-tax-calculator-main.vercel.app/. Build scripts reuse the configured origin unless an explicit origin or hosting environment override is supplied. Search Console ownership verification, sitemap submission, live checks, and qualified tax review remain outstanding.
