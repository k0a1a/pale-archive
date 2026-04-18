// content.js — injected into all pages

(function () {
  "use strict";

  // ── Panel ──────────────────────────────────────────────────────────────────
  let panel   = null;
  let runBtn  = null;
  let stopBtn = null;

  function createPanel() {
    if (document.getElementById("__demo_panel__")) return;

    panel = document.createElement("div");
    panel.id = "__demo_panel__";
    panel.style.display = "none";
    panel.innerHTML = `
      <div id="__demo_titlebar__">
        <span>The Pale Archives</span>
        <div id="__demo_close_btn__">&#x2715;</div>
      </div>
      <div id="__demo_footer__">
        <button id="__demo_run_btn__">Run</button>
        <button id="__demo_stop_btn__">Stop</button>
      </div>
    `;

    document.documentElement.appendChild(panel);

    runBtn  = panel.querySelector("#__demo_run_btn__");
    stopBtn = panel.querySelector("#__demo_stop_btn__");

    // ── Drag ────────────────────────────────────────────────────────────────
    const titlebar = panel.querySelector("#__demo_titlebar__");
    let dragging = false, offX = 0, offY = 0;

    titlebar.addEventListener("mousedown", (e) => {
      dragging = true;
      const rect = panel.getBoundingClientRect();
      offX = e.clientX - rect.left;
      offY = e.clientY - rect.top;
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      panel.style.left   = (e.clientX - offX) + "px";
      panel.style.top    = (e.clientY - offY) + "px";
      panel.style.right  = "auto";
      panel.style.bottom = "auto";
    });

    document.addEventListener("mouseup", () => { dragging = false; });

    // ── Close ────────────────────────────────────────────────────────────────
    panel.querySelector("#__demo_close_btn__").addEventListener("click", () => {
      panel.style.display = "none";
    });

    // ── Buttons ──────────────────────────────────────────────────────────────
    runBtn.addEventListener("click", () => {
      chrome.runtime.sendMessage({ type: "SAVE_PRE_RUN_URL", url: location.href });
      chrome.runtime.sendMessage({ type: "SET_DEMO", on: true });
      demoStart();
      setButtonState(true);
      goNextSite();
    });

    stopBtn.addEventListener("click", () => {
      chrome.runtime.sendMessage({ type: "SET_DEMO", on: false });
      demoStop();
      setButtonState(false);
      chrome.runtime.sendMessage({ type: "GET_PRE_RUN_URL" }, (res) => {
        if (res && res.url) location.href = res.url;
      });
    });
  }

  function setButtonState(demoOn) {
    if (!runBtn || !stopBtn) return;
    runBtn.disabled  = demoOn;
    stopBtn.disabled = !demoOn;
  }

  function showPanel() {
    if (!panel) createPanel();
    panel.style.display = "flex";
    chrome.runtime.sendMessage({ type: "GET_DEMO" }, (res) => {
      setButtonState(!!(res && res.on));
    });
  }

  function togglePanel() {
    if (!panel) createPanel();
    if (panel.style.display === "none") {
      showPanel();
    } else {
      panel.style.display = "none";
    }
  }

  // ── Demo ──────────────────────────────────────────────────────────────────
  let demoRunning = false;
  let demoTimers  = [];

  function demoStop() {
    demoRunning = false;
    demoTimers.forEach(clearTimeout);
    demoTimers = [];
    const ticker = document.getElementById("__demo_ticker__");
    if (ticker) ticker.classList.remove("active");
  }

  function demoStart() {
    if (demoRunning) return;
    demoRunning = true;
    const ticker = document.getElementById("__demo_ticker__");
    if (ticker) ticker.classList.add("active");
    runDemoPage();
  }

  function demoT(fn, ms) {
    const t = setTimeout(fn, ms);
    demoTimers.push(t);
  }

  // ── Scrolling ──────────────────────────────────────────────────────────────
  function getScrollTargets() {
    const targets = [];
    document.querySelectorAll("*").forEach(el => {
      if (panel && panel.contains(el)) return;
      const st = getComputedStyle(el);
      const ox = st.overflowX;
      const oy = st.overflowY;
      const canScrollY = (oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 2;
      const canScrollX = (ox === "auto" || ox === "scroll") && el.scrollWidth  > el.clientWidth  + 2;
      if (canScrollY || canScrollX) targets.push({ el, canScrollX, canScrollY });
    });
    targets.push({ el: null, canScrollX: true, canScrollY: true }); // window fallback
    return targets;
  }

  function scrollTarget(target, stepFraction) {
    if (target.el === null) {
      const maxX = Math.max(0, document.documentElement.scrollWidth  - window.innerWidth);
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      try {
        window.scrollTo({ left: Math.round(maxX * stepFraction), top: Math.round(maxY * stepFraction), behavior: "smooth" });
      } catch {
        window.scrollTo(Math.round(maxX * stepFraction), Math.round(maxY * stepFraction));
      }
    } else {
      if (target.canScrollY) target.el.scrollTop  = Math.round((target.el.scrollHeight - target.el.clientHeight) * stepFraction);
      if (target.canScrollX) target.el.scrollLeft = Math.round((target.el.scrollWidth  - target.el.clientWidth)  * stepFraction);
    }
  }

  function performScrolls(dwellMs) {
    const targets = getScrollTargets();
    if (targets.length === 0) return;
    const steps = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < steps; i++) {
      const delay  = dwellMs * 0.05 + (dwellMs * 0.65 * i / steps);
      const frac   = Math.random();
      const target = targets[Math.floor(Math.random() * targets.length)];
      demoT(() => {
        if (!demoRunning) return;
        scrollTarget(target, frac);
      }, delay);
    }
  }

  // ── Demo page loop ─────────────────────────────────────────────────────────
  function goNextSite() {
    chrome.runtime.sendMessage({ type: "GET_URLS" }, (res) => {
      const urls = res && res.urls;
      if (!urls || urls.length === 0) return;
      const url = urls[Math.floor(Math.random() * urls.length)];
      chrome.runtime.sendMessage({ type: "NAVIGATE", url });
    });
  }

  function runDemoPage() {
    if (!demoRunning) return;
    const dwellMs = 7500 + Math.random() * 7500; // 7.5–15 s per page

    performScrolls(dwellMs);

    // At ~60% dwell: maybe click an internal link, otherwise navigate to next site
    demoT(() => {
      if (!demoRunning) return;
      if (Math.random() < 0.5) {
        const link = pickInternalLink(location.origin);
        if (link) {
          link.click(); // new page's content.js auto-resumes via GET_DEMO
          return;
        }
      }
      goNextSite();
    }, dwellMs * 0.6);
  }

  // ── Internal link picker ───────────────────────────────────────────────────
  const DOWNLOAD_EXTS = /\.(zip|gz|tar|rar|7z|pdf|doc|docx|xls|xlsx|ppt|pptx|odt|ods|odp|mp3|mp4|mov|avi|mkv|flac|wav|ogg|webm|iso|dmg|exe|msi|apk|deb|rpm|bin|img|torrent|csv|json|xml|svg|png|jpg|jpeg|gif|webp|bmp|tiff|ico)([?&#]|$)/i;

  function looksLikeDownload(resolved) {
    return DOWNLOAD_EXTS.test(resolved.pathname + resolved.search);
  }

  function pickInternalLink(origin) {
    const candidates = [];
    document.querySelectorAll("a[href]").forEach(a => {
      if (panel && panel.contains(a)) return;
      const href = a.getAttribute("href") || "";
      if (/^(mailto:|tel:|javascript:|#)/i.test(href)) return;
      if (a.hasAttribute("download")) return;
      try {
        const resolved = new URL(href, location.href);
        if (resolved.origin !== origin) return;
        if (resolved.href === location.href) return;
        if (looksLikeDownload(resolved)) return;
        if (resolved.searchParams.get("download") !== null) return;
        candidates.push(a);
      } catch {}
    });
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // ── Messages from background ───────────────────────────────────────────────
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "TOGGLE_PANEL") togglePanel();
  });

  // ── Newsticker ─────────────────────────────────────────────────────────────
  function createTicker() {
    if (document.getElementById("__demo_ticker__")) return;
    const ticker = document.createElement("div");
    ticker.id = "__demo_ticker__";
    // Two identical halves — animating by -50% creates a seamless loop
    const unit = Array(20).fill("This is The Pale Archives").join("\u00a0\u00a0\u00a0\u00a0\u25c6\u00a0\u00a0\u00a0\u00a0");
    ticker.innerHTML = `<span class="__demo_ticker_track__">${unit}&nbsp;&nbsp;&nbsp;&nbsp;${unit}&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
    document.documentElement.appendChild(ticker);
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  createTicker();
  createPanel();

  // Auto-resume demo if it was running before page load
  chrome.runtime.sendMessage({ type: "GET_DEMO" }, (res) => {
    if (res && res.on) demoStart();
  });

})();
