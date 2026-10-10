# Deploy ClearTax to Vercel

The site has not been deployed. No Vercel account authorization is present in this workspace.

## Upload the prepared static release using Vercel CLI

1. Download `1099-tax-calculator-vercel.zip` and extract it on your computer.
2. Open a terminal in the extracted folder containing `index.html` and `vercel.json`.
3. With Node.js installed, run `npx vercel login` and complete Vercel's sign-in flow yourself. Never send login credentials or tokens in chat.
4. Run `npx vercel --prod`. Choose your account and a project name. The package includes static-site configuration; no application build is required for this extracted release.
5. Share the resulting stable public project URL. A paid custom domain is not required; a Vercel hostname works.

The initial ZIP has no placeholder canonical or social URLs. It intentionally omits sitemap.xml and absolute social-image metadata until your public hostname is known. The calculator and all guides work without those tags.

## Finalize the known hostname

Build a final release from the source repository:

    python3 scripts/build-release.py --origin https://YOUR-PRODUCTION-HOST --output /tmp/cleartax-final

Deploy `/tmp/cleartax-final` to the SAME Vercel project with `npx vercel --prod`. Select/link the existing project to retain the hostname. This release adds canonical URLs, absolute social-image URLs, and a three-page sitemap using the supplied production origin.

## Optional Git-based deployment

If you later push this repository to GitHub, import it into Vercel. The root `vercel.json` builds a filtered `dist` folder so repository documentation and scripts are not served. Set a non-secret production `SITE_URL` environment variable to your stable HTTPS origin, then redeploy. Local production-build validation does not establish that the hosted build has passed.

## Live verification after publication

Check the homepage, both guide routes, a nonexistent route (must return 404), favicon, social image, robots.txt, and sitemap.xml. Check HTTPS redirects, canonical URLs, mobile interactions, tax calculations, and live PageSpeed Insights. Then verify a Google Search Console property and submit the sitemap. Search Console requires owner verification; no submission has been performed.

Tax verification remains separate: official IRS/SSA requests were blocked by the current environment proxy, and no qualified tax professional has reviewed or signed off on the site. Do not describe the calculator as professionally reviewed or comprehensive tax advice.
