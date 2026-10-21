"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { toolsGroups } from "@/config/site";
import { useReducedMotion } from "framer-motion";
import { Search, ArrowRight, Calculator, ArrowLeftRight, Box, Clock, CreditCard, Zap } from "lucide-react";

// One honest sentence per tool, in plain words: what you put in and what you get out.
const toolDescriptions: Record<string, string> = {
    "Dropshipping Profit Calculator": "Enter the price, the product cost, shipping and ad spend, and see the profit left on each order.",
    "Amazon FBA Fee Calculator": "Enter a product's size, weight and price to estimate Amazon's fulfilment and referral fees and the profit left.",
    "Profit Margin Calculator": "Enter cost and price to get the gross margin, the markup and the profit per unit.",
    "Discount Percentage Calculator": "Work out the sale price, the discount percentage or the original price from the other two.",
    "Return on Investment (ROI) Calculator": "Enter what you spent and what came back to get the return as a percentage.",
    "Return on Ad Spend (ROAS) Calculator": "Enter ad spend and the sales it brought in to get the return on ad spend.",
    "Cost Per Acquisition (CPA) Calculator": "Enter ad spend and the number of customers won to get the cost of each new customer.",
    "Dimensional Weight Calculator": "Enter a parcel's dimensions to get the weight carriers charge for, which is often more than the scale weight.",
    "Free Shipping Threshold Calculator": "Find the order value above which you can offer free shipping without losing your margin.",
    "Inventory Reorder Point Calculator": "Enter sales per day and lead time to get the stock level at which to reorder, and how much.",
    "Safety Stock Calculator": "Work out how much extra stock covers a sales spike or a late delivery.",
    "Sales Velocity Calculator": "Enter units sold over a period to get sales per day, week and month for restocking.",
    "Promo Code Generator": "Make a batch of random, unique promo codes in the length and pattern you choose.",
    "Price Elasticity Calculator": "Enter two prices and the quantities sold at each to see how much demand moves when the price does.",
    "Bundle Profit Calculator": "Enter the items in a bundle and its price to see the profit compared with selling them one by one.",
    "Minimum Order Quantity (MOQ) Cost Calculator": "Enter a supplier's minimum order and unit price to get the total outlay and the cost per unit.",
    "Landed Cost Calculator": "Add the product cost, shipping, duties, insurance and fees to get what each unit really costs delivered.",
    "Break-Even Calculator": "Enter fixed costs, unit cost and price to get the number of sales that covers your costs.",
    "Wholesale Price Calculator": "Enter your cost and target margin to get a wholesale price that still leaves retailers room.",
    "SKU Generator": "Build consistent stock codes from a prefix and the attributes you choose, for a whole product list.",
    "Pay-Per-Click (PPC) Bid Calculator": "Enter price, margin and conversion rate to get the most you can bid per click and still profit.",
    "Advertising Cost of Sales (ACoS) Calculator": "Enter ad spend and ad sales to get ACoS, and the break-even ACoS for your margin.",
    "Total Advertising Cost of Sales (TACoS) Calculator": "Enter ad spend and total sales to see what share of all revenue goes on ads.",
    "Ad Spend Budget Planner": "Enter a revenue goal and target ROAS to get the ad budget that reaches it.",
    "Return Rate Calculator": "Enter orders and returns to get the return rate and what the returns cost.",
    "Customer Lifetime Value (CLV) Calculator": "Enter average order value, orders per year and years as a customer to get what a customer is worth.",
    "Time Zone Meeting Planner": "Pick cities and see the hours that overlap for a meeting.",
    "Mercari Fee Calculator": "Enter a sale price to get Mercari's fees and what you receive.",
    "Packaging Cost Calculator": "Add box, filler, tape and labels to get the packaging cost per unit.",
    "PayPal Fee Calculator": "Enter an amount to get PayPal's fee and the net you receive, for domestic and international payments.",
    "FBA Removal Order Cost Calculator": "Enter units and sizes to estimate what Amazon charges to return or dispose of your stock.",
    "Coupon ROI Calculator": "Enter the discount, the orders it brought and your margin to see whether a coupon paid for itself.",
    "Print on Demand Profit Calculator": "Enter base cost, platform fees, shipping and price to get the profit on each print-on-demand item.",
    "Etsy Fee Calculator": "Enter a sale price to get Etsy's listing, transaction and payment fees and the profit left.",
    "eBay Fee Calculator": "Enter a sale price to get eBay's final value and insertion fees and the profit left.",
    "Poshmark Fee Calculator": "Enter a sale price to get Poshmark's fee and what you receive.",
    "Customer Acquisition Cost (CAC) Calculator": "Enter marketing spend and new customers to get the cost of winning each one.",
    "Conversion Rate Calculator": "Enter visitors and orders to get the conversion rate.",
    "Average Order Value (AOV) Calculator": "Enter revenue and orders to get the average spent per order.",
    "Cart Abandonment Rate Calculator": "Enter carts started and orders completed to get the share of shoppers who left.",
    "A/B Test Duration Calculator": "Enter traffic, conversion rate and the lift you want to detect to get how long a test needs to run.",
    "Amazon Storage Fee Calculator": "Enter product size and months in storage to estimate Amazon's monthly storage fees, including peak season.",
    "Pallet Configuration Calculator": "Enter box and pallet sizes to get how many boxes fit per layer and per pallet.",
    "Lead Time Calculator": "Add production, transit and customs days to get the date stock arrives.",
    "Reorder Point Calculator": "Enter daily sales and lead time to get the stock level that triggers a reorder.",
    "Economic Order Quantity (EOQ) Calculator": "Enter demand, order cost and holding cost to get the order size that costs least overall.",
    "Days of Inventory Calculator": "Enter stock on hand and daily sales to get how many days the stock lasts.",
    "Inventory Turnover Calculator": "Enter cost of goods sold and average stock to get how many times a year stock turns over.",
    "Cost of Goods Sold (COGS) Calculator": "Add product, shipping and fulfilment costs to get the cost of the goods you sold.",
    "Gross Margin Calculator": "Enter cost and price to get the gross margin, the markup and the unit profit.",
    "Net Profit Calculator": "Enter revenue, product costs, ads, fees and overheads to get the profit that's left.",
    "Affiliate Commission Calculator": "Enter sales and the commission rate to get the payout and your net revenue.",
    "Dimension Converter": "Convert lengths between inches, centimetres and the other units carriers use.",
    "Universal Product Code (UPC) / European Article Number (EAN) Validator": "Paste a UPC or EAN and check that its check digit is right.",
    "Global Trade Item Number (GTIN) Converter": "Convert a product code between GTIN-8, 12, 13 and 14.",
    "Product Weight Converter": "Convert weights between grams, kilograms, ounces and pounds, and see which carrier tier they fall in.",
    "Cubic Feet Calculator": "Enter a shipment's dimensions to get its volume in cubic feet or cubic metres.",
    "Container Load Calculator": "Enter carton size to get how many fit in a 20-foot, 40-foot or high-cube container.",
    "Influencer Marketing ROI Calculator": "Enter what a campaign cost and the sales it brought to get its return.",
    "Email Marketing ROI Calculator": "Enter campaign cost, opens, clicks and orders to get the return on an email campaign.",
};

const getToolCategoryAndIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("fee")) return { category: "Fees", icon: CreditCard };
    if (lowerTitle.includes("converter")) return { category: "Converters", icon: ArrowLeftRight };
    if (lowerTitle.includes("generator")) return { category: "Generators", icon: Zap };
    if (lowerTitle.includes("planner")) return { category: "Planning", icon: Clock };
    if (lowerTitle.includes("weight") || lowerTitle.includes("dimension") || lowerTitle.includes("cubic") || lowerTitle.includes("pallet") || lowerTitle.includes("container")) return { category: "Shipping", icon: Box };
    return { category: "Calculators", icon: Calculator };
};

export default function ToolsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const reduceMotion = useReducedMotion();
    const allTools = useMemo(
        () =>
            toolsGroups.flatMap((group) =>
                group.items.map((item) => {
                    const { category, icon } = getToolCategoryAndIcon(item.title);
                    return { ...item, description: toolDescriptions[item.title] ?? `${item.title}: enter your numbers and read the result.`, category, icon };
                }),
            ),
        [],
    );
    const categories = useMemo(() => ["All", ...Array.from(new Set(allTools.map((t) => t.category))).sort()], [allTools]);
    const filteredTools = useMemo(
        () =>
            allTools.filter((tool) => {
                const q = searchQuery.toLowerCase();
                const matchesSearch = tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q);
                return matchesSearch && (activeCategory === "All" || tool.category === activeCategory);
            }),
        [allTools, searchQuery, activeCategory],
    );
    const linkBlue = "text-[#1f5ec2] dark:text-[#7aa7ff]";

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-24">
                <div className="max-w-[56rem]">
                    <p className={`text-base font-semibold ${linkBlue}`}>Free calculators</p>
                    <h1 className="mt-3 text-[2rem] md:text-[2.5rem] font-semibold tracking-tight text-slate-800 dark:text-white leading-[1.2]">
                        Free calculators for online sellers
                    </h1>
                    <p className="mt-5 text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-[1.65]">
                        Marketplace fees, profit margins, shipping, inventory and ad spend, worked out in your browser. No sign-up, and
                        nothing you type is stored.
                    </p>
                </div>

                <div className="sticky top-20 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur py-4 mt-10 mb-8 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                        <div className="relative w-full md:w-96">
                            <label htmlFor="tool-search" className="sr-only">Search the calculators</label>
                            <Search className="absolute inset-y-0 left-3 my-auto h-5 w-5 text-slate-600 dark:text-slate-300 pointer-events-none" aria-hidden="true" />
                            <input
                                id="tool-search"
                                type="search"
                                className="block w-full pl-10 pr-3 py-3 text-base border border-slate-300 rounded-xl bg-white text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#1f5ec2] focus:ring-2 focus:ring-[#1f5ec2]/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400"
                                placeholder="Search, for example profit or weight"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto" role="group" aria-label="Filter by type">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    aria-pressed={activeCategory === category}
                                    className={`whitespace-nowrap px-4 py-2 rounded-full text-base font-medium border transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5ec2] ${
                                        activeCategory === category
                                            ? "bg-[#1f5ec2] text-white border-[#1f5ec2]"
                                            : "bg-white text-slate-700 border-slate-300 hover:border-[#1f5ec2] dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <h2 className="text-[1.5rem] font-semibold tracking-tight text-slate-800 dark:text-white">
                    {activeCategory === "All" ? "All calculators" : activeCategory}
                    <span className="ml-2 font-normal text-slate-600 dark:text-slate-300">({filteredTools.length})</span>
                </h2>

                {filteredTools.length > 0 ? (
                    <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" aria-live="polite">
                        {filteredTools.map((tool) => {
                            const Icon = tool.icon;
                            return (
                                <li key={tool.title}>
                                    <Link
                                        href={tool.href}
                                        className={`group block h-full bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#2772ED]/50 ${reduceMotion ? "" : "transition-colors"} dark:bg-slate-900 dark:border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5ec2]`}
                                    >
                                        <div className="flex flex-col h-full">
                                            <div className="flex items-start justify-between mb-4">
                                                <span className="p-3 bg-[#2772ED]/10 rounded-xl text-[#1f5ec2] dark:bg-[#2772ED]/20 dark:text-[#7aa7ff]" aria-hidden="true">
                                                    <Icon className="w-6 h-6" />
                                                </span>
                                                <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">{tool.category}</span>
                                            </div>
                                            <h3 className={`text-lg font-semibold text-slate-800 dark:text-white group-hover:text-[#1f5ec2] dark:group-hover:text-[#7aa7ff] leading-snug`}>{tool.title}</h3>
                                            <p className="mt-2 flex-1 text-base text-slate-700 leading-[1.6] dark:text-slate-200">{tool.description}</p>
                                            <span className={`mt-5 inline-flex items-center text-base font-semibold ${linkBlue}`}>
                                                Open
                                                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="mt-10 text-base text-slate-700 dark:text-slate-200" aria-live="polite">
                        <p>Nothing matches that search. Try a shorter word, such as fee, margin or weight, or clear the filter.</p>
                    </div>
                )}

                <p className="mt-16 text-base text-slate-700 dark:text-slate-200 max-w-[56rem] leading-[1.65]">
                    These calculators are a side project of Web Scraper Pro, a free Chrome extension that turns web pages into
                    spreadsheets. For the prices, listings and reviews behind the numbers, see{" "}
                    <Link href="/use-cases/ecommerce" className={`${linkBlue} underline underline-offset-2`}>
                        how sellers track competitor prices
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
