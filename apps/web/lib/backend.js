const BACKEND_URL = process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

export async function proxyToBackend(path, payload) {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  });

  const text = await response.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch (_) {
    data = { message: text };
  }

  return { status: response.status, ok: response.ok, data };
}
