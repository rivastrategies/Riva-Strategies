#!/usr/bin/env python3
"""Export the approved static Goodman website to the Riva /goodman beta."""
import argparse
import json
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
BASE_PATH = '/goodman'
BETA_ORIGIN = 'https://rivastrategies.com/goodman'
SOURCE_ORIGIN = 'https://goodman-environmental.jordanvsmith.chatgpt.site'
ICON_VERSION = '20261028-1'


def favicon_links() -> str:
    links = [f'<link rel="icon" href="{BASE_PATH}/favicon.ico?v={ICON_VERSION}" sizes="16x16 32x32 48x48">']
    for size in (16, 32, 48, 96):
        links.append(f'<link rel="icon" type="image/png" sizes="{size}x{size}" href="{BASE_PATH}/assets/favicon-{size}x{size}.png?v={ICON_VERSION}">')
    links.append(f'<link rel="icon" type="image/svg+xml" sizes="any" href="{BASE_PATH}/assets/favicon.svg?v={ICON_VERSION}">')
    for size in (120, 152, 167, 180):
        path = 'apple-touch-icon.png' if size == 180 else f'assets/apple-touch-icon-{size}x{size}.png'
        links.append(f'<link rel="apple-touch-icon" sizes="{size}x{size}" href="{BASE_PATH}/{path}?v={ICON_VERSION}">')
    links.extend([
        f'<link rel="manifest" href="{BASE_PATH}/site.webmanifest?v={ICON_VERSION}">',
        '<meta name="application-name" content="Goodman Environmental">',
        '<meta name="apple-mobile-web-app-title" content="Goodman">',
    ])
    return ''.join(links)


def export(source: Path) -> None:
    source = source.resolve()
    destination = ROOT / 'goodman'
    if not (source / 'index.html').is_file():
        raise SystemExit('Source must be the complete static Goodman output directory.')
    if source == destination.resolve():
        raise SystemExit('Source and destination must differ.')
    if 'Goodman Environmental' not in (source / 'index.html').read_text():
        raise SystemExit('Source does not contain the expected Goodman website.')

    count = 0
    for file in sorted(source.rglob('*')):
        if not file.is_file():
            continue
        relative = file.relative_to(source)
        # The domain-root robots.txt controls crawling; the beta uses page-level noindex.
        if relative == Path('robots.txt'):
            continue
        target = destination / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        if file.suffix in {'.html', '.xml', '.css', '.js', '.svg'}:
            text = file.read_text().replace(SOURCE_ORIGIN, BETA_ORIGIN)
            if file.suffix == '.html':
                text = re.sub(
                    r'((?:href|src|action)=([\"\']))/(?!/)',
                    lambda match: match.group(1) + BASE_PATH + '/',
                    text,
                )
                text = text.replace(
                    'Private review access may require the hosting provider’s sign-in.',
                    'This beta is hosted by GitHub Pages.',
                )
                original_icon = f'<link rel="icon" href="{BASE_PATH}/assets/favicon.svg" type="image/svg+xml">'
                if original_icon not in text:
                    raise SystemExit(f'Expected source favicon declaration missing in {relative}.')
                text = text.replace(original_icon, favicon_links())
                if '<meta name="robots" content="noindex,nofollow">' not in text:
                    raise SystemExit(f'Missing beta noindex directive in {relative}.')
            target.write_text(text)
        else:
            shutil.copyfile(file, target)
        count += 1
    manifest = {
        'id': './', 'name': 'Goodman Environmental', 'short_name': 'Goodman',
        'description': 'Industrial CEMS, analyzer, and controls service.',
        'start_url': './', 'scope': './', 'display': 'browser',
        'background_color': '#073aa1', 'theme_color': '#073aa1',
        'icons': [
            {'src': f'./assets/{name}?v={ICON_VERSION}', 'sizes': f'{size}x{size}',
             'type': 'image/png', 'purpose': purpose}
            for name, size, purpose in [
                ('android-chrome-192x192.png', 192, 'any'),
                ('android-chrome-512x512.png', 512, 'any'),
                ('maskable-icon-512x512.png', 512, 'maskable'),
            ]
        ],
    }
    (destination / 'site.webmanifest').write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'Exported {count} website files to {destination}.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True, type=Path, help='Approved static dist directory')
    export(parser.parse_args().source)
