# ClearTax — 1099 Tax Calculator

Responsive liquid-glass landing page and 2026 US federal tax estimator, built with HTML, CSS, and vanilla JavaScript.

## Download

For the prepared static website, download [the Vercel ZIP](downloads/1099-tax-calculator-vercel.zip) and extract it. See [Vercel deployment instructions](DEPLOY-VERCEL.md).

For the complete source, choose **Code → Download ZIP** on GitHub.

## Deploy from this repository

Import this repository into Vercel. `vercel.json` builds a filtered `dist` folder. The production hostname is configured as `https://1099-tax-calculator-main.vercel.app/`. Canonical URLs, the sitemap, and social tags use that origin. Set `SITE_URL` to override it when moving to a custom domain. Updating GitHub does not publish to a CLI-only Vercel project; redeploy or connect Git in Vercel.

See [SEO and launch status](SEO-PLAN.md). The calculator is a simplified estimate, excludes several tax situations, and has not received professional tax review.

## Check the public deployment

With Node.js 20+, run `node scripts/audit-live.mjs` to produce `live-audit.json`. See [owner-assisted launch steps](review/SEARCH-LAUNCH.md) for Search Console, PageSpeed and research prerequisites, and [the professional tax review brief](review/TAX-REVIEW.md) for the review scope. These tools and briefs do not establish that external checks or professional review are complete.

## About, contact and privacy

The site includes `/about/`, `/contact/`, and `/privacy/`, linked from every page footer. DGA family is the operator and the published contact address is ganewaththagajindu2011@gmail.com. Contact uses a mailto link, not a server-side form. The release ZIP and sitemap include all six public content pages and retain the Google verification file. Redeploy the updated ZIP to publish these changes.

## Optional analytics

GA4 measurement ID `G-V4LC6K9BFB` is integrated with opt-in analytics controls. Read [GA4 setup and verification](review/ANALYTICS.md): disable Enhanced measurement in the web-stream settings, deploy, then confirm page views in Realtime. Local consent tests do not establish live GA receipt.
