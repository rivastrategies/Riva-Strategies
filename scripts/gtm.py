"""Shared Google Tag Manager markup for the static Riva website."""

import re


CONTAINER_ID = "GTM-N6K5CFV7"

HEAD_SNIPPET = f"""<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{'gtm.start':
new Date().getTime(),event:'gtm.js'}});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
}})(window,document,'script','dataLayer','{CONTAINER_ID}');</script>
<!-- End Google Tag Manager -->"""

BODY_SNIPPET = f"""<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id={CONTAINER_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->"""


def inject_gtm(document: str) -> str:
    """Insert GTM once, first in head and first in body."""
    if CONTAINER_ID in document:
        return document

    document, head_count = re.subn(
        r"(<head(?:\s[^>]*)?>)",
        rf"\1\n{HEAD_SNIPPET}",
        document,
        count=1,
        flags=re.IGNORECASE,
    )
    document, body_count = re.subn(
        r"(<body(?:\s[^>]*)?>)",
        rf"\1\n{BODY_SNIPPET}",
        document,
        count=1,
        flags=re.IGNORECASE,
    )

    if head_count != 1 or body_count != 1:
        raise ValueError("HTML document must contain one opening head and body tag")

    return document
