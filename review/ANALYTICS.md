# GA4 setup — G-V4LC6K9BFB

The owner supplied this measurement ID in a GA4 web-stream screenshot. It is a public identifier, not an account credential. Code is installed on all six content pages. No GA dashboard changes were made by the assistant.

## Required GA setting

In Admin → Data streams → the website stream, turn Enhanced measurement OFF. The screenshot showed it ON. This integration sends its own page_view event after acceptance. Automatic form, site-search, outbound-click and other enhanced events are unnecessary for this configuration. Keep Google signals, user-provided data collection and advertising integrations disabled unless a separate reviewed implementation is introduced. The code sets Google signals and advertising personalization to false and advertising consent states to denied.

## Deployment and check

Deploy the latest static ZIP, or run scripts/update-ga4.ps1 from the existing extracted static site folder in Windows PowerShell and then npx vercel --prod. The update script downloads only six HTML pages and the two small assets; it preserves .vercel and images.

After deployment, open the public homepage in a fresh browser session. Select Accept analytics and open GA4 Reports → Realtime. Browse a guide or About page. Look for your visit/page_view; blocking extensions or network restrictions can prevent delivery. Standard reports may take longer to populate. Only visitors accepting analytics are measured, so measured users will not equal all visitors.

## Data controls

No Google tag is requested until analytics is accepted. The preference and timestamp are stored locally for up to 180 days. The Privacy choices footer button reopens the controls. Declining after acceptance clears accessible _ga cookies and reloads the page to stop loaded listeners. Financial form fields are never read by the analytics integration. Our page_view events use pathname-only locations and origin-only referrers; do not add custom dimensions or events containing financial values.

The privacy notice describes optional analytics, browser consent storage, hosting requests and email correspondence. Update the notice and implementation if tracking settings change.

## Evidence and limits

Browser tests stubbed the remote Google library and checked: zero Google loads before acceptance or after decline, one loader and page_view queue entry on acceptance, omission of query/fragment and calculator inputs, withdrawal and cookie cleanup, responsive layout and automated accessibility. These local checks do not establish that GA4 received live data. Real-time receipt requires the owner's post-deployment check.
