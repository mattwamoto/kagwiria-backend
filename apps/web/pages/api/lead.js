import { proxyToBackend } from "/lib/backend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await proxyToBackend("/api/lead", req.body);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to submit lead" });
  }
}
