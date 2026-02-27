const BACKEND_URL = process.env.CMS_API_URL || process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const PROVIDERS = new Set(["stripe", "mpesa", "crm"]);
const SIGNATURE_HEADERS = ["stripe-signature", "x-mpesa-signature", "x-crm-signature"];

function readJson(text) {
  try {
    return JSON.parse(text);
  } catch (_) {
    return { message: text };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const provider = String(req.query.provider || "").toLowerCase();
  if (!PROVIDERS.has(provider)) {
    return res.status(400).json({ error: "Unsupported provider" });
  }

  const headers = {
    "Content-Type": "application/json",
  };

  for (const headerName of SIGNATURE_HEADERS) {
    const value = req.headers[headerName];
    if (typeof value === "string" && value.trim()) {
      headers[headerName] = value;
    }
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/webhooks/${provider}`, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body || {}),
    });

    const text = await response.text();
    return res.status(response.status).json(readJson(text));
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to forward webhook" });
  }
}
