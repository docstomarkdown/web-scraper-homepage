// Every marketplace and payment fee the calculators use, in one place, with the page it came from and the day it was
// checked there. A calculator reads its rates from here and shows `RatesChecked` under its result, so a reader can see
// where the numbers come from and how old they are. Re-check each source every quarter and update `checked`.
// A rate whose source couldn't be read has `checked: null`, and the page says so.

export interface RateSource {
    /** The company, as the reader knows it. */
    name: string;
    /** The company's own page the rates are from. */
    url: string;
    /** The day the rates were checked on that page (ISO date), or null when the page couldn't be read. */
    checked: string | null;
}

export const MERCARI = {
    source: { name: "Mercari", url: "https://www.mercari.com/us/help_center/article/169/", checked: "2026-11-10" } as RateSource,
    /** 10% selling fee on the item price plus buyer-paid shipping, since 6 January 2025; no seller processing fee. */
    sellingFee: 0.1,
};

export const PAYPAL = {
    source: { name: "PayPal", url: "https://www.paypal.com/us/business/paypal-business-fees", checked: "2026-11-10" } as RateSource,
    /** US commercial transaction rates, each with the USD fixed fee. */
    tiers: {
        checkout: { label: "Checkout", percent: 3.49, fixed: 0.49 },
        cards: { label: "Cards", percent: 2.99, fixed: 0.49 },
        international: { label: "Intl.", percent: 3.49 + 1.5, fixed: 0.49 },
        micropayment: { label: "Micro", percent: 4.99, fixed: 0.09 },
        nonprofit: { label: "Charity", percent: 1.99, fixed: 0.49 },
    },
};

export const EBAY = {
    source: { name: "eBay", url: "https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822", checked: "2026-11-10" } as RateSource,
    /** Final value fee for most categories, on the total sale amount up to `tierLimit`; `aboveTier` on the rest. */
    finalValuePercent: 13.6,
    tierLimit: 7500,
    aboveTierPercent: 2.35,
    /** Per-order fee: `perOrderSmall` for orders of `perOrderThreshold` or less, `perOrderLarge` above it. */
    perOrderSmall: 0.3,
    perOrderLarge: 0.4,
    perOrderThreshold: 10,
};

export const POSHMARK = {
    source: { name: "Poshmark", url: "https://poshmark.com/terms", checked: "2026-11-10" } as RateSource,
    /** $2.95 for sales of $15 and under; 20% above $15 (since 24 October 2024). */
    flatFee: 2.95,
    flatUpTo: 15,
    percent: 0.2,
};

export const ETSY = {
    // Etsy's fee page refuses automated reads, so these defaults couldn't be checked there.
    source: { name: "Etsy", url: "https://www.etsy.com/legal/fees/", checked: null } as RateSource,
};

export const AMAZON_REFERRAL = {
    source: { name: "Amazon", url: "https://sell.amazon.com/pricing", checked: "2026-11-10" } as RateSource,
    /** Most categories: 15% with a $0.30 minimum. Beauty, Health & Personal Care and Baby: 8% at $10 and under, 15% above. */
    standardPercent: 15,
    minimum: 0.3,
    lowPriceCategoryPercent: 8,
    lowPriceThreshold: 10,
};
