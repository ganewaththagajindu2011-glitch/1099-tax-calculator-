#!/usr/bin/env node
// Node.js 20+; read-only audit of the public deployment, with no credentials.
import { writeFile } from 'node:fs/promises';
const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log('node scripts/audit-live.mjs [--url https://your-site/] [--output live-audit.json]\nChecks public routes, canonical/schema/social metadata, robots/sitemap and HTTP 404 behavior. Does not measure Core Web Vitals or prove Google indexing.');
  process.exit(0);
}
function option(name, fallback) { const i = args.indexOf(name); if (i < 0) return fallback; if (!args[i+1] || args[i+1].startsWith('--')) throw new Error('Missing value for '+name); return args[i+1]; }
const canonicalOrigin = 'https://1099-tax-calculator-main.vercel.app';
const base = new URL(option('--url', canonicalOrigin));
if (base.username || base.password || base.search || base.hash || base.pathname !== '/' || (base.protocol !== 'https:' && !['localhost','127.0.0.1'].includes(base.hostname))) throw new Error('Use an HTTPS origin (HTTP allowed for localhost tests only).');
const expectedOrigin = base.protocol === 'https:' ? base.origin : canonicalOrigin;
const checks=[];
function check(name,passed,detail='') { checks.push({name,passed,detail}); console.log(`${passed?'PASS':'FAIL'} ${name}${detail?' — '+detail:''}`); }
async function get(path) {
  try { const r=await fetch(new URL(path,base),{redirect:'follow',signal:AbortSignal.timeout(20000)}); return {status:r.status,url:r.url,type:r.headers.get('content-type')||'',text:await r.text()}; }
  catch(e){check('Request '+path,false,e.message);return null;}
}
function attr(tag,name){return tag.match(new RegExp('\\b'+name+'\\s*=\\s*["\']([^"\']*)["\']','i'))?.[1];}
function meta(html,name){return (html.match(/<meta\b[^>]*>/gi)||[]).find(t=>attr(t,'name')===name||attr(t,'property')===name);}
const pages=['/','/guides/quarterly-taxes/','/guides/1099-tax-deductions/','/about/','/contact/','/privacy/'];
for(const path of pages){
 const r=await get(path);if(!r)continue;
 check(path+' responds with HTML',r.status===200 && r.type.includes('text/html'),`HTTP ${r.status}`);
 if(r.status!==200)continue;
 const canonical=(r.text.match(/<link\b[^>]*>/gi)||[]).find(t=>attr(t,'rel')==='canonical');
 check(path+' canonical',attr(canonical||'','href')===expectedOrigin+path,attr(canonical||'','href')||'missing');
 const title=r.text.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'';
 check(path+' title present',title.length>0,title);
 check(path+' one H1',(r.text.match(/<h1(?:\s|>)/gi)||[]).length===1);
 check(path+' indexable directive',!/(?:noindex|none)/i.test(attr(meta(r.text,'robots')||'','content')||''));
 check(path+' description present',!!attr(meta(r.text,'description')||'','content'));
 check(path+' social image',attr(meta(r.text,'og:image')||'','content')===expectedOrigin+'/og-image.png');
 check(path+' no placeholder domain',!r.text.includes('https://yourdomain.com/'));
 const blocks=[...r.text.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
 let valid=blocks.length>0;for(const b of blocks){try{JSON.parse(b[1]);}catch{valid=false;}}
 check(path+' JSON-LD parses',valid);
}
const robots=await get('/robots.txt');if(robots)check('Robots allows crawling and advertises sitemap',robots.status===200&&!/^Disallow:\s*\/\s*$/im.test(robots.text)&&robots.text.includes(expectedOrigin+'/sitemap.xml'));
const sitemap=await get('/sitemap.xml');if(sitemap)check('Sitemap lists all production pages',sitemap.status===200&&pages.every(p=>sitemap.text.includes('<loc>'+expectedOrigin+p+'</loc>')));
for(const [path,type] of [['/og-image.png','image/png'],['/favicon.svg','image/svg+xml']]){const r=await get(path);if(r)check(path+' serves correct asset',r.status===200&&r.type.includes(type),`HTTP ${r.status}; ${r.type}`);}
const verification=await get('/google3d1996e991c23a96.html');if(verification)check('Google ownership file served',verification.status===200 && verification.text.trim()==='google-site-verification: google3d1996e991c23a96.html',`HTTP ${verification.status}`);
const missing=await get('/cleartax-audit-nonexistent-page/');if(missing)check('Unknown URL returns HTTP 404',missing.status===404,`HTTP ${missing.status}`);
const report={checkedAt:new Date().toISOString(),base:base.origin,passed:checks.filter(c=>c.passed).length,failed:checks.filter(c=>!c.passed).length,limitations:['Not a Core Web Vitals or ranking test.','Does not verify Search Console ownership, Google indexing, tax accuracy, or JavaScript interaction.'],checks};
await writeFile(option('--output','live-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(`\n${report.passed} passed; ${report.failed} failed. Report written.`);process.exitCode=report.failed?1:0;
