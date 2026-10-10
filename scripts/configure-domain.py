#!/usr/bin/env python3
"""Set the site's production HTTPS origin in canonical/social/schema/sitemap URLs."""
import argparse
from pathlib import Path
import re
from urllib.parse import urlsplit
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('origin', help='Production origin, for example https://example.com')
parser.add_argument('--check', action='store_true', help='Preview changes without writing files')
args = parser.parse_args()
url = urlsplit(args.origin)
if (url.scheme != 'https' or not url.hostname or url.username or url.password
        or url.query or url.fragment or url.path not in ('', '/')
        or not re.fullmatch(r'[A-Za-z0-9.-]+', url.netloc)
        or '.' not in url.hostname or url.hostname.endswith('.') or '..' in url.hostname
        or url.hostname == 'yourdomain.com'):
    parser.error('Provide a real HTTPS origin only, without a path, credentials, query, port, or fragment.')
root = Path(__file__).resolve().parents[1]
source = (root / 'index.html').read_text()
current = re.search(r'<link rel="canonical" href="(https://[^/]+/)', source).group(1)
replacement = f'https://{url.hostname}/'
files = [root / 'index.html', *sorted((root / 'guides').rglob('*.html')), root / 'robots.txt', root / 'sitemap.xml']
for path in files:
    original = path.read_text()
    revised = original.replace(current, replacement)
    if revised != original:
        if not args.check:
            path.write_text(revised)
        print(('Would update ' if args.check else 'Updated ') + str(path.relative_to(root)))
print('Preview only.' if args.check else 'URLs configured. Deploy the complete site folder; then verify the live URLs.')
