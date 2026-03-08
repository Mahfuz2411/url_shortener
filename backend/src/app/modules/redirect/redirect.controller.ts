import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import redirectServices from "./redirect.service";

// JSON API — used internally / by advanced integrations
const redirectUrl = catchAsync(async (req: Request, res: Response) => {
    const { shortCode } = req.params;

    const data = await redirectServices.getRedirectData(shortCode);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "URL not found or inactive",
        });
    }

    return res.json({
        success: true,
        originalUrl: data.originalUrl,
        waitSeconds: data.waitSeconds,
    });
});

// User-facing redirect page at /r/:shortCode
const redirectHtmlPage = catchAsync(async (req: Request, res: Response) => {
    const { shortCode } = req.params;

    const data = await redirectServices.getRedirectData(shortCode);

    if (!data) {
        return res.status(404).send(`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Not Found | ShortURL</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f172a;color:#f1f5f9;display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:1rem}h1{font-size:1.5rem;font-weight:700}p{color:#94a3b8}a{color:#6366f1;text-decoration:none}a:hover{text-decoration:underline}</style>
</head><body><h1>404 — Link not found</h1><p>This short link is inactive or does not exist.</p><a href="/">← Go Home</a></body></html>`);
    }

    // Pro / admin → instant redirect
    if (data.waitSeconds === 0) {
        return res.redirect(302, data.originalUrl);
    }

    // Free user → styled countdown page
    const safeUrl = JSON.stringify(data.originalUrl); // XSS-safe injection
    const wait = data.waitSeconds;

    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Redirecting... | ShortURL</title>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4899882274132315" crossorigin="anonymous"></script>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --bg: #0f172a; --surface: #1e293b; --border: #334155;
      --primary: #6366f1; --primary2: #818cf8; --muted: #64748b; --fg: #f1f5f9;
      --radius: 0.75rem;
    }
    @media (prefers-color-scheme: light) {
      :root { --bg: #f8fafc; --surface: #ffffff; --border: #e2e8f0; --primary: #4f46e5; --primary2: #6366f1; --muted: #64748b; --fg: #0f172a; }
    }
    body { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background: var(--bg); color: var(--fg); min-height: 100vh; display: flex; flex-direction: column; }

    /* ── Top progress bar navbar ── */
    .navbar {
      position: sticky; top: 0; z-index: 100;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
    }
    .progress-track {
      width: 100%; height: 4px;
      background: var(--border);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--primary), var(--primary2));
      border-radius: 0 2px 2px 0;
      transition: width 1s linear;
      box-shadow: 0 0 8px var(--primary);
    }
    .navbar-inner {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.65rem 1.25rem;
      gap: 1rem;
    }
    .navbar-brand { font-size: 1rem; font-weight: 700; color: var(--primary); letter-spacing: -0.01em; text-decoration: none; }
    .navbar-info { display: flex; align-items: center; gap: 0.75rem; }
    .countdown-badge {
      display: flex; align-items: center; gap: 0.35rem;
      background: color-mix(in srgb, var(--primary) 15%, transparent);
      border: 1px solid color-mix(in srgb, var(--primary) 35%, transparent);
      border-radius: 9999px; padding: 0.3rem 0.75rem;
      font-size: 0.8rem; font-weight: 600; color: var(--primary2);
    }
    .skip-btn {
      display: inline-flex; align-items: center; gap: 0.35rem;
      padding: 0.4rem 0.9rem; border: 1px solid var(--border);
      border-radius: 0.45rem; background: transparent; color: var(--fg);
      font-size: 0.8rem; font-weight: 500; cursor: pointer;
      text-decoration: none; transition: background 0.15s, border-color 0.15s;
    }
    .skip-btn:hover { background: var(--border); border-color: var(--muted); }

    /* ── Main content ── */
    .main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2.5rem 1.5rem; gap: 2rem; }

    .dest-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 2rem 2.5rem;
      text-align: center; max-width: 540px; width: 100%;
    }
    .redirect-icon {
      width: 3rem; height: 3rem; border-radius: 50%;
      background: color-mix(in srgb, var(--primary) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1.25rem;
    }
    h1 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.4rem; }
    .dest-url {
      font-size: 0.78rem; color: var(--muted); word-break: break-all;
      background: var(--bg); border: 1px solid var(--border);
      border-radius: 0.4rem; padding: 0.5rem 0.75rem; margin-top: 0.75rem;
      text-align: left; font-family: monospace;
    }
    .status-text { margin-top: 1.25rem; font-size: 0.875rem; color: var(--muted); }
    .status-text strong { color: var(--fg); }

    /* ── Ad sections ── */
    .ad-leaderboard {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); display: flex; align-items: center;
      justify-content: center; width: 100%; max-width: 728px;
      min-height: 90px; color: var(--muted); font-size: 0.78rem;
    }
    .ad-rect {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); display: flex; align-items: center;
      justify-content: center; width: 100%; max-width: 728px;
      min-height: 250px; color: var(--muted); font-size: 0.78rem;
    }

    footer { padding: 1rem; text-align: center; font-size: 0.75rem; color: var(--muted); border-top: 1px solid var(--border); }
    footer a { color: var(--primary); text-decoration: none; }
    footer a:hover { text-decoration: underline; }
  </style>
</head>
<body>

  <!-- ── Sticky navbar with progress bar ── -->
  <div class="navbar">
    <div class="progress-track">
      <div class="progress-fill" id="progressFill"></div>
    </div>
    <div class="navbar-inner">
      <a class="navbar-brand" href="/">ShortURL</a>
      <div class="navbar-info">
        <span class="countdown-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span id="badgeNum">${wait}s</span>
        </span>
        <a class="skip-btn" id="skipBtn" href="#">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Skip Ad
        </a>
      </div>
    </div>
  </div>

  <!-- ── Content ── -->
  <div class="main">

    <!-- Top leaderboard ad -->
    <div class="ad-leaderboard">
      <ins class="adsbygoogle"
           style="display:block;width:100%;max-width:728px;height:90px"
           data-ad-client="ca-pub-4899882274132315"
           data-ad-slot="auto"
           data-ad-format="horizontal"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>

    <div class="dest-card">
      <div class="redirect-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" color="var(--primary2)"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </div>
      <h1>You are being redirected</h1>
      <div class="dest-url" id="destLabel"></div>
      <p class="status-text" id="statusText">Redirecting in <strong>${wait} seconds</strong>...</p>
    </div>

    <!-- Rectangle ad -->
    <div class="ad-rect">
      <ins class="adsbygoogle"
           style="display:block;width:100%;max-width:336px;height:280px"
           data-ad-client="ca-pub-4899882274132315"
           data-ad-slot="auto"
           data-ad-format="rectangle"
           data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>

  </div>

  <footer>Powered by <a href="/">ShortURL</a></footer>

  <script>
    const dest = ${safeUrl};
    const total = ${wait};

    document.getElementById('skipBtn').href = dest;
    const short = dest.length > 80 ? dest.substring(0, 80) + '...' : dest;
    document.getElementById('destLabel').textContent = short;

    let n = total;
    const fillEl = document.getElementById('progressFill');
    const badgeEl = document.getElementById('badgeNum');
    const statusEl = document.getElementById('statusText');

    // Kick off the first fill step after a tiny delay so CSS transition kicks in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fillEl.style.width = ((total - n + 1) / total * 100) + '%';
      });
    });

    const timer = setInterval(() => {
      n--;
      badgeEl.textContent = n + 's';
      fillEl.style.width = ((total - n) / total * 100) + '%';
      if (n <= 0) {
        statusEl.innerHTML = 'Redirecting now...';
        clearInterval(timer);
        window.location.href = dest;
      } else {
        statusEl.innerHTML = 'Redirecting in <strong>' + n + ' second' + (n !== 1 ? 's' : '') + '</strong>...';
      }
    }, 1000);
  </script>
</body>
</html>`);
});

const redirectControllers = {
    redirectUrl,
    redirectHtmlPage,
};

export default redirectControllers;