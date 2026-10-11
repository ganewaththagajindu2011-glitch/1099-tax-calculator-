# Update the existing Vercel deployment

Production hostname shown in the owner's Vercel dashboard:
https://1099-tax-calculator-main.vercel.app/

The dashboard showed Ready. Independent live requests from this workspace are blocked by the environment proxy (403), so live behavior and the version currently served have not been verified here.

## Deploy this update from Windows

1. Download `downloads/1099-tax-calculator-vercel.zip` from this repository.
2. Extract its contents into the folder you previously deployed, replacing the website files. Keep the existing hidden `.vercel` folder: it links that directory to your current Vercel project.
3. Open PowerShell in that folder and run `npx vercel --prod`.
4. If asked to link a project, choose the existing `1099-tax-calculator-main` project. Do not create another project.

This ZIP is a ready-to-serve static release and does not require an application build. It contains the configured canonical/social URLs, sitemap.xml, robots.txt, guides, image, favicon, and 404 page.

## Optional automatic deployments

Use Connect Git in the existing Vercel project and connect this GitHub repository's main branch. Git-based source builds use `vercel.json` to produce a filtered dist folder. The build now uses the production origin saved in index.html by default. SITE_URL can override it when a custom domain is added. A GitHub push does not update a CLI-only deployment until Git is connected or you redeploy manually.

## Verify after deployment

Open these URLs in a browser:

- https://1099-tax-calculator-main.vercel.app/
- https://1099-tax-calculator-main.vercel.app/guides/quarterly-taxes/
- https://1099-tax-calculator-main.vercel.app/guides/1099-tax-deductions/
- https://1099-tax-calculator-main.vercel.app/sitemap.xml
- https://1099-tax-calculator-main.vercel.app/robots.txt
- https://1099-tax-calculator-main.vercel.app/og-image.png

Check that an unknown path returns 404, calculator inputs update the totals, and mobile layout works. View page source to confirm the canonical origin matches the production hostname.

## Search Console

Add the HTTPS homepage as a URL-prefix property in Google Search Console. Verify ownership using a method offered for your account. If choosing an HTML tag, provide the public verification meta tag so it can be added to the site and redeployed. Never share account passwords or tokens. Then submit sitemap.xml. No Search Console verification or submission has been performed here.

## Remaining verification

Run PageSpeed Insights against the live domain. Local Lighthouse scores are not production field measurements or a ranking guarantee. IRS/SSA requests were blocked by the environment proxy, and no tax professional has reviewed or signed off on the calculator.
