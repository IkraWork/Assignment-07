const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export function toNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (value === null || value === undefined) return 0;
  const text = String(value)
    .replace(/[০-৯]/g, (d) => BN_DIGITS.indexOf(d))
    .replace(/,/g, "");
  const match = text.match(/\d+(\.\d+)?/);
  if (!match) return 0;
  const n = parseFloat(match[0]);
  if (/▼|↓/.test(text) || /(^|\s|\()-\s*\d/.test(text)) return -n;
  return n;
}

const numberFormat = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 });
const percentFormat = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function bnNumber(n) {
  return numberFormat.format(n);
}

export function formatTaka(n) {
  return `${numberFormat.format(n)} টাকা`;
}

export function formatPercent(n) {
  return `${percentFormat.format(Math.abs(n))}%`;
}

export function bnDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
