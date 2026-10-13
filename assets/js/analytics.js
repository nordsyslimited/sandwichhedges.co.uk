// Visit counting is done by NordAnalytics (first-party, cookieless, see /privacy.html#website-statistics).
// Google Analytics, Google Fonts and the cookie banner were removed in the same release that added the tag.
// Every page loads this one file just before </body>. Do not add Google Analytics or any other tracker back.

// Footer notice + opt-out links.
(function () {
  var SELECTORS = ['.foot-bottom', '.footer-bottom', '.footer__legal', 'footer .container', 'footer'];
  function findFooter() {
    for (var i = 0; i < SELECTORS.length; i++) {
      var el = document.querySelector(SELECTORS[i]);
      if (el) return el;
    }
    return null;
  }
  function addOptOutLink() {
    var fb = findFooter();
    if (!fb || fb.querySelector('.nord-optout')) return;
    var wrap = document.createElement('span');
    wrap.className = 'nord-stats-links';
    wrap.style.cssText = 'display:block;flex:0 0 100%;margin-top:.5rem;font-size:.9em';
    var info = document.createElement('a');
    info.href = '/privacy.html#website-statistics';
    info.textContent = 'How we count visits';
    var a = document.createElement('a');
    a.href = '#';
    a.className = 'nord-optout';
    a.textContent = "Don't count my visits";
    var msg = document.createElement('span');
    msg.className = 'nord-optout-msg';
    msg.setAttribute('data-na-optout-done', '');
    msg.hidden = true;
    msg.setAttribute('role', 'status');
    msg.setAttribute('aria-live', 'polite');
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (typeof window.nordAnalyticsOptOut === 'function') {
        try { window.nordAnalyticsOptOut(); } catch (err) {}
        msg.textContent = " Done, we won't count your visits.";
      } else {
        try { localStorage.setItem('na_ignore', '1'); } catch (err) {}
        msg.textContent = " Done, we won't count your visits.";
      }
      msg.hidden = false;
    });
    wrap.appendChild(info);
    wrap.appendChild(document.createTextNode(' \u00b7 '));
    wrap.appendChild(a);
    wrap.appendChild(msg);
    fb.appendChild(wrap);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addOptOutLink);
  } else {
    addOptOutLink();
  }
})();

// NordAnalytics tag: cookieless, skipped when the visitor opted out.
(function () {
  try { if (localStorage.getItem('na_ignore') === '1') return; } catch (e) {}
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://inbox.nordsys.co.uk/analytics/a.js';
  document.head.appendChild(s);
})();

/* yt-click-to-play: a YouTube video is only loaded (and YouTube only contacted) after the visitor clicks play. */
(function () {
  var css = '.yt-play{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.6rem;box-sizing:border-box;background:#101820;color:#fff;border:0;padding:1rem;cursor:pointer;font:inherit;text-align:center;line-height:1.35}' +
    '.yt-play:focus-visible{outline:3px solid #f5b301;outline-offset:-3px}' +
    '.yt-play-icon{width:3.4rem;height:3.4rem;border-radius:50%;background:#fff;position:relative;flex:none}' +
    '.yt-play-icon:after{content:"";position:absolute;left:1.35rem;top:1rem;border-left:1.05rem solid #101820;border-top:.7rem solid transparent;border-bottom:.7rem solid transparent}' +
    '.yt-play-text{font-weight:600;font-size:1rem}.yt-play-text small{display:block;font-weight:400;font-size:.78rem;opacity:.85;margin-top:.35rem;max-width:34rem}';
  var st = document.createElement('style');
  st.setAttribute('data-yt-play', '');
  st.appendChild(document.createTextNode(css));
  document.head.appendChild(st);
  function layout() {
    var b = document.querySelectorAll('.yt-play');
    for (var i = 0; i < b.length; i++) {
      var el = b[i];
      if (el.getAttribute('data-yt-style')) continue;
      var p = el.parentNode, ps = p && getComputedStyle(p);
      if (ps && ps.position !== 'static' && parseFloat(ps.paddingTop) > 0) {
        el.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%';
      } else {
        el.style.cssText = 'width:100%;aspect-ratio:16/9';
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', layout); else layout();
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.yt-play') : null;
    if (!btn) return;
    var id = btn.getAttribute('data-yt-id');
    if (!/^[A-Za-z0-9_-]{11}$/.test(id || '')) return;
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
    f.title = btn.getAttribute('data-yt-title') || 'Video';
    f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    var s = btn.getAttribute('data-yt-style');
    if (s) f.setAttribute('style', s);
    else if (btn.parentNode && btn.parentNode.className && getComputedStyle(btn.parentNode).position !== 'static') f.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;border:0');
    else f.setAttribute('style', 'width:100%;aspect-ratio:16/9;border:0');
    btn.parentNode.replaceChild(f, btn);
  });
})();
