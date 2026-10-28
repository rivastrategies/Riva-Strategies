#!/usr/bin/env python3
"""Export the approved static Goodman website to the Riva /goodman beta."""
import argparse
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
BASE_PATH = '/goodman'
BETA_ORIGIN = 'https://rivastrategies.com/goodman'
SOURCE_ORIGIN = 'https://goodman-environmental.jordanvsmith.chatgpt.site'


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
                if '<meta name="robots" content="noindex,nofollow">' not in text:
                    raise SystemExit(f'Missing beta noindex directive in {relative}.')
            target.write_text(text)
        else:
            shutil.copyfile(file, target)
        count += 1
    print(f'Exported {count} website files to {destination}.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True, type=Path, help='Approved static dist directory')
    export(parser.parse_args().source)
