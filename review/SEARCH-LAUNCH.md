# Owner-assisted SEO launch checks

## 1. Confirm the deployed version

Download the latest GitHub source, open PowerShell in its root, and run:

    node scripts/audit-live.mjs

Requires Node.js 20+ (the owner already used Node 24 for Vercel). It writes live-audit.json. Share its results for diagnosis. It never requests passwords or account tokens. A passing report checks public deployment metadata and routes; it does not prove Google indexing, site rankings, or field Core Web Vitals.

If canonical/sitemap checks fail, redeploy the latest prepared ZIP to the existing Vercel project; see DEPLOY-VERCEL.md. GitHub commits alone do not redeploy a CLI-only project.

## 2. Search Console verification and submission

Open https://search.google.com/search-console/ and add a URL-prefix property for https://1099-tax-calculator-main.vercel.app/ . Select HTML tag verification. Copy ONLY the public google-site-verification meta tag to the assistant. After it is added and redeployed, select Verify in Search Console. Do not send passwords, login codes, cookies, or access tokens.

After verification, open Sitemaps and submit sitemap.xml. Use URL Inspection on the homepage and both guides. Request indexing where appropriate; submitting or requesting does not guarantee indexing. These account actions have not been performed.

## 3. Live speed evidence

Open https://pagespeed.web.dev/ and analyze the production homepage on mobile and desktop. Share the report link. Repeat for each guide if the report identifies a problem. A local audit is not a live PageSpeed result. Real-user field data may be absent until enough visits accumulate. INP cannot be inferred from a zero lab blocking-time result.

## 4. Real keyword research

Use your Keyword Planner, Ahrefs, Semrush, or Ubersuggest access with United States / English targeting. Export exact keywords, geography, date, search volume period, organic difficulty if available, and the ranking competitor URLs. Share the export through the chat's file attachment option. Keyword Planner advertising competition is not organic SEO difficulty.

Candidate searches to validate: 1099 tax calculator; free 1099 tax calculator; self employment tax calculator 2026; quarterly taxes for 1099 contractors; 1099 tax deductions. No volume or difficulty has been fabricated. Prioritize based on relevance, intent, attainable competition and useful coverage, rather than volume alone.

## 5. Professional review, links and follow-up

Send review/TAX-REVIEW.md to a qualified US tax professional of your choice. No review has been booked or completed by the assistant.

Do not begin mass backlink outreach. Identify relevant freelancer/accounting resources, verify their editorial fit, and offer a useful accurate resource where appropriate. No outreach or placement has occurred.

Each month after launch, export Search Console queries/pages with impressions, clicks, CTR and position. Compare matched periods and seasonality; look for indexing issues before rewriting content. Supply that data in a later session for analysis. No background monitoring or recurring task is running.
