# Private.Money

**The independent hub for private money & hard money lending.**
Borrowers compare private/hard money loan options, run the numbers with free calculators and request lender matches. Individual investors learn how private credit works and join the investor list. Lenders and brokers apply to join the partner network.

Static HTML/CSS/JS. No build step. Hosted free on **GitHub Pages** from the `main` branch (root folder).

---

## Monetization built in

| Stream | Where |
|---|---|
| Google AdSense (Auto ads, `ca-pub-6620975821265271`) | `<head>` of every page + `ads.txt` + `google-adsense-account` meta |
| Borrower lead generation (multi-step loan match funnel) | `get-funded.html` (+ quick estimator on home) |
| Investor lead generation (private credit waitlist) | `invest.html` |
| Lender/broker partner leads (B2B) | `lenders.html` |
| Sponsorship & advertising | `advertise.html` |
| Donations / supporter pledges | `support.html` |
| Contests & prizes (sponsor inventory + engagement) | `contests.html` |
| Talent pipeline | `careers.html` |
| YouTube video library | `videos.html` |

## Structure

```
index.html            Home: hero estimator, programs, market snapshot, FAQ
get-funded.html       5-step borrower lead funnel with live estimate
invest.html           Private credit for individual investors + waitlist
calculators.html      6 interactive calculators (flip, cost, DSCR, BRRRR, MAO, note yield)
learn.html            Guide library (filter + search)
guides/*.html         In-depth articles
glossary.html         Searchable private-lending glossary
videos.html           Curated YouTube library
lenders.html          Lender & broker partner program
advertise.html        Sponsorship & advertising
support.html          Donations & supporter tiers
contests.html         Contests, prizes & official rules
careers.html          Open roles & applications
about.html / contact.html / privacy.html / terms.html / disclaimer.html
thank-you.html / 404.html
assets/css/style.css  Design system
assets/js/site.js     Header/footer, forms, funnel, UI
assets/js/calculators.js
sitemap.xml robots.txt ads.txt site.webmanifest .nojekyll
PROMPT.md             Phase-wise build prompt used to create this site
```

## Configuration (one place)

Open `assets/js/site.js` → `CFG` at the top:

- `donate.paypal` / `donate.stripe` / `donate.buymeacoffee` — paste payment links to make the donation buttons go straight to checkout. While empty, buttons open the pledge form.
- All forms post through FormSubmit to the site inbox. The address is never printed in the HTML; it is assembled at runtime.

## Go-live checklist

1. **GitHub Pages:** Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
2. **Custom domain:** Settings → Pages → Custom domain → `private.money`. At the registrar add `A` records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and a `CNAME` for `www` → `webworksa1.github.io`. Tick *Enforce HTTPS*.
3. **Activate the form inbox:** submit any form once on the live site, then click *Activate Form* in the FormSubmit email.
4. **AdSense:** add the site `private.money` in AdSense → Sites, then request review. Enable Auto ads. For EEA/UK traffic, turn on Google's Privacy & messaging consent message.
5. Submit `https://private.money/sitemap.xml` in Google Search Console.

## Trademark & copyright

"Private.Money" is an independent publication. The words "private money" are used in their ordinary, descriptive sense. Not affiliated with any company, product or registered mark containing "Private Money" or "PrivateMoney". See `disclaimer.html`.

© 2026 Private.Money. All rights reserved.
