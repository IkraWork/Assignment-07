import { toNumber } from "@/lib/format";

const BASES = [
  process.env.API_BASE_URL_1 || "https://api.api-store.workers.dev/api/bazardor",
  process.env.API_BASE_URL_2 || "https://api.abcz.workers.dev/api/bazardor",
];

const UNIT_LABELS = {
  kg: "কেজি",
  kilogram: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
  hali: "হালি",
};

function pick(obj, keys, fallback) {
  if (!obj || typeof obj !== "object") return fallback;
  for (const key of keys) {
    const v = obj[key];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return fallback;
}

function asText(v) {
  if (v === undefined || v === null) return "";
  if (typeof v === "object") return String(pick(v, ["name", "nameBn", "title", "label", "slug", "id"], ""));
  return String(v);
}

function unwrapList(json, keys) {
  if (Array.isArray(json)) return json;
  for (const key of [...keys, "data", "items", "results"]) {
    const v = json?.[key];
    if (Array.isArray(v)) return v;
    if (v && typeof v === "object") {
      const inner = unwrapList(v, keys);
      if (inner.length) return inner;
    }
  }
  return [];
}

function unwrapOne(json, keys) {
  if (!json || typeof json !== "object" || Array.isArray(json)) return json;
  for (const key of [...keys, "data", "result"]) {
    const v = json[key];
    if (v && typeof v === "object" && !Array.isArray(v)) return v;
  }
  return json;
}

export function unitLabel(unit) {
  const raw = asText(unit).trim();
  if (!raw) return "";
  if (raw.startsWith("প্রতি")) return raw;
  const mapped = UNIT_LABELS[raw.toLowerCase().replace(/^per[\s_-]*/, "")];
  return `প্রতি ${mapped || raw}`;
}

function readChange(obj, price) {
  let c = pick(
    obj,
    ["changePercent", "change_percent", "percentChange", "percent_change", "changePct", "change", "percent", "priceChange"],
    undefined
  );
  if (c && typeof c === "object") c = pick(c, ["percent", "percentage", "value", "pct"], 0);
  let n;
  if (c === undefined) {
    const prev = toNumber(pick(obj, ["previousPrice", "prevPrice", "yesterdayPrice", "oldPrice", "previous"], 0));
    n = prev > 0 ? ((price - prev) / prev) * 100 : 0;
  } else {
    n = toNumber(c);
  }
  const dir = String(pick(obj, ["trend", "direction", "status", "arrow"], "")).toLowerCase();
  if (n > 0 && /down|fall|decreas|drop|▼|কম/.test(dir)) n = -n;
  if (n < 0 && /up|rise|increas|▲|বেড়/.test(dir)) n = -n;
  return Math.round(n * 10) / 10;
}

function readMarkets(raw) {
  let list = pick(raw, ["markets", "bazars", "bazaars", "marketPrices", "market_prices", "vendors", "prices"], []);
  if (list && !Array.isArray(list) && typeof list === "object") {
    list = Object.entries(list).map(([name, value]) =>
      value && typeof value === "object" ? { name, ...value } : { name, price: value }
    );
  }
  if (!Array.isArray(list)) return [];
  return list
    .map((m, i) => {
      const price = toNumber(pick(m, ["price", "amount", "value", "todayPrice", "today"], 0));
      return {
        name: asText(pick(m, ["name", "market", "bazar", "bazaar", "location", "title", "area"], `বাজার ${i + 1}`)),
        price,
        change: readChange(m, price),
      };
    })
    .filter((m) => m.price > 0);
}

export function normalizeProduct(raw) {
  if (!raw || typeof raw !== "object") return null;
  const markets = readMarkets(raw);
  const sources = [raw, raw.stats, raw.priceSummary, raw.priceRange, raw.summary].filter(
    (s) => s && typeof s === "object"
  );
  const find = (keys) => {
    for (const s of sources) {
      const v = pick(s, keys, undefined);
      if (v !== undefined && typeof v !== "object") return toNumber(v);
    }
    return undefined;
  };
  const marketPrices = markets.map((m) => m.price);
  let price = find(["price", "todayPrice", "currentPrice", "avgPrice", "averagePrice", "average", "today"]);
  if (price === undefined) {
    price = marketPrices.length ? marketPrices.reduce((a, b) => a + b, 0) / marketPrices.length : 0;
  }
  const min = find(["minPrice", "min_price", "min", "lowest", "lowPrice"]) ?? (marketPrices.length ? Math.min(...marketPrices) : price);
  const max = find(["maxPrice", "max_price", "max", "highest", "highPrice"]) ?? (marketPrices.length ? Math.max(...marketPrices) : price);
  const avg =
    find(["avgPrice", "avg_price", "averagePrice", "average", "avg"]) ??
    (marketPrices.length ? marketPrices.reduce((a, b) => a + b, 0) / marketPrices.length : price);

  const id = asText(pick(raw, ["id", "slug", "_id", "productId"], ""));
  const rawTags = pick(raw, ["categories", "tags", "category", "categorySlug", "category_slug", "categoryId"], []);
  const tags = (Array.isArray(rawTags) ? rawTags : [rawTags]).map(asText).filter(Boolean);

  return {
    id,
    slug: asText(pick(raw, ["slug"], id)),
    name: asText(pick(raw, ["name", "nameBn", "name_bn", "title", "bnName"], "")),
    emoji: asText(pick(raw, ["emoji", "icon", "image", "thumbnail"], "🛒")),
    unit: unitLabel(pick(raw, ["unit", "unitBn", "unit_bn", "per"], "")),
    description: asText(pick(raw, ["description", "summary", "subtitle", "desc", "note"], "")),
    tags,
    price,
    min,
    max,
    avg,
    change: readChange(raw, price),
    markets,
  };
}

export function normalizeCategory(raw) {
  if (!raw) return null;
  if (typeof raw === "string") return { slug: raw, name: raw, emoji: "🛒" };
  const slug = asText(pick(raw, ["slug", "id", "key", "value", "_id"], ""));
  return {
    slug,
    name: asText(pick(raw, ["name", "nameBn", "name_bn", "title", "label", "bn"], slug)),
    emoji: asText(pick(raw, ["emoji", "icon"], "🛒")),
    description: asText(pick(raw, ["description", "subtitle"], "")),
  };
}

async function request(path) {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (res.status === 404) return { notFound: true };
      if (!res.ok) continue;
      return { json: await res.json() };
    } catch {
      continue;
    }
  }
  return { error: true };
}

export async function getProducts(category) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const res = await request(`/products${query}`);
  if (res.json === undefined) return { products: [], error: Boolean(res.error), notFound: Boolean(res.notFound) };
  const products = unwrapList(res.json, ["products"]).map(normalizeProduct).filter((p) => p && p.id && p.name);
  return { products, error: false, notFound: false };
}

export async function getProduct(id) {
  const res = await request(`/products/${encodeURIComponent(id)}`);
  if (res.json === undefined) return { product: null, error: Boolean(res.error) };
  const product = normalizeProduct(unwrapOne(res.json, ["product"]));
  if (!product || !product.name) return { product: null, error: false };
  return { product, error: false };
}

export async function getCategories() {
  const res = await request("/categories");
  if (res.json === undefined) return [];
  return unwrapList(res.json, ["categories"]).map(normalizeCategory).filter((c) => c && c.slug);
}

export async function getCategory(slug) {
  const list = await getCategories();
  const found = list.find((c) => c.slug === slug);
  if (found) return found;
  const res = await request(`/categories/${encodeURIComponent(slug)}`);
  if (res.json === undefined) return null;
  const category = normalizeCategory(unwrapOne(res.json, ["category"]));
  return category && category.slug ? category : null;
}
