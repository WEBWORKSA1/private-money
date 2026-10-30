/* Private.Money calculators */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var M = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  var m = function (n) { return isFinite(n) ? M.format(n) : '—'; };
  var p = function (n, dp) { return isFinite(n) ? (n * 100).toFixed(dp == null ? 1 : dp) + '%' : '—'; };
  function pmt(principal, annualRate, years) {
    var r = annualRate / 100 / 12, n = years * 12;
    if (!principal) return 0; if (!r) return principal / n;
    return principal * r / (1 - Math.pow(1 + r, -n));
  }
  function factor(annualRate, years) { return pmt(1, annualRate, years); }

  var calcs = {
    flip: function (v) {
      var loan = v.price * v.ltc / 100 + v.rehab * v.rehabfin / 100;
      var interest = loan * v.rate / 100 / 12 * v.months;
      var pts = loan * v.points / 100, buy = v.price * v.buyclose / 100, sell = v.arv * v.sellcost / 100, hold = v.hold * v.months;
      var total = v.price + v.rehab + buy + pts + interest + hold + sell;
      var profit = v.arv - total;
      var cash = v.price + v.rehab + buy + pts + interest + hold - loan;
      var roi = cash > 0 ? profit / cash : NaN, ann = roi * 12 / v.months, margin = profit / v.arv;
      var mao = v.arv * 0.7 - v.rehab;
      var verdict = !v.arv ? 'Enter an after-repair value (ARV) to see profit.' :
        profit < 0 ? '⚠ This deal loses money at these assumptions. Renegotiate the price or cut the rehab scope.' :
        margin < 0.10 ? '⚠ Thin margin (under 10% of ARV). One surprise could wipe out the profit.' :
        margin < 0.15 ? 'Workable margin. Many flippers target 15%+ of ARV for safety.' : '✓ Healthy margin (15%+ of ARV) at these assumptions.';
      return { headline: m(profit), bad: profit < 0, o: { loan: m(loan), interest: m(interest), points: m(pts), buy: m(buy), sell: m(sell), hold: m(hold), total: m(total), cash: m(cash), roi: p(roi), ann: p(ann), margin: p(margin), mao: m(mao), rule: v.price <= mao ? '✓ Price is within the 70% rule' : '✗ Price is ' + m(v.price - mao) + ' above the 70% rule' }, verdict: verdict };
    },
    cost: function (v) {
      var monthly = v.loan * v.rate / 100 / 12, interest = monthly * v.months, pts = v.loan * v.points / 100;
      var fees = v.fees + v.draws * v.drawfee, total = interest + pts + fees;
      var eff = v.loan && v.months ? total / v.loan / (v.months / 12) : NaN;
      return { headline: m(total), o: { monthly: m(monthly), interest: m(interest), points: m(pts), fees: m(fees), eff: p(eff, 2), pct: p(total / v.loan, 2) }, verdict: 'Points and fees are paid up front, so the shorter your hold, the higher your effective annual cost. At ' + v.months + ' months, your all-in cost works out to roughly ' + p(eff, 1) + ' per year.' };
    },
    dscr: function (v) {
      var pi = v.io === 'yes' ? v.loan * v.rate / 100 / 12 : pmt(v.loan, v.rate, 30);
      var tia = v.taxes / 12 + v.ins / 12 + v.hoa, pitia = pi + tia, ratio = pitia ? v.rent / pitia : NaN;
      var f = v.io === 'yes' ? v.rate / 100 / 12 : factor(v.rate, 30);
      var max100 = Math.max(0, (v.rent / 1.0 - tia) / f), max125 = Math.max(0, (v.rent / 1.25 - tia) / f);
      var verdict = ratio >= 1.25 ? '✓ Strong. 1.25+ typically earns the best pricing and the highest leverage.' : ratio >= 1.0 ? '✓ Qualifies with most DSCR lenders (1.00+ is break-even).' : ratio >= 0.75 ? '⚠ Below 1.00. Some lenders allow 0.75–0.99 with lower LTV and a higher rate.' : '✗ Unlikely to qualify. Increase rent, reduce the loan or raise your down payment.';
      return { headline: isFinite(ratio) ? ratio.toFixed(2) + 'x' : '—', bad: ratio < 1, o: { pi: m(pi), tia: m(tia), pitia: m(pitia), flow: m(v.rent - pitia), max100: m(max100), max125: m(max125) }, verdict: verdict };
    },
    brrrr: function (v) {
      var totalIn = v.price + v.rehab + v.closing + v.holdcost;
      var refi = v.arv * v.ltv / 100, refiCost = refi * v.refipts / 100;
      var left = totalIn + refiCost - refi;
      var pi = pmt(refi, v.refirate, 30);
      var flow = v.rent - v.rent * v.opex / 100 - v.taxins - pi;
      var coc = left > 0 ? flow * 12 / left : Infinity;
      var dscr = (pi + v.taxins) ? v.rent / (pi + v.taxins) : NaN;
      var verdict = left <= 0 ? '✓ Full BRRRR: you pull out everything you put in (plus ' + m(-left) + ').' : left < totalIn * 0.1 ? '✓ Near-perfect BRRRR: less than 10% of your all-in cost stays in the deal.' : 'ⓘ ' + m(left) + ' stays in the deal. Buy lower or force more value to recycle more capital.';
      if (flow < 0) verdict += ' ⚠ Negative cash flow after the refinance.';
      return { headline: m(left), bad: flow < 0, o: { totalin: m(totalIn), refi: m(refi), refi_cost: m(refiCost), pi: m(pi), flow: m(flow), coc: coc === Infinity ? '∞ (no cash left in)' : p(coc), equity: m(v.arv - refi), dscr: isFinite(dscr) ? dscr.toFixed(2) + 'x' : '—' }, verdict: verdict };
    },
    mao: function (v) {
      var mao = v.arv * v.pct / 100 - v.repairs - v.fee - v.close;
      return { headline: m(mao), bad: mao <= 0, o: { arvpct: m(v.arv * v.pct / 100), deduct: m(v.repairs + v.fee + v.close), spread: m(v.arv - mao - v.repairs) }, verdict: 'Offer at or below ' + m(mao) + ' to keep roughly ' + (100 - v.pct) + '% of ARV for profit, financing and selling costs. In hot markets investors stretch to 75–80%; in soft markets they tighten to 65%.' };
    },
    yield: function (v) {
      var yrs = v.months / 12, interest = v.amount * v.rate / 100 * yrs, pts = v.amount * v.points / 100;
      var serv = v.amount * v.serv / 100 * yrs, loss = v.amount * v.loss / 100 * yrs;
      var net = interest + pts - serv - loss, ann = v.amount && yrs ? net / v.amount / yrs : NaN;
      var bench = v.amount * v.bench / 100 * yrs;
      return { headline: p(ann, 2), bad: net < 0, o: { monthly: m(v.amount * v.rate / 100 / 12), interest: m(interest), points: m(pts), serv: m(serv), loss: m(loss), net: m(net), bench: m(bench), edge: m(net - bench) }, verdict: 'Your risk-adjusted net return is ' + p(ann, 2) + ' a year after servicing and expected losses, versus ' + v.bench + '% on a safe benchmark. The ' + m(net - bench) + ' difference is your pay for taking credit and liquidity risk. Make sure it is worth it.' };
    }
  };

  $$('form[data-calc]').forEach(function (form) {
    var kind = form.getAttribute('data-calc'), panel = form.closest('.panel') || form.parentNode;
    function run() {
      var v = {};
      $$('input,select', form).forEach(function (i) { v[i.name] = i.type === 'number' ? (parseFloat(i.value) || 0) : i.value; });
      var r = calcs[kind](v);
      var hl = $('[data-headline]', panel); if (hl) hl.textContent = r.headline;
      var box = $('.headline', panel); if (box) box.classList.toggle('bad', !!r.bad);
      Object.keys(r.o).forEach(function (k) { $$('[data-o=' + k + ']', panel).forEach(function (n) { n.textContent = r.o[k]; }); });
      var vd = $('.verdict', panel); if (vd) vd.textContent = r.verdict;
    }
    form.addEventListener('input', run); form.addEventListener('change', run);
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    var reset = $('[data-reset]', form);
    if (reset) reset.addEventListener('click', function () { setTimeout(run, 0); });
    run();
  });
})();
