import { CMS_URL } from "/lib/cms";

const YT_ID_RE = /^[A-Za-z0-9_-]{11}$/;

export const fallbackImages = [
  "/img/kagwiria/hero/hero-1.jpeg",
  "/img/kagwiria/hero/hero-2.jpeg",
  "/img/kagwiria/hero/hero-3.jpeg",
  "/img/kagwiria/hero/hero-4.jpeg",
];

function absoluteCmsUrl(url) {
  if (!url || typeof url !== "string") {
    return null;
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("/")) {
    return `${CMS_URL}${url}`;
  }
  return `${CMS_URL}/${url}`;
}

export function getMediaUrl(media) {
  if (!media) {
    return null;
  }

  const url =
    media?.url ||
    media?.data?.url ||
    media?.attributes?.url ||
    media?.data?.attributes?.url ||
    media?.formats?.large?.url ||
    media?.formats?.medium?.url ||
    media?.formats?.small?.url ||
    media?.formats?.thumbnail?.url ||
    media?.data?.attributes?.formats?.large?.url ||
    media?.data?.attributes?.formats?.medium?.url ||
    media?.data?.attributes?.formats?.small?.url ||
    media?.data?.attributes?.formats?.thumbnail?.url;

  return absoluteCmsUrl(url);
}

export function getYoutubeId(value) {
  if (!value || typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (YT_ID_RE.test(trimmed)) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      return YT_ID_RE.test(id) ? id : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const queryId = parsed.searchParams.get("v");
      if (queryId && YT_ID_RE.test(queryId)) {
        return queryId;
      }

      const parts = parsed.pathname.split("/").filter(Boolean);
      const maybeId = parts[parts.length - 1];
      return YT_ID_RE.test(maybeId) ? maybeId : null;
    }
  } catch (_) {
    return null;
  }

  return null;
}

export function youtubeThumb(videoId) {
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

export function pickFallbackImage(index = 0) {
  return fallbackImages[index % fallbackImages.length];
}
