#!/usr/bin/env python3
"""Install or verify the shared GTM container in every static HTML entry point."""

import argparse
import re
from pathlib import Path

from gtm import BODY_SNIPPET, CONTAINER_ID, HEAD_SNIPPET, inject_gtm


ROOT = Path(__file__).resolve().parents[1]


def html_files():
    return sorted(path for path in ROOT.rglob("*.html") if ".git" not in path.parts)


def validate(document: str):
    errors = []
    if document.count(CONTAINER_ID) != 2:
        errors.append(f"expected two {CONTAINER_ID} references")
    if document.count(HEAD_SNIPPET) != 1:
        errors.append("head snippet is missing or duplicated")
    if document.count(BODY_SNIPPET) != 1:
        errors.append("noscript snippet is missing or duplicated")
    if not re.search(
        r"<head(?:\s[^>]*)?>\s*" + re.escape(HEAD_SNIPPET),
        document,
        flags=re.IGNORECASE,
    ):
        errors.append("head snippet is not first inside head")
    if not re.search(
        r"<body(?:\s[^>]*)?>\s*" + re.escape(BODY_SNIPPET),
        document,
        flags=re.IGNORECASE,
    ):
        errors.append("noscript snippet is not first inside body")
    return errors


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify without writing")
    args = parser.parse_args()

    changed = 0
    failures = []
    paths = html_files()

    for path in paths:
        document = path.read_text(encoding="utf-8")
        if args.check:
            errors = validate(document)
            if errors:
                failures.append(f"{path.relative_to(ROOT)}: {', '.join(errors)}")
            continue

        updated = inject_gtm(document)
        if updated != document:
            path.write_text(updated, encoding="utf-8")
            changed += 1

    if failures:
        raise SystemExit("\n".join(failures))

    action = "Verified" if args.check else "Updated"
    count = len(paths) if args.check else changed
    print(f"{action} {count} of {len(paths)} HTML files for {CONTAINER_ID}.")


if __name__ == "__main__":
    main()
