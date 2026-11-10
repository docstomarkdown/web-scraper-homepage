"use client";
import { useState, useMemo, useEffect, type ChangeEvent, type ElementType } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Clock, Plus, Trash2, Calendar as CalendarIcon, Search, Check, Sun, Moon, MapPin, Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils";
import { CalculatorCardHeader, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"
// --- Constants ---
// Each country maps to one representative IANA timezone
const COUNTRY_LIST: { name: string; flag: string; code: string; timezone: string; isPriority?: boolean }[] = [
    // Priority countries (E-commerce hubs)
    { name: "United States", flag: "🇺🇸", code: "us", timezone: "America/New_York", isPriority: true },
    { name: "United Kingdom", flag: "🇬🇧", code: "gb", timezone: "Europe/London", isPriority: true },
    { name: "Germany", flag: "🇩🇪", code: "de", timezone: "Europe/Berlin", isPriority: true },
    { name: "China", flag: "🇨🇳", code: "cn", timezone: "Asia/Shanghai", isPriority: true },
    { name: "India", flag: "🇮🇳", code: "in", timezone: "Asia/Kolkata", isPriority: true },
    { name: "United Arab Emirates", flag: "🇦🇪", code: "ae", timezone: "Asia/Dubai", isPriority: true },
    { name: "Australia", flag: "🇦🇺", code: "au", timezone: "Australia/Sydney", isPriority: true },
    { name: "Singapore", flag: "🇸🇬", code: "sg", timezone: "Asia/Singapore", isPriority: true },
    { name: "Japan", flag: "🇯🇵", code: "jp", timezone: "Asia/Tokyo", isPriority: true },
    { name: "Canada", flag: "🇨🇦", code: "ca", timezone: "America/Toronto", isPriority: true },
    // Expanded Database (A-Z)
    { name: "Afghanistan", flag: "🇦🇫", code: "af", timezone: "Asia/Kabul" },
    { name: "Albania", flag: "🇦🇱", code: "al", timezone: "Europe/Tirane" },
    { name: "Algeria", flag: "🇩🇿", code: "dz", timezone: "Africa/Algiers" },
    { name: "Argentina", flag: "🇦🇷", code: "ar", timezone: "America/Argentina/Buenos_Aires" },
    { name: "Armenia", flag: "🇦🇲", code: "am", timezone: "Asia/Yerevan" },
    { name: "Austria", flag: "🇦🇹", code: "at", timezone: "Europe/Vienna" },
    { name: "Azerbaijan", flag: "🇦🇿", code: "az", timezone: "Asia/Baku" },
    { name: "Bangladesh", flag: "🇧🇩", code: "bd", timezone: "Asia/Dhaka" },
    { name: "Belarus", flag: "🇧🇾", code: "by", timezone: "Europe/Minsk" },
    { name: "Belgium", flag: "🇧🇪", code: "be", timezone: "Europe/Brussels" },
    { name: "Bhutan", flag: "🇧🇹", code: "bt", timezone: "Asia/Thimphu" },
    { name: "Bolivia", flag: "🇧🇴", code: "bo", timezone: "America/La_Paz" },
    { name: "Brazil", flag: "🇧🇷", code: "br", timezone: "America/Sao_Paulo" },
    { name: "Bulgaria", flag: "🇧🇬", code: "bg", timezone: "Europe/Sofia" },
    { name: "Cambodia", flag: "🇰🇭", code: "kh", timezone: "Asia/Phnom_Penh" },
    { name: "Chile", flag: "🇨🇱", code: "cl", timezone: "America/Santiago" },
    { name: "Colombia", flag: "🇨🇴", code: "co", timezone: "America/Bogota" },
    { name: "Costa Rica", flag: "🇨🇷", code: "cr", timezone: "America/Costa_Rica" },
    { name: "Croatia", flag: "🇭🇷", code: "hr", timezone: "Europe/Zagreb" },
    { name: "Czech Republic", flag: "🇨🇿", code: "cz", timezone: "Europe/Prague" },
    { name: "Denmark", flag: "🇩🇰", code: "dk", timezone: "Europe/Copenhagen" },
    { name: "Ecuador", flag: "🇪🇨", code: "ec", timezone: "America/Guayaquil" },
    { name: "Egypt", flag: "🇪🇬", code: "eg", timezone: "Africa/Cairo" },
    { name: "Estonia", flag: "🇪🇪", code: "ee", timezone: "Europe/Tallinn" },
    { name: "Ethiopia", flag: "🇪🇹", code: "et", timezone: "Africa/Addis_Ababa" },
    { name: "Finland", flag: "🇫🇮", code: "fi", timezone: "Europe/Helsinki" },
    { name: "France", flag: "🇫🇷", code: "fr", timezone: "Europe/Paris" },
    { name: "Georgia", flag: "🇬🇪", code: "ge", timezone: "Asia/Tbilisi" },
    { name: "Ghana", flag: "🇬🇭", code: "gh", timezone: "Africa/Accra" },
    { name: "Greece", flag: "🇬🇷", code: "gr", timezone: "Europe/Athens" },
    { name: "Guatemala", flag: "🇬🇹", code: "gt", timezone: "America/Guatemala" },
    { name: "Hong Kong", flag: "🇭🇰", code: "hk", timezone: "Asia/Hong_Kong" },
    { name: "Hungary", flag: "🇭🇺", code: "hu", timezone: "Europe/Budapest" },
    { name: "Iceland", flag: "🇮🇸", code: "is", timezone: "Atlantic/Reykjavik" },
    { name: "Indonesia", flag: "🇮🇩", code: "id", timezone: "Asia/Jakarta" },
    { name: "Iran", flag: "🇮🇷", code: "ir", timezone: "Asia/Tehran" },
    { name: "Iraq", flag: "🇮🇶", code: "iq", timezone: "Asia/Baghdad" },
    { name: "Ireland", flag: "🇮🇪", code: "ie", timezone: "Europe/Dublin" },
    { name: "Israel", flag: "🇮🇱", code: "il", timezone: "Asia/Jerusalem" },
    { name: "Italy", flag: "🇮🇹", code: "it", timezone: "Europe/Rome" },
    { name: "Jamaica", flag: "🇮🇲", code: "jm", timezone: "America/Jamaica" },
    { name: "Jordan", flag: "🇯🇴", code: "jo", timezone: "Asia/Amman" },
    { name: "Kazakhstan", flag: "🇰🇿", code: "kz", timezone: "Asia/Almaty" },
    { name: "Kenya", flag: "🇰🇪", code: "ke", timezone: "Africa/Nairobi" },
    { name: "Kuwait", flag: "🇰🇼", code: "kw", timezone: "Asia/Kuwait" },
    { name: "Lebanon", flag: "🇱🇧", code: "lb", timezone: "Asia/Beirut" },
    { name: "Lithuania", flag: "🇱🇹", code: "lt", timezone: "Europe/Vilnius" },
    { name: "Luxembourg", flag: "🇱🇺", code: "lu", timezone: "Europe/Luxembourg" },
    { name: "Malaysia", flag: "🇲🇾", code: "my", timezone: "Asia/Kuala_Lumpur" },
    { name: "Maldives", flag: "🇲🇻", code: "mv", timezone: "Indian/Maldives" },
    { name: "Mexico", flag: "🇲🇽", code: "mx", timezone: "America/Mexico_City" },
    { name: "Morocco", flag: "🇲🇦", code: "ma", timezone: "Africa/Casablanca" },
    { name: "Myanmar", flag: "🇲🇲", code: "mm", timezone: "Asia/Yangon" },
    { name: "Nepal", flag: "🇳🇵", code: "np", timezone: "Asia/Kathmandu" },
    { name: "Netherlands", flag: "🇳🇱", code: "nl", timezone: "Europe/Amsterdam" },
    { name: "New Zealand", flag: "🇳🇿", code: "nz", timezone: "Pacific/Auckland" },
    { name: "Nigeria", flag: "🇳🇬", code: "ng", timezone: "Africa/Lagos" },
    { name: "Norway", flag: "🇳🇴", code: "no", timezone: "Europe/Oslo" },
    { name: "Oman", flag: "🇴🇲", code: "om", timezone: "Asia/Muscat" },
    { name: "Pakistan", flag: "🇵🇰", code: "pk", timezone: "Asia/Karachi" },
    { name: "Panama", flag: "🇵🇦", code: "pa", timezone: "America/Panama" },
    { name: "Peru", flag: "🇵🇪", code: "pe", timezone: "America/Lima" },
    { name: "Philippines", flag: "🇵🇭", code: "ph", timezone: "Asia/Manila" },
    { name: "Poland", flag: "🇵🇱", code: "pl", timezone: "Europe/Warsaw" },
    { name: "Portugal", flag: "🇵🇹", code: "pt", timezone: "Europe/Lisbon" },
    { name: "Qatar", flag: "🇶🇦", code: "qa", timezone: "Asia/Qatar" },
    { name: "Romania", flag: "🇷🇴", code: "ro", timezone: "Europe/Bucharest" },
    { name: "Russia", flag: "🇷🇺", code: "ru", timezone: "Europe/Moscow" },
    { name: "Saudi Arabia", flag: "🇸🇦", code: "sa", timezone: "Asia/Riyadh" },
    { name: "Serbia", flag: "🇷🇸", code: "rs", timezone: "Europe/Belgrade" },
    { name: "Slovakia", flag: "🇸🇰", code: "sk", timezone: "Europe/Bratislava" },
    { name: "Slovenia", flag: "🇸🇮", code: "si", timezone: "Europe/Ljubljana" },
    { name: "South Africa", flag: "🇿🇦", code: "za", timezone: "Africa/Johannesburg" },
    { name: "South Korea", flag: "🇰🇷", code: "kr", timezone: "Asia/Seoul" },
    { name: "Spain", flag: "🇪🇸", code: "es", timezone: "Europe/Madrid" },
    { name: "Sri Lanka", flag: "🇱🇰", code: "lk", timezone: "Asia/Colombo" },
    { name: "Sweden", flag: "🇸🇪", code: "se", timezone: "Europe/Stockholm" },
    { name: "Switzerland", flag: "🇨🇭", code: "ch", timezone: "Europe/Zurich" },
    { name: "Taiwan", flag: "🇹🇼", code: "tw", timezone: "Asia/Taipei" },
    { name: "Thailand", flag: "🇹🇭", code: "th", timezone: "Asia/Bangkok" },
    { name: "Turkey", flag: "🇹🇷", code: "tr", timezone: "Europe/Istanbul" },
    { name: "Ukraine", flag: "🇺🇦", code: "ua", timezone: "Europe/Kyiv" },
    { name: "Uruguay", flag: "🇺🇾", code: "uy", timezone: "America/Montevideo" },
    { name: "Uzbekistan", flag: "🇺🇿", code: "uz", timezone: "Asia/Tashkent" },
    { name: "Venezuela", flag: "🇻🇪", code: "ve", timezone: "America/Caracas" },
    { name: "Vietnam", flag: "🇻🇳", code: "vn", timezone: "Asia/Ho_Chi_Minh" },
];
// --- Types ---
type CountryInfo = {
    name: string;
    flag: string;
    code: string;
    timezone: string; // IANA timezone ID
    isPriority?: boolean;
    offset: number; // Offset in minutes at the meeting's date and time
    offsetStr: string; // e.g. "UTC+5:30"
    label: string; // Full label for search: "🇮🇳 India (UTC+5:30)"
};
const Flag = ({ code, className }: { code: string; className?: string }) => (
    <div className={cn("inline-flex items-center justify-center shrink-0 overflow-hidden rounded-[2px] shadow-sm ring-1 ring-slate-200/50", className)}>
        <img
            src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
            alt={code}
            className="w-full h-full object-cover"
        />
    </div>
);
// --- Helpers ---
// Offset (minutes) of an IANA time zone at a given instant, read from Intl so daylight saving follows the date.
export const offsetAt = (timeZone: string, instant: number): number => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(new Date(instant));
    const get = (t: string) => Number(parts.find(p => p.type === t)?.value);
    const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
    return Math.round((asUtc - Math.floor(instant / 1000) * 1000) / 60000);
};
// The UTC instant of a wall-clock date ("2026-03-10") and time ("09:00") in a time zone.
export const zonedToInstant = (date: string, time: string, timeZone: string): number => {
    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi] = time.split(":").map(Number);
    const guess = Date.UTC(y, mo - 1, d, h, mi);
    const first = guess - offsetAt(timeZone, guess) * 60000;
    const second = guess - offsetAt(timeZone, first) * 60000;
    return second;
};
// Local date ("YYYY-MM-DD") and minutes since midnight of an instant in a time zone.
export const localAt = (timeZone: string, instant: number) => {
    const local = new Date(instant + offsetAt(timeZone, instant) * 60000);
    return { date: local.toISOString().slice(0, 10), minutes: local.getUTCHours() * 60 + local.getUTCMinutes() };
};
const formatOffset = (offsetMinutes: number) => {
    const h = Math.floor(Math.abs(offsetMinutes) / 60);
    const m = Math.abs(offsetMinutes) % 60;
    const sign = offsetMinutes >= 0 ? "+" : "-";
    return `UTC${sign}${h}${m ? ":" + m : ""}`;
};
// Compute every country's offset at the meeting instant (selected date and time), not today.
const getCountries = (instant: number): CountryInfo[] => {
    return COUNTRY_LIST.map(c => {
        const offsetMinutes = offsetAt(c.timezone, instant);
        const offsetStr = formatOffset(offsetMinutes);
        return {
            name: c.name,
            flag: c.flag,
            code: c.code,
            timezone: c.timezone,
            isPriority: c.isPriority,
            offset: offsetMinutes,
            offsetStr,
            label: `${c.flag} ${c.name} (${offsetStr})`
        };
    });
};
const formatTime = (minutesSinceMidnight: number) => {
    let h = Math.floor(minutesSinceMidnight / 60) % 24;
    let m = Math.floor(minutesSinceMidnight % 60);
    if (h < 0) h += 24;
    const ampm = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 || 12;
    const displayM = m.toString().padStart(2, "0");
    return `${displayH}:${displayM} ${ampm}`;
};
const getTimeOfDayStatus = (hour: number) => {
    if (hour >= 9 && hour < 17) return { label: "Business Hours", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40", border: "border-blue-100 dark:border-blue-900/50", icon: Sun };
    if (hour >= 6 && hour < 9) return { label: "Morning", color: "text-amber-700 dark:text-amber-300", bg: "bg-amber-50 dark:bg-amber-950/40", border: "border-amber-100 dark:border-amber-900/50", icon: Sun };
    if (hour >= 17 && hour < 22) return { label: "Evening", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40", border: "border-blue-100 dark:border-blue-900/50", icon: Moon };
    return { label: "Off Hours", color: "text-slate-600 dark:text-slate-300", bg: "bg-slate-50 dark:bg-slate-800/60", border: "border-slate-200 dark:border-slate-800", icon: Moon };
};
export function TimeZonePlanner() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [baseTime, setBaseTime] = useState("09:00");
    // Find initial country from browser timezone
    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const initialCountry = COUNTRY_LIST.find(c => c.timezone === browserTz);
    const [baseTimezone, setBaseTimezone] = useState(initialCountry?.timezone || "Asia/Kolkata");
    const [compareTimezones, setCompareTimezones] = useState<string[]>(["Europe/London", "Asia/Tokyo", "America/New_York"]);
    const [activeCompareIndex, setActiveCompareIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    // The meeting as one instant: the selected date and start time in the base time zone.
    const meetingInstant = useMemo(() => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(selectedDate) || !/^\d{1,2}:\d{2}$/.test(baseTime)) return null;
        const instant = zonedToInstant(selectedDate, baseTime, baseTimezone);
        return Number.isFinite(instant) ? instant : null;
    }, [selectedDate, baseTime, baseTimezone]);
    // Computed after mount so the server render and the browser render match.
    const countries = useMemo(
        () => (isMounted ? getCountries(meetingInstant ?? Date.now()) : []),
        [isMounted, meetingInstant]
    );
    const baseCountry = useMemo(() => countries.find((c: CountryInfo) => c.timezone === baseTimezone), [countries, baseTimezone]);
    const calculateTargetTime = (targetTimezone: string) => {
        if (!baseCountry) return null;
        const targetCountry = countries.find((c: CountryInfo) => c.timezone === targetTimezone);
        if (!targetCountry) return null;
        if (meetingInstant === null) return null;
        // Convert the meeting instant into the target zone's wall clock for that date.
        const target = localAt(targetTimezone, meetingInstant);
        const normalizedMinutes = target.minutes;
        const dayOffset = Math.round((Date.parse(target.date) - Date.parse(selectedDate)) / 86400000);
        const targetHour = (Math.floor(normalizedMinutes / 60)) % 24;
        const status = getTimeOfDayStatus(targetHour);
        return {
            time: formatTime(normalizedMinutes),
            dayOffset,
            status,
            country: targetCountry
        };
    };
    const addCountry = (timezone: string) => {
        if (!compareTimezones.includes(timezone) && timezone !== baseTimezone) {
            setCompareTimezones((prev: string[]) => [...prev, timezone]);
        }
        setIsMenuOpen(false);
    };
    const removeCountry = (timezone: string) => {
        setCompareTimezones((prev: string[]) => prev.filter((tz: string) => tz !== timezone));
    };
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4">
            <div className="space-y-8">
                {/* Main Controls Card */}
                <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                    <CalculatorCardHeader
                        description="Enter your details."
                        onReset={() => { setBaseTime("09:00"); setCompareTimezones(["Europe/London", "Asia/Tokyo", "America/New_York"]); }}
                    />
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Date Picker */}
                            <div className="space-y-3">
                                <Label htmlFor="tz-date" className="text-sm font-bold text-slate-600 flex items-center gap-2 mb-2 px-1 dark:text-slate-300">
                                    <CalendarIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Selected Date
                                </Label>
                                <div className="relative group">
                                    <Input id="tz-date"
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
                                        onClick={(e) => e.currentTarget.showPicker?.()}
                                        className="h-14 bg-white border-slate-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-2xl font-bold text-slate-800 transition-all shadow-sm px-4 cursor-pointer dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <CalendarIcon className="h-4 w-4 text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors dark:group-hover:text-blue-400" />
                                    </div>
                                </div>
                            </div>
                            {/* Base Time */}
                            <div className="space-y-3">
                                <Label htmlFor="tz-time" className="text-sm font-bold text-slate-600 flex items-center gap-2 mb-2 px-1 dark:text-slate-300">
                                    <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" /> Start Time
                                </Label>
                                <div className="relative group">
                                    <Input id="tz-time"
                                        type="time"
                                        value={baseTime}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setBaseTime(e.target.value)}
                                        onClick={(e) => e.currentTarget.showPicker?.()}
                                        className="h-14 bg-white border-slate-200 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 rounded-2xl font-bold text-slate-800 transition-all shadow-sm px-4 cursor-pointer dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <Clock className="h-4 w-4 text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors dark:group-hover:text-blue-400" />
                                    </div>
                                </div>
                            </div>
                            {/* My Location - Country Dropdown */}
                            <div className="space-y-3">
                                <Label className="text-sm font-bold text-slate-600 flex items-center gap-2 mb-2 px-1 dark:text-slate-300">
                                    <MapPin className="h-4 w-4 text-blue-500 dark:text-blue-400" /> My Location
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            role={"combobox"}
                                            aria-label="Choose a country"
                                            className="w-full h-14 justify-between bg-white border-slate-200 hover:border-blue-400 hover:bg-white rounded-2xl px-4 font-bold text-slate-800 shadow-sm transition-all group focus:ring-4 focus:ring-blue-500/5 group dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-900 dark:text-slate-100"
                                        >
                                            <div className="flex items-center gap-3">
                                                {baseCountry && <Flag code={baseCountry.code} className="w-5 h-3.5 rounded-sm overflow-hidden" />}
                                                <span>{baseCountry ? baseCountry.name : "Select Country..."}</span>
                                            </div>
                                            <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-300 group-hover:text-blue-500 transition-colors dark:group-hover:text-blue-400" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[320px] p-0 shadow-2xl border-none">
                                        <Command className="border border-slate-200 dark:border-slate-800">
                                            <CommandInput placeholder="Search country..." className="h-12" />
                                            <CommandList>
                                                <CommandEmpty>No country found.</CommandEmpty>
                                                <CommandGroup heading="E-commerce Hubs">
                                                    {countries.filter((c: CountryInfo) => c.isPriority).map((country: CountryInfo) => (
                                                        <CommandItem
                                                            key={country.timezone}
                                                            value={country.label}
                                                            onSelect={() => setBaseTimezone(country.timezone)}
                                                            className="py-3 px-4 aria-selected:bg-blue-50 dark:aria-selected:bg-blue-950/40"
                                                        >
                                                            <Check className={cn("mr-2 h-4 w-4 text-blue-600 dark:text-blue-400", baseTimezone === country.timezone ? "opacity-100" : "opacity-0")} />
                                                            <div className="flex items-center gap-2">
                                                                <Flag code={country.code} className="w-5 h-3.5" />
                                                                <span className="font-bold text-slate-900 dark:text-white">{country.name}</span>
                                                            </div>
                                                            <span className="ml-auto text-xs text-slate-600 dark:text-slate-300 font-medium">{country.offsetStr}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                                <CommandGroup heading="All Countries">
                                                    {countries.filter((c: CountryInfo) => !c.isPriority).map((country: CountryInfo) => (
                                                        <CommandItem
                                                            key={country.timezone}
                                                            value={country.label}
                                                            onSelect={() => setBaseTimezone(country.timezone)}
                                                            className="py-3 px-4 aria-selected:bg-blue-50 dark:aria-selected:bg-blue-950/40"
                                                        >
                                                            <Check className={cn("mr-2 h-4 w-4 text-blue-600 dark:text-blue-400", baseTimezone === country.timezone ? "opacity-100" : "opacity-0")} />
                                                            <div className="flex items-center gap-2">
                                                                <Flag code={country.code} className="w-5 h-3.5" />
                                                                <span className="font-bold text-slate-900 dark:text-white">{country.name}</span>
                                                            </div>
                                                            <span className="ml-auto text-xs text-slate-600 dark:text-slate-300 font-medium">{country.offsetStr}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        {/* Add Country Search Bar */}
                        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 dark:border-slate-800">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium text-sm italic">
                                💡 Tip: Add your supplier or VA&apos;s country to check their local status.
                            </div>
                            <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                <PopoverTrigger asChild>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 px-10 h-14 rounded-2xl font-bold flex gap-3 transition-all hover:scale-[1.02] active:scale-95 border-b-4 border-blue-800/50">
                                        <Plus className="h-5 w-5" />
                                        <span>Add Country</span>
                                        <ChevronDown className="h-4 w-4 opacity-50 ml-1" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[320px] p-0 shadow-2xl border border-slate-100 dark:border-slate-800">
                                    <Command>
                                        <CommandInput placeholder="Search country..." className="h-12" />
                                        <CommandList className="max-h-[300px] overflow-y-auto">
                                            <CommandEmpty>No country found.</CommandEmpty>
                                            <CommandGroup heading="E-commerce Hubs">
                                                {countries.filter((c: CountryInfo) => c.isPriority && c.timezone !== baseTimezone && !compareTimezones.includes(c.timezone)).map((country: CountryInfo) => (
                                                    <CommandItem
                                                        key={country.timezone}
                                                        value={country.label}
                                                        onSelect={() => addCountry(country.timezone)}
                                                        className="py-3 px-4 aria-selected:bg-blue-50 cursor-pointer dark:aria-selected:bg-blue-950/40"
                                                    >
                                                        <Plus className="mr-2 h-4 w-4 text-slate-600 dark:text-slate-300" />
                                                        <div className="flex items-center gap-2">
                                                            <Flag code={country.code} className="w-5 h-3.5" />
                                                            <span className="font-bold text-slate-900 dark:text-white">{country.name}</span>
                                                        </div>
                                                        <span className="ml-auto text-xs text-slate-600 dark:text-slate-300 font-medium">{country.offsetStr}</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                            <CommandGroup heading="All Countries">
                                                {countries.filter((c: CountryInfo) => !c.isPriority && c.timezone !== baseTimezone && !compareTimezones.includes(c.timezone)).map((country: CountryInfo) => (
                                                    <CommandItem
                                                        key={country.timezone}
                                                        value={country.label}
                                                        onSelect={() => addCountry(country.timezone)}
                                                        className="py-3 px-4 aria-selected:bg-blue-50 cursor-pointer dark:aria-selected:bg-blue-950/40"
                                                    >
                                                        <Plus className="mr-2 h-4 w-4 text-slate-600 dark:text-slate-300" />
                                                        <div className="flex items-center gap-2">
                                                            <Flag code={country.code} className="w-5 h-3.5" />
                                                            <span className="font-bold text-slate-900 dark:text-white">{country.name}</span>
                                                        </div>
                                                        <span className="ml-auto text-xs text-slate-600 dark:text-slate-300 font-medium">{country.offsetStr}</span>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>
                {/* Attendee Grid */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 tracking-tight dark:text-slate-100">
                                Availability Dashboard
                            </h2>
                            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 tracking-widest">Global Status Tracking</p>
                        </div>
                        {compareTimezones.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCompareTimezones([])}
                                className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-red-500 border-slate-200 bg-white dark:hover:text-red-400 dark:border-slate-800 dark:bg-slate-900"
                            >
                                Reset View
                            </Button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {compareTimezones.map((tz: string) => {
                            const result = calculateTargetTime(tz);
                            if (!result) return null;
                            const StatusIcon = result.status.icon as ElementType;
                            return (
                                <FadeIn key={tz}>
                                    <ResultFeedbackCard
                                        variant="compact"
                                        hideChildrenBorder={true}
                                        title={
                                            <div className="flex items-center gap-2">
                                                <Flag code={result.country.code} className="w-5 h-3.5" />
                                                <span className="font-bold text-slate-900 dark:text-white">{result.country.name}</span>
                                            </div>
                                        }
                                        titleLabel={
                                            <>
                                                <StatusIcon className="h-3.5 w-3.5" />
                                                {result.status.label}
                                            </>
                                        }
                                        labelClassName={cn(
                                            "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black  tracking-wider",
                                            result.status.bg,
                                            result.status.color,
                                            "border",
                                            result.status.border
                                        )}
                                        className={cn(
                                            "group transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl relative overflow-hidden",
                                            result.status.label === "Business Hours" ? "bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50" :
                                                result.status.label === "Morning" ? "bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900/50" :
                                                    result.status.label === "Evening" ? "bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50" :
                                                        "bg-slate-50 border-slate-200 dark:bg-slate-800/60 dark:border-slate-800"
                                        )}
                                        mainValue={
                                            <div className="space-y-8">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-black tracking-tighter text-4xl text-slate-900 dark:text-white">{result.time}</span>
                                                    {result.dayOffset !== 0 && (
                                                        <span className={cn("text-xs font-black px-2 py-0.5 rounded-lg align-middle ml-2 shadow-sm border",
                                                            result.dayOffset > 0 ? "bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400 dark:border-amber-900/50" : "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-900/50"
                                                        )}>
                                                            {result.dayOffset > 0 ? "+1 DAY" : "-1 DAY"}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center justify-between pt-4 opacity-60">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                                                        <Globe className="h-3.5 w-3.5 opacity-40 text-blue-500 dark:text-blue-400" />
                                                        <span className=" tracking-widest truncate max-w-[120px]">{result.country.timezone}</span>
                                                    </div>
                                                    <div className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 font-black text-slate-600 text-xs shadow-sm tracking-tighter dark:bg-slate-800/60 dark:border-slate-800 dark:text-slate-300">
                                                        {result.country.offsetStr}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <button
                                            onClick={() => removeCountry(tz)}
                                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all p-2 bg-white/90 hover:bg-red-500 hover:text-white shadow-md rounded-xl text-slate-600 dark:text-slate-300 z-20 hover:scale-110 active:scale-90 dark:bg-slate-900/90"
                                            title="Remove this country"
                                            aria-label="Remove this country"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </ResultFeedbackCard>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
