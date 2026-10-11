/* GA4 loads only after an explicit analytics choice. No calculator values are read. */
(() => {
  'use strict';
  const id = 'G-V4LC6K9BFB';
  const key = 'cleartax-analytics-consent-v1';
  const maxAge = 180 * 24 * 60 * 60 * 1000;
  let loaded = false;
  let consent = null;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && ['accepted', 'declined'].includes(saved.value) && Number.isFinite(saved.at) && Date.now() >= saved.at && Date.now() - saved.at < maxAge) consent = saved.value;
  } catch { /* Storage may be unavailable; the choice still works for this page. */ }
  window['ga-disable-' + id] = consent !== 'accepted';
  const panel = document.createElement('section');
  panel.className = 'analytics-choice';
  panel.setAttribute('aria-labelledby', 'analytics-title');
  panel.hidden = consent !== null;
  panel.innerHTML = '<div><h2 id="analytics-title">Help us improve ClearTax?</h2><p>With your permission, Google Analytics measures page visits. Your calculator amounts are not included in our analytics events. <a href="/privacy/">Privacy notice</a></p></div><div class="analytics-actions"><button type="button" data-consent="accepted">Accept analytics</button><button type="button" data-consent="declined">Decline analytics</button><button type="button" data-close hidden>Close</button></div>';
  document.body.append(panel);
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'analytics-settings';
  settings.textContent = 'Privacy choices';
  settings.setAttribute('aria-controls', 'analytics-title');
  (document.querySelector('footer') || document.body).append(settings);
  function load() {
    if (loaded) return;
    loaded = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('consent', 'default', {analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
    gtag('js', new Date());
    let referrer = '';
    try { referrer = document.referrer ? new URL(document.referrer).origin + '/' : ''; } catch { /* Omit invalid referrers. */ }
    const safeLocation = location.origin + location.pathname;
    gtag('config', id, {send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: safeLocation, page_referrer: referrer});
    gtag('event', 'page_view', {send_to: id, page_title: document.title, page_location: safeLocation, page_referrer: referrer});
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(script);
  }
  function clearAnalyticsCookies() {
    // Remove GA cookies available on this host and its parent-domain scopes.
    const parts = location.hostname.split('.');
    const domains = ['', ...parts.map((_, i) => parts.slice(i).join('.'))];
    for (const item of document.cookie.split(';')) {
      const name = item.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of domains) document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
    }
  }
  panel.addEventListener('click', event => {
    const button = event.target.closest('button[data-consent]');
    if (!button) return;
    consent = button.dataset.consent;
    try { localStorage.setItem(key, JSON.stringify({value:consent, at:Date.now()})); } catch { /* Keep the in-memory choice. */ }
    panel.hidden = true;
    settings.focus({preventScroll:true});
    if (consent === 'accepted') load();
    else {
      window['ga-disable-' + id] = true;
      clearAnalyticsCookies();
      if (loaded) location.reload(); // Stop the loaded library and its listeners after withdrawal.
    }
  });
  settings.addEventListener('click', () => {
    panel.hidden = false;
    panel.querySelector('[data-close]').hidden = false;
    panel.querySelector('button').focus({preventScroll:true});
  });
  panel.querySelector('[data-close]').addEventListener('click', () => {panel.hidden = true;settings.focus({preventScroll:true});});
  document.addEventListener('keydown', event => {if (event.key === 'Escape' && !panel.hidden && consent !== null) {panel.hidden = true;settings.focus({preventScroll:true});}});
  if (consent === 'accepted') load();
})();
