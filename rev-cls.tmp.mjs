import puppeteer from 'puppeteer';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.argv[2];
const MODE = process.argv[3] || 'throttle';

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.wasm': 'application/wasm', '.mjs': 'text/javascript', '.xml': 'application/xml', '.ico': 'image/x-icon' };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(ROOT, p);
  try { if (fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); } catch { }
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(r => server.listen(0, r));
const port = server.address().port;

const routes = ['/word-counter/', '/json-formatter/', '/merge-pdf/', '/qr-generator/', '/', '/markdown-previewer/'];
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const out = [];

for (const r of routes) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  // block third-party
  await page.setRequestInterception(true);
  page.on('request', req => {
    const u = req.url();
    if (u.startsWith(`http://localhost:${port}`) || u.startsWith('data:') || u.startsWith('blob:')) req.continue();
    else req.abort();
  });
  if (MODE === 'throttle') {
    const cdp = await page.target().createCDPSession();
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }
  await page.evaluateOnNewDocument(() => {
    window.__cls = 0; window.__shifts = [];
    new PerformanceObserver(l => {
      for (const e of l.getEntries()) {
        if (!e.hadRecentInput) { window.__cls += e.value; window.__shifts.push({ t: Math.round(e.startTime), v: +e.value.toFixed(4) }); }
      }
    }).observe({ type: 'layout-shift', buffered: true });
    window.__blank = []; window.__frames = 0;
    const tick = () => {
      window.__frames++;
      const root = document.getElementById('root');
      const h1 = document.querySelector('#root h1');
      window.__blank.push({ t: Math.round(performance.now()), h1: !!h1, kids: root ? root.childElementCount : -1 });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e.message).slice(0, 90)));
  await page.goto(`http://localhost:${port}${r}`, { waitUntil: 'load', timeout: 60000 });
  await new Promise(res => setTimeout(res, MODE === 'throttle' ? 9000 : 4000));
  const d = await page.evaluate(() => {
    const b = window.__blank;
    // find longest run where h1 absent AFTER it was first present
    let firstH1 = b.findIndex(x => x.h1);
    let run = 0, best = 0, bestStart = 0, cur = 0, curStart = 0;
    for (let i = firstH1 >= 0 ? firstH1 : 0; i < b.length; i++) {
      if (!b[i].h1) { if (cur === 0) curStart = b[i].t; cur++; if (cur > best) { best = cur; bestStart = curStart; } }
      else cur = 0;
    }
    const endT = best ? (b.find(x => x.t >= bestStart && x.h1 === false) ? b.filter(x => !x.h1 && x.t >= bestStart).slice(-1)[0].t : 0) : 0;
    const lcp = performance.getEntriesByType('largest-contentful-paint');
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    return {
      cls: +window.__cls.toFixed(4),
      shifts: window.__shifts.slice(0, 8),
      firstH1ms: firstH1 >= 0 ? b[firstH1].t : null,
      blankFrames: best,
      blankStartMs: bestStart,
      blankEndMs: endT,
      fcp: fcp ? Math.round(fcp.startTime) : null,
      lcp: lcp.length ? Math.round(lcp[lcp.length - 1].startTime) : null,
      totalFrames: window.__frames,
    };
  });
  out.push({ route: r, ...d, errs: errs.slice(0, 3) });
  console.log(JSON.stringify(out[out.length - 1]));
  await page.close();
}
await browser.close();
server.close();
