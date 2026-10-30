# Private.Money — Phase-Wise Build Prompt

A reusable, copy-paste prompt set for building (or rebuilding and expanding) **Private.Money** as a modern, interactive, responsive, AdSense-ready, lead-generating website on the GitHub Pages free plan.

---

## The winning concept

**Private.Money: the independent hub for private and hard money lending.**
The site serves three audiences:

1. **Borrowers** (flippers, BRRRR investors, landlords, builders) who need fast non-bank capital.
2. **Individuals with capital** who want to earn as private lenders or private-credit investors.
3. **Lenders, brokers and funds** who pay for qualified borrowers and visibility.

### Why this beats the alternatives for this domain

| Option for "Private.Money" | Ad value | Lead value | Content depth | Verdict |
|---|---|---|---|---|
| **Private/hard money lending hub** | Very high (loan and mortgage keywords are among the most expensive in AdSense) | Very high (investor loan requests are sold or referred per lead or per funding) | Deep: rates, programs, calculators, guides | **Chosen** |
| Financial privacy / anonymous money | Low to medium | Weak | Risky (policy-sensitive niche) | Rejected |
| Private banking / wealth | High | Medium (needs licensing to monetize) | Broad, generic | Secondary topic |
| Crypto "private money" | Volatile | Weak | Policy-risky | Rejected |

### Revenue stack, highest leverage first

1. Borrower lead generation (multi-step funnel with an instant estimate)
2. Lender/broker partner tiers (free network, $299/mo Featured, custom Exclusive Territory)
3. AdSense on calculators and long-form guides
4. Sponsorships (calculator "Powered by", guides, newsletter, contests)
5. Investor-list introductions to funds and lenders
6. Donations and patrons
7. Domain/site partnership inquiries via web.works/contact

---

## Global rules (apply to every phase)

- Static HTML/CSS/vanilla JS only. No build step; must run on GitHub Pages free plan from `main` / root.
- Use **relative links only** so the site works on both `webworksa1.github.io/private-money/` and `private.money`.
- Put the AdSense script in `<head>` of every page:
  `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>`, plus `<meta name="google-adsense-account" content="ca-pub-6620975821265271">` and `ads.txt`.
- Put a top bar on every page: **"Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership"**, linking to `https://web.works/contact`.
- **One inbox only** for every form and contact. The address must **never appear** in HTML, text or links. Store it encoded (reversed base64) in JS config, decode at runtime, post via FormSubmit AJAX, and use JS-built `mailto:` for "Email us" buttons.
- Avoid trademark use of "PrivateMoney". Use "private money" descriptively, and publish a trademark/copyright disclosure.
- Make no false claims: no invented stats, testimonials or "funded $X". Use dated, sourced ranges and honest counters (tools, guides, terms).
- Compliance language: not a lender, broker, adviser or funding portal; business-purpose loans only; not an offer of securities; TCPA-style consent on lead forms.

---

## Phase 0: Strategy and research

> **Prompt:** Analyze the domain Private.Money and choose the most profitable, AdSense-safe concept. Visit at least 35 leading sites in private/hard money lending, real estate investor finance and private credit (for example Kiavi, LendingOne, RCN Capital, Lima One, CoreVest, Visio, Easy Street Capital, New Silver, CIVIC, Dominion, ABL, Anchor Loans, Park Place Finance, HouseMax, Groundfloor, Fundrise, Arrived, Yieldstreet, EquityMultiple, RealtyMogul, CrowdStreet, Percent, Sharestates, Upright, Rocket Dollar, BiggerPockets, LendingTree, Forbes Advisor, DealMachine, Stessa, Baselane, Roofstock, AAPL, privatelenders.com, Connected Investors). For each, extract lead-form fields and steps, calculators and formulas, trust and conversion elements, content and SEO patterns, design trends and compliance language. Output a consolidated feature checklist and a dated table of typical rates, points, leverage and terms.

**Done when** you have a feature checklist, a rate-range table with sources and dates, and gaps to own (for example, no investing site offers a net private-credit yield calculator).

## Phase 1: Information architecture

> **Prompt:** Design the sitemap. Root pages: index, get-funded, invest, calculators, learn, glossary, videos, lenders, advertise, support, contests, careers, about, contact, privacy, terms, disclaimer, thank-you, 404. Guides in `/guides/`: what-is-private-money-lending, hard-money-vs-private-money, fix-and-flip-loans, dscr-loans-explained, brrrr-financing, how-to-become-a-private-lender, private-credit-investing, avoid-private-lending-scams. Navigation: Get Funded, Invest, Calculators, Learn ▾ (Guides, Glossary, Videos), Community ▾ (Contests, Careers, Support, Lenders & Brokers, Advertise), Contact, a dark-mode toggle and a "Get Matched" CTA.

## Phase 2: Design system

> **Prompt:** Create `assets/css/style.css`. Fintech look: ink navy `#0b1220` hero gradients, emerald `#10b981` primary, gold `#f5b544` accent, Inter body, Plus Jakarta Sans headings, 16px radius, soft shadows, full dark mode. Components: top bar, sticky blurred header with dropdowns and a mobile drawer, hero with glass card, trust strip, cards and grids, stats, numbered steps, tables, CTA band, forms (money/percent adornments, choice cards, consent checks, honeypot), multi-step funnel with progress, estimate panel and meter, tabs, calculator layout, chips and search, glossary A–Z, FAQ accordion, article layout with TOC and reading bar, lite YouTube embeds, pricing tiers, allocation bars, timeline, footer, cookie notice, modal, back-to-top, mobile sticky CTA, reveal animations, reduced-motion and print styles.

## Phase 3: Global JavaScript

> **Prompt:** Build `assets/js/site.js` with a single CFG block (encoded inbox, donate links, partner URL). Inject the header and footer from one nav definition, with root-prefix support for `/guides/`. Implement: the hidden-mail click handler; universal FormSubmit AJAX submit with honeypot, subject, page URL and timestamp, redirect to `thank-you.html?type=` or inline success, and a mailto fallback on failure; a shared estimator; the multi-step funnel; tabs with hash deep-links; search and chip filters; lite YouTube; TOC, reading progress and share buttons; donate buttons that open a payment link if configured or else scroll to the pledge form; counters and reveal; a cookie notice that requests non-personalized ads on "Essential only"; and an exit-intent lead-magnet modal (once per 14 days, never on funnel or legal pages).

## Phase 4: Lead generation (the money pages)

> **Prompt:** Build `get-funded.html` as a 5-step funnel:
> 1. Purpose (choice cards, auto-advance)
> 2. Property type, state (50 + DC), city, ZIP, contract status, timeline
> 3. Price, rehab, ARV, requested loan, rent
> 4. Experience band, credit band, entity, liquidity
> 5. Contact, plus required share consent and an optional SMS consent
>
> Add a sticky live estimate (max loan from LTC and ARV caps, rate range adjusted for experience and credit, points, interest-only payment, cash to close, term, match-strength meter), plus "what lenders look for", a document checklist and FAQ. Then build `invest.html` (structures table, risk grid, accredited explainer, investor-list form with accredited check, amount, interests, term and account type) and `lenders.html` (partner tiers, standards, application form).

## Phase 5: Calculators

> **Prompt:** Build `calculators.html` plus `assets/js/calculators.js` with six live calculators: Fix & Flip Profit, Hard Money Cost (effective annual cost), DSCR (ratio and max loan at 1.00x/1.25x), BRRRR (cash left in deal, cash flow, CoC, DSCR), 70% Rule MAO, and Private Note Net Yield (servicing, expected loss, benchmark). Add verdict text, "bad" states, reset buttons, deep links (#flip, #cost, #dscr, #brrrr, #mao, #yield) and CTAs into the funnel.

## Phase 6: Content for AdSense approval and SEO

> **Prompt:** Write 8 original, sourced, 1,000+ word guides with key takeaways, tables, worked examples that match the calculators, inline CTAs, an author box, share buttons, an auto TOC, Article schema and related links. Write a 60+ term glossary with search, a learn hub with filters and learning paths, a video library (verified YouTube embeds plus topic collections and a creator submission form), and a homepage FAQ with FAQPage schema.

## Phase 7: Community monetization

> **Prompt:** Build `support.html` (4 tiers, transparent allocation: operations 30%, talent 25%, promotion 20%, contests 15%, reserve 10%, pledge form, not-tax-deductible note), `contests.html` (skill-based Deal Underwriting Challenge with case brief, categories, a target prize pool funded by sponsors, timeline, judging weights, official rules and an entry form), `careers.html` (6 remote roles and an application form) and `advertise.html` (placements, packages, standards, inquiry form, and a link to web.works/contact for domain and partnership inquiries).

## Phase 8: Trust, legal and technical SEO

> **Prompt:** Write `about.html` (mission, what we're not, how we make money, editorial standards), `contact.html` (form, hidden-email button, web.works partnership card), `privacy.html` (AdSense/DoubleClick cookies, opt-out links, FormSubmit, YouTube nocookie, GDPR/CCPA/PIPEDA rights, children), `terms.html` and `disclaimer.html`, which must include the trademark/copyright disclosure, not-a-lender language, an advertiser and referral disclosure and an investment risk disclosure. Add `sitemap.xml`, `robots.txt`, `ads.txt`, `site.webmanifest`, `.nojekyll`, canonical and OG tags, and a `404.html` that sets `<base>` dynamically.

## Phase 9: QA and deploy

> **Prompt:** Test in a headless browser at 390px and 1280px. Check:
> - no console errors on any page
> - every internal link resolves
> - the funnel advances and validates, and the estimate updates
> - all calculators return finite numbers
> - the inbox address appears nowhere in the HTML or rendered text
> - the top bar is present on every page
> - the AdSense script is in every `<head>`
>
> Push to `WEBWORKSA1/private-money` on `main`, then enable Pages (Settings → Pages → Deploy from branch → main / root).

## Phase 10: Growth roadmap (post-launch)

1. Point `private.money` DNS to GitHub Pages, add the custom domain and enforce HTTPS, then apply to AdSense.
2. Enable Google's consent message (CMP) for EEA/UK traffic.
3. Submit the sitemap to Search Console and track the funnel with privacy-friendly analytics.
4. Add 50 state pages ("Hard money loans in {State}"), plus city pages for the top 20 metros.
5. Add a monthly "Private Lending Rate Report" page, a linkable data asset.
6. Add calculator export to PDF and email-my-results (lead capture).
7. Recruit 10–20 partner lenders; turn on featured placements; launch Season 1 contest sponsors.
8. Publish 2–4 new guides per month; refresh rate tables quarterly.
