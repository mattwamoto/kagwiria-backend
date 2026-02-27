const CMS_URL = process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const CMS_TOKEN = process.env.CMS_API_TOKEN;

function withBase(path) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${CMS_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeEntry(entry) {
  if (!entry) return null;
  if (entry.attributes && typeof entry.attributes === "object") {
    return { id: entry.id, ...entry.attributes };
  }
  return entry;
}

function normalizeData(payload) {
  const raw = payload?.data;
  if (Array.isArray(raw)) {
    return raw.map(normalizeEntry);
  }
  return normalizeEntry(raw);
}

export async function fetchCms(path) {
  const url = withBase(path);
  const headers = {};

  if (CMS_TOKEN) {
    headers.Authorization = `Bearer ${CMS_TOKEN}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`CMS request failed (${response.status}) ${path}: ${body}`);
  }

  const payload = await response.json();
  return normalizeData(payload);
}

export async function safeCms(path, fallback) {
  try {
    return await fetchCms(path);
  } catch (_) {
    return fallback;
  }
}

export { CMS_URL };
