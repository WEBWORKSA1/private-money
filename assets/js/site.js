/* Private.Money core script */
(function () {
  'use strict';

  /* ---------- CONFIG (edit here) ---------- */
  var CFG = {
    k: '=02bj5CbpFWbnBUMhN3ay92diV2d',          // encoded inbox (never printed in HTML)
    partner: 'https://web.works/contact',
    donate: { paypal: '', stripe: '', buymeacoffee: '' } // paste checkout links to enable direct payments
  };

  var d = document, root = d.body.getAttribute('data-root') || '';
  var page = d.body.getAttribute('data-page') || '';
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function inbox() { return atob(CFG.k.split('').reverse().join('')); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  window.PM = { money: money, cfg: CFG };

  /* ---------- theme ---------- */
  var savedTheme = store('pm-theme');
  if (savedTheme) d.documentElement.setAttribute('data-theme', savedTheme);

  /* ---------- header ---------- */
  function L(href) { return root + href; }
  var nav = [
    ['get-funded.html', 'Get Funded', 'borrow'],
    ['invest.html', 'Invest', 'invest'],
    ['calculators.html', 'Calculators', 'calc'],
    ['dd', 'Learn', [
      ['learn.html', 'Guides', 'In-depth private lending guides'],
      ['glossary.html', 'Glossary', '60+ terms, plain English'],
      ['videos.html', 'Video Library', 'Curated YouTube lessons']
    ]],
    ['dd', 'Community', [
      ['contests.html', 'Contests & Prizes', 'Compete, learn, win'],
      ['careers.html', 'Careers', 'Write, edit, build with us'],
      ['support.html', 'Support Us', 'Donate & become a patron'],
      ['lenders.html', 'Lenders & Brokers', 'Join the partner network'],
      ['advertise.html', 'Advertise & Sponsor', 'Reach active investors']
    ]],
    ['contact.html', 'Contact', 'contact']
  ];
  var header = $('#site-header');
  if (header) {
    var h = '<a class="skip" href="#main">Skip to content</a><div class="container nav-wrap">' +
      '<a class="brand" href="' + L('index.html') + '" aria-label="Private.Money home"><span class="brand-mark">P</span><span>Private<b>.Money</b></span></a>' +
      '<div style="display:flex;gap:8px;align-items:center"><button class="icon-btn nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">☰</button></div>' +
      '<nav id="nav-menu" class="nav" aria-label="Main"><button class="icon-btn nav-close" aria-label="Close menu">✕</button>';
    nav.forEach(function (n) {
      if (n[0] === 'dd') {
        h += '<div class="dd"><button aria-haspopup="true">' + n[1] + ' ▾</button><div class="dd-menu">';
        n[2].forEach(function (s) { h += '<a href="' + L(s[0]) + '">' + s[1] + '<small>' + s[2] + '</small></a>'; });
        h += '</div></div>';
      } else {
        h += '<a href="' + L(n[0]) + '"' + (location.pathname.indexOf(n[0]) > -1 ? ' class="active" aria-current="page"' : '') + '>' + n[1] + '</a>';
      }
    });
    h += '<button class="icon-btn theme-btn" aria-label="Toggle dark mode" title="Toggle dark mode">☾</button>' +
      '<a class="btn btn-primary btn-sm" href="' + L('get-funded.html') + '">Get Matched</a></nav></div>';
    header.innerHTML = h;
    var menu = $('#nav-menu'), scrim = d.createElement('div');
    scrim.className = 'scrim'; d.body.appendChild(scrim);
    function closeMenu() { menu.classList.remove('open'); scrim.classList.remove('show'); $('.nav-toggle').setAttribute('aria-expanded', 'false'); }
    $('.nav-toggle').addEventListener('click', function () { menu.classList.add('open'); scrim.classList.add('show'); this.setAttribute('aria-expanded', 'true'); });
    $('.nav-close').addEventListener('click', closeMenu);
    scrim.addEventListener('click', closeMenu);
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); $$('.dd.open').forEach(function (x) { x.classList.remove('open'); }); } });
    $$('.dd>button').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); var p = b.parentNode, o = p.classList.contains('open'); $$('.dd.open').forEach(function (x) { x.classList.remove('open'); }); if (!o) p.classList.add('open'); }); });
    d.addEventListener('click', function () { $$('.dd.open').forEach(function (x) { x.classList.remove('open'); }); });
    var tb = $('.theme-btn');
    function syncTheme() { tb.textContent = d.documentElement.getAttribute('data-theme') === 'dark' ? '☀' : '☾'; }
    syncTheme();
    tb.addEventListener('click', function () { var t = d.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; d.documentElement.setAttribute('data-theme', t); store('pm-theme', t); syncTheme(); });
  }

  /* ---------- footer ---------- */
  var footer = $('#site-footer');
  if (footer) {
    var col = function (t, items) { return '<div><h4>' + t + '</h4><ul>' + items.map(function (i) { return '<li><a href="' + (i[0].indexOf('http') === 0 ? i[0] : L(i[0])) + '"' + (i[0].indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') + '>' + i[1] + '</a></li>'; }).join('') + '</ul></div>'; };
    footer.className = 'site-footer';
    footer.innerHTML = '<div class="container"><div class="foot-grid"><div>' +
      '<a class="brand" href="' + L('index.html') + '"><span class="brand-mark">P</span><span>Private<b>.Money</b></span></a>' +
      '<p>The independent hub for private & hard money lending: free calculators, plain-English guides and a no-cost lender matching request.</p>' +
      '<form class="foot-news" data-lead data-subject="Newsletter signup" aria-label="Newsletter signup"><input type="email" name="email" placeholder="Your email" required aria-label="Email"><input type="hidden" name="form" value="Newsletter"><input class="hp" type="text" name="_honey" tabindex="-1" autocomplete="off"><button class="btn btn-primary btn-sm" type="submit">Join</button></form>' +
      '<p class="small" style="margin-top:8px">Weekly rate ranges, deal math & new guides. Unsubscribe anytime.</p></div>' +
      col('Borrowers', [['get-funded.html', 'Get matched with lenders'], ['guides/fix-and-flip-loans.html', 'Fix & flip loans'], ['guides/dscr-loans-explained.html', 'DSCR rental loans'], ['guides/brrrr-financing.html', 'BRRRR financing'], ['calculators.html', 'Calculators']]) +
      col('Investors', [['invest.html', 'Invest in private credit'], ['guides/how-to-become-a-private-lender.html', 'Become a private lender'], ['guides/private-credit-investing.html', 'Private credit 101'], ['guides/avoid-private-lending-scams.html', 'Avoid lending scams'], ['calculators.html#yield', 'Note yield calculator']]) +
      col('Community', [['contests.html', 'Contests & prizes'], ['careers.html', 'Careers'], ['support.html', 'Support us'], ['videos.html', 'Video library'], ['lenders.html', 'Lenders & brokers'], ['advertise.html', 'Advertise']]) +
      col('Company', [['about.html', 'About'], ['contact.html', 'Contact'], ['privacy.html', 'Privacy policy'], ['terms.html', 'Terms of use'], ['disclaimer.html', 'Disclaimer & trademarks'], [CFG.partner, 'Buy / partner on this domain']]) +
      '</div><p class="foot-disc"><b>Important:</b> Private.Money is an independent educational publication and referral service. We are not a lender, mortgage broker, investment adviser or broker-dealer, and nothing on this site is an offer to lend, a commitment to lend, or an offer to sell securities. Rates and terms shown are typical published ranges for illustration only. Loans discussed are business-purpose loans for investment property, not consumer or owner-occupied loans. Always consult licensed professionals. "Private money" is used in its ordinary descriptive sense; this site is not affiliated with any company or mark of a similar name.</p>' +
      '<div class="foot-legal"><span>© <span data-year></span> Private.Money. All rights reserved.</span><span><a href="' + CFG.partner + '" target="_blank" rel="noopener">Interested in this website or domain? Contact us</a></span></div></div>';
  }
  $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- hidden-mail links ---------- */
  d.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-mail]');
    if (!a) return;
    e.preventDefault();
    location.href = 'mailto:' + inbox() + '?subject=' + encodeURIComponent(a.getAttribute('data-mail') || 'Private.Money inquiry');
  });

  /* ---------- forms ---------- */
  function collect(form) {
    var o = {};
    new FormData(form).forEach(function (v, k) {
      if (k === '_honey' || v === '') return;
      o[k] = o[k] ? o[k] + ', ' + v : v;
    });
    return o;
  }
  function mailBody(data) { return Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n'); }
  function showMsg(form, cls, html) {
    var m = $('.form-msg', form.parentNode) || d.createElement('div');
    m.className = 'form-msg ' + cls; m.innerHTML = html; m.setAttribute('role', 'status');
    if (!m.parentNode) form.parentNode.insertBefore(m, form.nextSibling);
    return m;
  }
  function success(form) {
    var t = form.getAttribute('data-thanks');
    if (t) { location.href = L('thank-you.html?type=' + encodeURIComponent(t)); return; }
    if (form.classList.contains('foot-news') || form.hasAttribute('data-inline')) {
      form.reset(); showMsg(form, 'ok', '✓ Thanks! You\'re on the list.');
      var cb = form.getAttribute('data-onsuccess'); if (cb && window[cb]) window[cb](form);
      return;
    }
    form.outerHTML = '<div class="success-box"><div class="icon">✓</div><h3>Received — thank you!</h3><p class="muted">We\'ll review your submission and reply by email, usually within 1–2 business days.</p></div>';
  }
  function failure(form, data, subject) {
    var m = showMsg(form, 'err', 'We couldn\'t send that automatically. <a href="#" class="mail-fallback"><b>Send it with your email app instead →</b></a>');
    $('.mail-fallback', m).addEventListener('click', function (e) {
      e.preventDefault();
      location.href = 'mailto:' + inbox() + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailBody(data));
    });
  }
  function send(form) {
    var hp = form.querySelector('[name=_honey]');
    if (hp && hp.value) { success(form); return; }
    var data = collect(form);
    var subject = '[Private.Money] ' + (form.getAttribute('data-subject') || 'Website submission');
    data._subject = subject; data._template = 'table'; data._captcha = 'false';
    data.page_url = location.href; data.submitted_at = new Date().toString();
    var btn = form.querySelector('[type=submit]'), label = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.innerHTML = 'Sending…'; }
    fetch('https://formsubmit.co/ajax/' + inbox(), {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data)
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (String(j.success) === 'true') success(form); else throw new Error(j.message || 'fail');
    }).catch(function () {
      if (btn) { btn.disabled = false; btn.innerHTML = label; }
      delete data._template; delete data._captcha;
      failure(form, data, subject);
    });
  }
  function bindForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      send(form);
    });
  }
  $$('form[data-lead]').forEach(bindForm);

  /* ---------- estimator (shared by hero + funnel) ---------- */
  function estimate(o) {
    var p = +o.price || 0, r = +o.rehab || 0, v = +o.arv || 0, exp = +o.exp || 0, cr = +o.credit || 0, pur = o.purpose || 'flip';
    var max = 0, lo, hi, plo = 1, phi = 3, term = '6–18 months', basis = v || p;
    if (pur === 'flip' || pur === 'construction') {
      var ltc = pur === 'construction' ? 0.85 : (exp >= 2 ? 0.90 : 0.85), cap = exp >= 2 ? 0.75 : 0.70;
      var byCost = ltc * p + r, byArv = v ? cap * v : byCost;
      max = Math.min(byCost, byArv); lo = pur === 'construction' ? 9.75 : 9.0; hi = pur === 'construction' ? 12.5 : 12.0;
      term = pur === 'construction' ? '12–24 months' : '6–18 months';
    } else if (pur === 'dscr') { max = 0.80 * basis; lo = 6.0; hi = 8.25; plo = 0; phi = 2; term = '30-year (fixed or ARM)'; }
    else if (pur === 'refi') { max = 0.70 * basis; lo = 6.5; hi = 9.5; plo = 0.5; phi = 2; term = '30-year or 12–24 mo bridge'; }
    else if (pur === 'land') { max = 0.55 * basis; lo = 10.5; hi = 14; plo = 2; phi = 4; term = '6–24 months'; }
    else { max = (pur === 'commercial' ? 0.70 : 0.75) * basis; lo = 8.5; hi = 12.5; term = '12–36 months'; }
    var adj = 0;
    if (exp >= 3) adj -= 0.5; else if (exp === 0) adj += 0.5;
    if (cr >= 740) adj -= 0.375; else if (cr && cr < 640) adj += 1.0; else if (cr && cr < 680) adj += 0.5;
    lo += adj; hi += adj;
    var want = +o.loan || 0;
    var loan = want ? Math.min(want, max) : max;
    var mid = (lo + hi) / 2, monthly = loan * mid / 100 / 12;
    var points = loan * ((plo + phi) / 2) / 100;
    var cash = (pur === 'dscr' || pur === 'refi') ? Math.max(0, p + p * 0.03 + points - loan) : Math.max(0, p + r + p * 0.03 + points - loan);
    if (pur === 'refi') cash = 0;
    var score = 35 + (v ? 15 : 0) + Math.min(exp, 4) * 6 + (cr >= 680 ? 12 : cr ? 4 : 0) + (want && want <= max ? 14 : want ? 0 : 8);
    score = Math.max(10, Math.min(98, Math.round(score)));
    return { max: max, loan: loan, lo: lo, hi: hi, plo: plo, phi: phi, term: term, monthly: monthly, points: points, cash: cash, score: score };
  }
  window.PM.estimate = estimate;
  function readEst(scope) {
    var o = {};
    ['purpose', 'price', 'rehab', 'arv', 'exp', 'credit', 'loan'].forEach(function (k) {
      var el = scope.querySelector('[name=' + k + ']:checked') || scope.querySelector('select[name=' + k + '],input[name=' + k + ']:not([type=radio])');
      if (el) o[k] = el.value;
    });
    return o;
  }
  function paintEst(scope) {
    var o = readEst(scope), e = estimate(o), hasNums = (+o.price || +o.arv);
    var set = function (k, v) { $$('[data-est=' + k + ']').forEach(function (n) { n.textContent = hasNums ? v : '—'; }); };
    set('max', money.format(e.max)); set('loan', money.format(e.loan));
    set('rate', e.lo.toFixed(2) + '% – ' + e.hi.toFixed(2) + '%');
    set('points', e.plo + '–' + e.phi + ' pts (~' + money.format(e.points) + ')');
    set('monthly', money.format(e.monthly) + '/mo'); set('cash', money.format(e.cash)); set('term', e.term);
    set('score', e.score + '/100');
    $$('[data-est-meter]').forEach(function (m) { m.style.width = (hasNums ? e.score : 0) + '%'; });
    return o;
  }
  $$('[data-estimator]').forEach(function (scope) {
    var qs = new URLSearchParams(location.search);
    ['purpose', 'price', 'rehab', 'arv'].forEach(function (k) {
      var v = qs.get(k); if (!v) return;
      var radio = scope.querySelector('[name=' + k + '][value="' + v + '"]');
      if (radio) radio.checked = true; else { var f = scope.querySelector('[name=' + k + ']'); if (f) f.value = v; }
    });
    scope.addEventListener('input', function () { paintEst(scope); });
    scope.addEventListener('change', function () { paintEst(scope); });
    paintEst(scope);
    var go = scope.querySelector('[data-est-go]');
    if (go) go.addEventListener('click', function (e) {
      e.preventDefault();
      var o = readEst(scope), q = new URLSearchParams();
      ['purpose', 'price', 'rehab', 'arv'].forEach(function (k) { if (o[k]) q.set(k, o[k]); });
      location.href = L('get-funded.html?' + q.toString());
    });
  });

  /* ---------- multi-step funnel ---------- */
  $$('form[data-steps]').forEach(function (form) {
    var steps = $$('.step', form), i = 0, bar = $('.progress span', form.parentNode), lab = $('[data-step-label]', form.parentNode), pct = $('[data-step-pct]', form.parentNode);
    function show(n) {
      steps.forEach(function (s, k) { s.classList.toggle('active', k === n); });
      i = n;
      var p = Math.round(((n + 1) / steps.length) * 100);
      if (bar) bar.style.width = p + '%';
      if (lab) lab.textContent = 'Step ' + (n + 1) + ' of ' + steps.length;
      if (pct) pct.textContent = p + '% complete';
      var top = form.parentNode.getBoundingClientRect().top + scrollY - 90;
      if (scrollY > top) scrollTo({ top: top, behavior: 'smooth' });
    }
    function valid(step) {
      var fields = $$('input,select,textarea', step);
      for (var k = 0; k < fields.length; k++) { if (!fields[k].checkValidity()) { fields[k].reportValidity(); return false; } }
      return true;
    }
    form.addEventListener('click', function (e) {
      var t = e.target.closest('[data-next],[data-prev]'); if (!t) return;
      e.preventDefault();
      if (t.hasAttribute('data-next')) { if (valid(steps[i])) show(Math.min(i + 1, steps.length - 1)); }
      else show(Math.max(i - 1, 0));
    });
    $$('.choice input[type=radio]', form).forEach(function (r) {
      r.addEventListener('change', function () {
        var st = r.closest('.step');
        if (st && st.hasAttribute('data-auto') && valid(st)) setTimeout(function () { show(Math.min(i + 1, steps.length - 1)); }, 220);
      });
    });
    show(0);
  });

  /* ---------- tabs ---------- */
  $$('[data-tabs]').forEach(function (wrap) {
    var tabs = $$('[role=tab]', wrap);
    function activate(id, push) {
      tabs.forEach(function (t) { var on = t.getAttribute('aria-controls') === id; t.setAttribute('aria-selected', on ? 'true' : 'false'); var p = d.getElementById(t.getAttribute('aria-controls')); if (p) p.classList.toggle('active', on); });
      if (push) history.replaceState(null, '', '#' + id);
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { activate(t.getAttribute('aria-controls'), true); }); });
    var h = location.hash.replace('#', '');
    activate(h && d.getElementById(h) && tabs.some(function (t) { return t.getAttribute('aria-controls') === h; }) ? h : tabs[0].getAttribute('aria-controls'));
    addEventListener('hashchange', function () { var x = location.hash.replace('#', ''); if (d.getElementById(x)) activate(x); });
  });

  /* ---------- filters (search + chips) ---------- */
  $$('[data-filter]').forEach(function (input) {
    var list = $(input.getAttribute('data-filter')); if (!list) return;
    var chipsWrap = $('[data-chips="' + input.getAttribute('data-filter') + '"]'), cat = 'all';
    function run() {
      var q = input.value.trim().toLowerCase(), shown = 0;
      $$('[data-item]', list).forEach(function (it) {
        var ok = (!q || it.textContent.toLowerCase().indexOf(q) > -1) && (cat === 'all' || (it.getAttribute('data-cat') || '').indexOf(cat) > -1);
        it.style.display = ok ? '' : 'none'; if (ok) shown++;
      });
      $$('[data-group]', list).forEach(function (g) { g.style.display = $$('[data-item]', g).some(function (x) { return x.style.display !== 'none'; }) ? '' : 'none'; });
      var empty = $('.empty', list.parentNode); if (empty) empty.style.display = shown ? 'none' : 'block';
    }
    input.addEventListener('input', run);
    if (chipsWrap) $$('.chip', chipsWrap).forEach(function (c) { c.addEventListener('click', function () { $$('.chip', chipsWrap).forEach(function (x) { x.classList.remove('active'); }); c.classList.add('active'); cat = c.getAttribute('data-cat'); run(); }); });
  });

  /* ---------- lite YouTube ---------- */
  $$('.yt[data-id]').forEach(function (y) {
    var id = y.getAttribute('data-id');
    y.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)';
    y.setAttribute('role', 'button'); y.setAttribute('tabindex', '0');
    y.setAttribute('aria-label', 'Play video: ' + (y.getAttribute('data-title') || 'video'));
    function play() {
      if (y.classList.contains('loaded')) return;
      y.classList.add('loaded');
      y.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + (y.getAttribute('data-title') || 'YouTube video') + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
    }
    y.addEventListener('click', play);
    y.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
  });

  /* ---------- article: TOC + reading progress + share ---------- */
  var art = $('.article');
  if (art) {
    var toc = $('#toc'), heads = $$('h2', art).filter(function (x) { return !x.closest('.takeaways,.inline-cta'); });
    if (toc && heads.length) {
      toc.innerHTML = heads.map(function (hh, n) { if (!hh.id) hh.id = 's' + (n + 1) + '-' + hh.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40); return '<li><a href="#' + hh.id + '">' + hh.textContent + '</a></li>'; }).join('');
    }
    var rp = d.createElement('div'); rp.className = 'reading'; d.body.appendChild(rp);
    addEventListener('scroll', function () {
      var r = art.getBoundingClientRect(), tot = art.offsetHeight - innerHeight;
      rp.style.width = Math.max(0, Math.min(100, (-r.top / (tot || 1)) * 100)) + '%';
      if (toc) { var cur = null; heads.forEach(function (hh) { if (hh.getBoundingClientRect().top < 140) cur = hh.id; }); $$('a', toc).forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + cur); }); }
    }, { passive: true });
  }
  $$('[data-share]').forEach(function (b) {
    b.addEventListener('click', function () {
      var kind = b.getAttribute('data-share'), u = encodeURIComponent(location.href), t = encodeURIComponent(d.title);
      if (kind === 'native' && navigator.share) { navigator.share({ title: d.title, url: location.href }); return; }
      if (kind === 'copy' || kind === 'native') { navigator.clipboard && navigator.clipboard.writeText(location.href); b.textContent = 'Link copied ✓'; return; }
      var map = { x: 'https://twitter.com/intent/tweet?url=' + u + '&text=' + t, linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + u, facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + u, whatsapp: 'https://wa.me/?text=' + t + '%20' + u };
      open(map[kind], '_blank', 'noopener,width=620,height=560');
    });
  });

  /* ---------- donations ---------- */
  $$('[data-donate]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      var amt = b.getAttribute('data-donate'), link = CFG.donate.paypal || CFG.donate.stripe || CFG.donate.buymeacoffee;
      if (link) { e.preventDefault(); open(link, '_blank', 'noopener'); return; }
      e.preventDefault();
      var f = $('#pledge'); if (!f) return;
      var sel = f.querySelector('[name=amount]'); if (sel) sel.value = amt;
      f.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () { var n = f.querySelector('[name=name]'); if (n) n.focus(); }, 600);
    });
  });

  /* ---------- counters + reveal ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target; io.unobserve(el);
        if (el.hasAttribute('data-count')) {
          var end = +el.getAttribute('data-count'), suf = el.getAttribute('data-suffix') || '', t0 = null;
          var stepf = function (ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / 1200); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(stepf); };
          requestAnimationFrame(stepf);
        } else el.classList.add('in');
      });
    }, { threshold: 0.15 });
    $$('.reveal,[data-count]').forEach(function (el) { io.observe(el); });
  } else $$('.reveal').forEach(function (el) { el.classList.add('in'); });

  /* ---------- back to top + mobile CTA ---------- */
  var tt = d.createElement('button'); tt.className = 'to-top'; tt.setAttribute('aria-label', 'Back to top'); tt.textContent = '↑'; d.body.appendChild(tt);
  tt.addEventListener('click', function () { scrollTo({ top: 0, behavior: 'smooth' }); });
  var mc = null;
  if (['borrow', 'thanks', 'legal'].indexOf(page) < 0) { mc = d.createElement('a'); mc.className = 'btn btn-primary mobile-cta'; mc.href = L('get-funded.html'); mc.textContent = 'Get matched with lenders — free'; d.body.appendChild(mc); }
  addEventListener('scroll', function () { var y = scrollY > 600; tt.classList.toggle('show', y); if (mc) mc.classList.toggle('show', y); }, { passive: true });

  /* ---------- cookie notice ---------- */
  if (!store('pm-cookie')) {
    var ck = d.createElement('div'); ck.className = 'cookie show'; ck.setAttribute('role', 'dialog'); ck.setAttribute('aria-label', 'Cookie notice');
    ck.innerHTML = '<b>Cookies & ads</b><p style="margin:6px 0 0">We use cookies, including Google AdSense cookies, to run the site, measure usage and show ads that may be personalized. See our <a href="' + L('privacy.html') + '">Privacy Policy</a>.</p><div class="btn-row"><button class="btn btn-primary btn-sm" data-ck="all">Accept</button><button class="btn btn-ghost btn-sm" data-ck="essential">Essential only</button></div>';
    d.body.appendChild(ck);
    $$('[data-ck]', ck).forEach(function (b) { b.addEventListener('click', function () { store('pm-cookie', b.getAttribute('data-ck')); if (b.getAttribute('data-ck') === 'essential') { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; } ck.remove(); }); });
  } else if (store('pm-cookie') === 'essential') { (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1; }

  /* ---------- lead-magnet modal (once per 14 days) ---------- */
  var last = +store('pm-magnet') || 0;
  if (['borrow', 'thanks', 'legal', 'invest'].indexOf(page) < 0 && Date.now() - last > 14 * 864e5) {
    var fired = false, armed = false;
    setTimeout(function () { armed = true; }, 15000);
    var openMagnet = function () {
      if (fired || !armed) return; fired = true; store('pm-magnet', Date.now());
      var m = d.createElement('div'); m.className = 'modal show'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-labelledby', 'mg-t');
      m.innerHTML = '<div class="modal-box"><button class="icon-btn modal-x" aria-label="Close">✕</button><span class="eyebrow">Free checklist</span><h3 id="mg-t" style="font-size:1.5rem">The 21-point private lending due-diligence checklist</h3><p class="muted">The questions to ask before you borrow from — or lend to — anyone. Plus weekly rate ranges and deal math.</p>' +
        '<form data-lead data-inline data-onsuccess="pmMagnetDone" data-subject="Checklist request (lead magnet)"><div class="field"><label for="mg-n">First name</label><input id="mg-n" name="first_name" required autocomplete="given-name"></div><div class="field"><label for="mg-e">Email</label><input id="mg-e" type="email" name="email" required autocomplete="email"></div><div class="field"><label for="mg-r">I am mainly a…</label><select id="mg-r" name="role"><option>Borrower / real estate investor</option><option>Private lender / note investor</option><option>Broker or lender</option><option>Just learning</option></select></div><input type="hidden" name="form" value="Lead magnet"><input class="hp" type="text" name="_honey" tabindex="-1" autocomplete="off"><button class="btn btn-primary btn-block" type="submit">Send me the checklist</button></form><p class="form-note">No spam. Unsubscribe anytime. See our <a href="' + L('privacy.html') + '">Privacy Policy</a>.</p></div>';
      d.body.appendChild(m);
      bindForm($('form', m));
      var close = function () { m.remove(); };
      $('.modal-x', m).addEventListener('click', close);
      m.addEventListener('click', function (e) { if (e.target === m) close(); });
      d.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); }, { once: true });
    };
    d.addEventListener('mouseout', function (e) { if (!e.relatedTarget && e.clientY < 8) openMagnet(); });
    addEventListener('scroll', function () { if (innerWidth < 760 && scrollY > (d.body.scrollHeight - innerHeight) * 0.7) openMagnet(); }, { passive: true });
  }
  window.pmMagnetDone = function (form) {
    form.insertAdjacentHTML('afterend', '<p style="margin-top:12px"><a class="btn btn-gold btn-block" href="' + L('guides/avoid-private-lending-scams.html#checklist') + '">Open the checklist now →</a></p>');
    form.style.display = 'none';
  };
})();
