import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const releasePages = [
  'index.html',
  'riva-service-partners/index.html',
  'rivahospitality/index.html',
  'riva-reps/index.html',
  'privacy-policy/index.html',
];
const errors = [];

function fail(file, message) {
  errors.push(`${file}: ${message}`);
}

function resolvePublic(url) {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean || !clean.startsWith('/')) return null;
  const relative = clean.replace(/^\//, '');
  return path.join(root, relative, clean.endsWith('/') ? 'index.html' : '');
}

for (const file of releasePages) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) fail(file, `expected one h1, found ${h1Count}`);
  if (!/<meta name="description" content="[^"]{70,}/i.test(html)) fail(file, 'missing a useful meta description');
  if (!/<link rel="canonical" href="https:\/\/rivastrategies\.com\//i.test(html)) fail(file, 'canonical is missing or inconsistent');
  if (/—/.test(html)) fail(file, 'contains an em dash');
  if (/jordan@rivastrategies\.com/i.test(html)) fail(file, 'contains the retired personal email');
  if (/\$100M\+|42% Avg|250\+ Systems/i.test(html)) fail(file, 'contains an unverified legacy metric');

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch (error) { fail(file, `invalid JSON-LD: ${error.message}`); }
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
    const url = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#)/i.test(url)) continue;
    const target = resolvePublic(url);
    if (target && !fs.existsSync(target)) fail(file, `missing internal target ${url}`);
  }
}

const og = path.join(root, 'assets/v2/og-riva-strategies.jpg');
if (!fs.existsSync(og)) fail('index.html', 'missing social image');
if (fs.existsSync(og) && fs.statSync(og).size > 1_000_000) fail('index.html', 'social image exceeds 1 MB');

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const required of ['/riva-service-partners/', '/rivahospitality/', '/riva-reps/', '/privacy-policy/']) {
  if (!sitemap.includes(`https://rivastrategies.com${required}`)) fail('sitemap.xml', `missing ${required}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Release validation passed for ${releasePages.length} indexed pages.`);
