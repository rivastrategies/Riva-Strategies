// Export the AAG Sites source as a temporary, noindex review at /aag/.
// Usage: node scripts/export-aag.mjs /absolute/path/to/aag-source /absolute/path/to/build-directory
// Source: appgprj_6a73736553e081919f6545f6767a2522, commit c7668d3705701e2f14a7aeccd9d03f5b96523f37.
import { cp, mkdir, readFile, readdir, writeFile, symlink } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const [sourceArg, buildArg] = process.argv.slice(2);
if (!sourceArg || !buildArg) throw new Error('Provide source checkout and a new build directory');
const source = resolve(sourceArg);
const build = resolve(buildArg);
const host = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await mkdir(build); // Refuse to overwrite an existing working directory.
await cp(join(source, 'app'), join(build, 'app'), { recursive: true, filter: path => !/\/(chatgpt-auth|robots|sitemap)\.ts$/.test(path) });
await cp(join(source, 'public'), join(build, 'public'), { recursive: true });
for (const name of ['package.json', 'postcss.config.mjs', 'tsconfig.json']) await cp(join(source, name), join(build, name));
await symlink(join(source, 'node_modules'), join(build, 'node_modules'), 'dir');

async function rebase(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) { await rebase(path); continue; }
    if (!/\.tsx?$/.test(entry.name)) continue;
    let code = await readFile(path, 'utf8');
    code = code.replaceAll('https://www.absoluteautoandrvglass.com', 'https://rivastrategies.com/aag');
    code = code.replace(/((?:href|src)=")\/(?!\/)/g, '$1/aag/');
    code = code.replace(/((?:href|src)=\{`)\/(?!\/)/g, '$1/aag/');
    code = code.replace(/((?:canonical|url):\s*["`])\/(?!\/)/g, '$1/aag/');
    code = code.replace(/(images:\s*\[\s*")\/(?!\/)/g, '$1/aag/');
    code = code.replace(/("msapplication-[^"]+":\s*")\/(?!\/)/g, '$1/aag/');
    if (entry.name === 'layout.tsx') {
      code = code.replace('new URL("https://rivastrategies.com/aag")', 'new URL("https://rivastrategies.com")');
      code = code.replace('applicationName: "Absolute Auto Glass",', 'applicationName: "Absolute Auto Glass",\n  robots: { index: false, follow: false, nocache: true },');
      code = code.replace('Keep icons on the current origin while metadataBase retains the future production domain.', 'Keep review icons and mobile shortcuts inside /aag/.');
    }
    if (code.includes('generateStaticParams')) code += '\nexport const dynamicParams = false;\n';
    await writeFile(path, code);
  }
}
await rebase(join(build, 'app'));
await writeFile(join(build, 'app/not-found.tsx'), `import { Header, Footer } from './site-components';
export default function NotFound() { return <><Header /><main className="section"><div className="shell"><h1>Page not found</h1><p>Visit the Absolute Auto Glass home page to find a service.</p><a className="button button-primary" href="/aag/">Return home</a></div></main><Footer /></>; }
`);
const manifestPath = join(build, 'public/site.webmanifest');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
for (const key of ['id', 'start_url', 'scope']) manifest[key] = '/aag/';
for (const icon of manifest.icons) icon.src = '/aag' + icon.src;
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
const browserConfig = join(build, 'public/browserconfig.xml');
await writeFile(browserConfig, (await readFile(browserConfig, 'utf8')).replaceAll('src="/', 'src="/aag/'));
await writeFile(join(build, 'next.config.mjs'), `export default { output: 'export', basePath: '/aag', trailingSlash: true, images: { unoptimized: true } };\n`);
execFileSync(process.execPath, [join(source, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], {
  cwd: build, stdio: 'inherit', env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
});
await cp(join(build, 'out'), join(host, 'aag'), { recursive: true });
// GitHub Pages must serve the exported _next assets without Jekyll filtering.
await writeFile(join(host, '.nojekyll'), '');
console.log('AAG export ready in ' + join(host, 'aag'));
