#!/usr/bin/env python3
"""Build a static upload folder and ZIP without publishing repository tools or docs."""
import argparse
import json
import os
from pathlib import Path
import re
import shutil
import zipfile
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--origin', default=os.environ.get('SITE_URL') or os.environ.get('URL'), help='Production HTTPS origin; optional for an initial manual upload')
parser.add_argument('--output', default='dist', help='Release directory (must not already exist)')
args = parser.parse_args()
origin = None
if args.origin:
    u = urlsplit(args.origin)
    if (u.scheme != 'https' or not u.hostname or u.username or u.password or u.path not in ('', '/') or u.query or u.fragment or not re.fullmatch(r'[A-Za-z0-9.-]+', u.netloc) or '.' not in u.hostname or '..' in u.hostname or u.hostname.endswith('.') or u.hostname == 'yourdomain.com'):
        parser.error('Use a real HTTPS origin without paths, ports, credentials, query, or fragment.')
    origin = f'https://{u.hostname}/'
out = Path(args.output).resolve()
if out.exists():
    parser.error('Output already exists. Choose a new output directory to preserve existing files.')
out.mkdir(parents=True)
source = (ROOT / 'index.html').read_text()
old_origin = re.search(r'<link rel="canonical" href="(https://[^/]+/)', source).group(1)

def remove_urls(value):
    if isinstance(value, dict):
        return {k: remove_urls(v) for k, v in value.items() if not (isinstance(v, str) and v.startswith(old_origin) and k in ('@id', 'url'))}
    if isinstance(value, list):
        return [remove_urls(v) for v in value]
    return value

for src in [ROOT / 'index.html', *sorted((ROOT / 'guides').rglob('*.html'))]:
    text = src.read_text()
    text = re.sub(r'\s*<!-- DEPLOYMENT:.*?-->', '', text, flags=re.S)
    if origin:
        text = text.replace(old_origin, origin)
    else:
        text = re.sub(r'<link rel="canonical"[^>]*>\s*', '', text)
        text = re.sub(r'<meta property="og:url"[^>]*>\s*', '', text)
        # Social crawlers require absolute URLs: add these after the hostname is known.
        text = re.sub(r'<meta (?:property="og:image(?:[^"]*)?"|name="twitter:image(?:[^"]*)?")[^>]*>\s*', '', text)
        text = text.replace('name="twitter:card" content="summary_large_image"', 'name="twitter:card" content="summary"')
        text = re.sub(r'(<script type="application/ld\+json">)(.*?)(</script>)', lambda m: m[1] + json.dumps(remove_urls(json.loads(m[2])), ensure_ascii=False) + m[3], text, flags=re.S)
    target = out / src.relative_to(ROOT)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(text)
for name in ['favicon.svg', 'og-image.png', '404.html', '_headers']:
    shutil.copyfile(ROOT / name, out / name)
config = json.loads((ROOT / 'vercel.json').read_text())
config.update(buildCommand=None, outputDirectory='.', installCommand=None)
(out / 'vercel.json').write_text(json.dumps(config, indent=2) + '\n')
robots = 'User-agent: *\nAllow: /\n'
if origin:
    robots += f'\nSitemap: {origin}sitemap.xml\n'
    (out / 'sitemap.xml').write_text((ROOT / 'sitemap.xml').read_text().replace(old_origin, origin))
(out / 'robots.txt').write_text(robots)
archive = out.with_suffix('.zip')
if archive.exists():
    parser.error('Archive already exists; refusing to replace it.')
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for f in sorted(out.rglob('*')):
        if f.is_file():
            z.write(f, f.relative_to(out))
print(f'Upload folder: {out}\nZIP: {archive}')
print('Production URLs configured.' if origin else 'Initial domain-neutral release: canonical, absolute social image URLs, and sitemap await the live hostname.')
