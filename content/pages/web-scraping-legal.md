---
title: "Is Web Scraping Legal? What the Law Says About Collecting Public Data"
description: "Collecting public web data is lawful in most cases, and three things decide the rest: the site's terms, whether the data is personal, and what you do with it. A plain-language guide with sources, not legal advice."
date: 2026-10-21
updated: 2026-10-21
author: vikram
---

Collecting data that a website shows to anyone, for your own research or business use, is lawful in the United States, the European Union and the United Kingdom in most cases. What changes the answer is whether you had to sign in or break a technical barrier, whether the data is about people, whether you agreed to terms that forbid it, and what you do with the data afterwards. This page explains each of those in plain words, with the sources. It is general information, not legal advice; for a specific plan, ask a lawyer where you operate.

## The four questions that decide most cases

Ask whether the data is public, personal, under terms you agreed to, and how you'll use it.

| Question | If yes | If no |
|---|---|---|
| Is the page open to anyone, with no sign-in? | Collecting it is on the safest ground | Signing in brings the site's terms and account rules into play |
| Is the data about identifiable people? | Privacy law applies, whatever the site allows | Business listings, prices and product data carry no privacy duty |
| Did you agree to terms that forbid automated collection? | You can be in breach of contract, even if no other law is broken | Terms you never accepted bind you less, but courts differ |
| Will you republish the content, or only analyse it? | Copyright applies to text, images and reviews | Facts, prices and figures aren't copyrightable; analysis is low risk |

## Public pages: the United States

Scraping public pages is not "unauthorized access" under the US computer-crime law, after two decisions in 2021 and 2022.

The Computer Fraud and Abuse Act (CFAA) makes it a crime to access a computer "without authorization". For years companies argued that scraping a public site broke it. Two decisions narrowed that reading:

- In *Van Buren v. United States* (2021), the Supreme Court held that the law covers getting into parts of a system you're not allowed to enter, not using data you can see for a purpose the owner dislikes. [Opinion](https://www.supremecourt.gov/opinions/20pdf/19-783_k53l.pdf).
- In *hiQ Labs v. LinkedIn* (9th Cir., April 2022), the appeals court applied that reading to scraping: data on public LinkedIn profiles, open to anyone without a password, was not protected by the CFAA. [Opinion](https://cdn.ca9.uscourts.gov/datastore/opinions/2022/04/18/17-16783.pdf).

That settled the criminal-law question for public pages. It did not settle contract or privacy questions, and hiQ itself later lost on a contract claim, which brings us to terms of service.

## Terms of service

A site's terms can forbid scraping, and breaking them can be a breach of contract; whether you agreed to them is the key fact.

Most large sites ban automated collection in their terms. When you create an account and accept those terms, you've made a contract, and scraping while signed in can break it. In the hiQ case, the court found hiQ had breached LinkedIn's terms by scraping with accounts it controlled, and the case settled in 2022.

For pages that need no account, the picture is friendlier. Terms you never clicked through bind you weakly, and in *Meta Platforms v. Bright Data* (N.D. Cal., January 2024) the court found that scraping public Facebook and Instagram pages while logged out did not breach Meta's terms. Treat that as a trend, not a guarantee; another court can decide differently, and a site can still block you.

Practical rule: collect from pages you can see without signing in whenever the job allows. Where you must sign in, read what the account's terms say about export, and keep to what the site offers its own users.

## Personal data: the EU, the UK and US states

Data about identifiable people is regulated wherever those people live, and "it was public" is not a lawful basis on its own.

Under the EU's General Data Protection Regulation (GDPR), and the UK version of it, collecting a person's name, email or phone number is processing personal data. You need a lawful basis (Article 6), you owe the person information about what you're doing (Article 14 covers data you didn't get from them), and you must honour requests to stop. The regulation's text is at [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj). Business contact details published for business purposes are easier to justify under "legitimate interests" than a private individual's details, but the duties still apply.

In the United States, there is no single privacy law, but the California Consumer Privacy Act and the laws modelled on it give residents rights over data about them, including data collected from public sources. California's attorney general publishes the rules at [oag.ca.gov](https://oag.ca.gov/privacy/ccpa). Anti-spam rules add their own limits on what you can do with an email address you collected: the CAN-SPAM Act in the US, the Privacy and Electronic Communications Regulations in the UK, and national rules under the ePrivacy Directive in the EU.

Practical rule: collect business listings and their published contact details for business outreach, keep the data no longer than the job needs, and never build profiles of private individuals.

## Copyright and database rights

Facts aren't protected; the way they're written and photographed is.

Prices, addresses, ratings, counts and other facts are not copyrightable. The US Supreme Court said so in *Feist Publications v. Rural Telephone* (1991), holding that a listing of facts can't be protected without original selection or arrangement ([decision](https://supreme.justia.com/cases/federal/us/499/340/)). Product descriptions, reviews, articles and photos are protected, because someone wrote or shot them.

So a table of prices and ratings for your own analysis is low risk. Republishing a store's product photos, or a review site's reviews, on your own site is not. The EU adds a separate database right that can protect a substantial extraction from a database built with real investment; it rarely matters for ordinary research, but it exists.

## Technical barriers and robots.txt

A barrier you have to defeat changes the legal picture; a robots.txt file is a request, not a law.

Getting around a login wall, a paywall or an anti-bot system is where "unauthorized access" arguments return, and where many sites' terms are clearest. Web Scraper Pro reads pages in your own browser as you see them and never bypasses a verification page; when a site asks you to prove you're human, you do it, or you stop.

The robots.txt file (standardised in [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309)) tells crawlers which paths a site prefers they avoid. Ignoring it isn't illegal by itself, but courts and regulators treat it as evidence of what the site allowed, so respecting it is the sensible default for any crawl that runs on its own.

## What this means for a Web Scraper Pro user

Stay on public pages, keep business data for business use, don't republish what you didn't write, and read the terms of any site you sign in to.

- A Google Maps search for dentists in a city, exported for your own outreach, collects published business data. Keep it to the outreach, honour unsubscribes, and you're within the usual rules.
- A list of products and prices from a store, for a price comparison, is facts for analysis. Don't republish the store's photos or descriptions.
- A job board's postings are about jobs, not people. The extension doesn't collect candidate profiles, and you shouldn't try to.
- Pages you can only see when signed in come with that account's terms. Export only what those terms let an ordinary user export.
- Reviews are someone's writing. Analyse them, quote briefly with attribution, and don't copy them wholesale.

## Where the law is still moving

Three areas to watch: AI training data, state privacy laws, and sites' new technical and contractual defences.

Courts are now deciding how copyright applies to data collected for training AI models; regulators in the EU and UK have published guidance on scraping for that purpose and are still refining it. More US states pass privacy laws each year, each with its own thresholds. And large sites keep tightening both their terms and their bot defences. This page is dated at the top; when one of those changes the answer, it gets updated.

## Sources

- *Van Buren v. United States*, 593 U.S. (2021), Supreme Court of the United States. [supremecourt.gov](https://www.supremecourt.gov/opinions/20pdf/19-783_k53l.pdf)
- *hiQ Labs, Inc. v. LinkedIn Corp.*, No. 17-16783 (9th Cir. Apr. 18, 2022). [ca9.uscourts.gov](https://cdn.ca9.uscourts.gov/datastore/opinions/2022/04/18/17-16783.pdf)
- *Meta Platforms, Inc. v. Bright Data Ltd.*, No. 3:23-cv-00077 (N.D. Cal. Jan. 23, 2024), order on summary judgment.
- *Feist Publications, Inc. v. Rural Telephone Service Co.*, 499 U.S. 340 (1991). [justia.com](https://supreme.justia.com/cases/federal/us/499/340/)
- Computer Fraud and Abuse Act, 18 U.S.C. § 1030. [law.cornell.edu](https://www.law.cornell.edu/uscode/text/18/1030)
- Regulation (EU) 2016/679 (GDPR), Articles 6 and 14. [eur-lex.europa.eu](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- California Consumer Privacy Act, as amended. [oag.ca.gov](https://oag.ca.gov/privacy/ccpa)
- RFC 9309, Robots Exclusion Protocol (2022). [rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9309)

This page is general information about the law as of its "updated" date, written by a software company, not a law firm. It isn't legal advice and doesn't create a lawyer-client relationship. For a decision that matters, talk to a lawyer in your jurisdiction.
