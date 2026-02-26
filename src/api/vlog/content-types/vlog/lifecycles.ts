const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/;

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.replace('/', '');
      return YOUTUBE_ID_RE.test(id) ? id : null;
    }

    if (parsed.hostname.endsWith('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v && YOUTUBE_ID_RE.test(v)) {
        return v;
      }

      const parts = parsed.pathname.split('/').filter(Boolean);
      const last = parts[parts.length - 1];
      if (last && YOUTUBE_ID_RE.test(last)) {
        return last;
      }
    }
  } catch (_) {
    return null;
  }

  return null;
}

function validateVlog(data: Record<string, unknown>) {
  const youtubeUrl = typeof data.youtubeUrl === 'string' ? data.youtubeUrl.trim() : '';
  const youtubeVideoId = typeof data.youtubeVideoId === 'string' ? data.youtubeVideoId.trim() : '';

  if (!youtubeUrl && !youtubeVideoId) {
    throw new Error('Either youtubeUrl or youtubeVideoId is required');
  }

  if (youtubeVideoId && !YOUTUBE_ID_RE.test(youtubeVideoId)) {
    throw new Error('youtubeVideoId must be a valid 11-character YouTube ID');
  }

  if (youtubeUrl) {
    const extracted = extractYouTubeId(youtubeUrl);
    if (!extracted) {
      throw new Error('youtubeUrl must be a valid YouTube link');
    }

    if (!youtubeVideoId) {
      data.youtubeVideoId = extracted;
    }
  }
}

export default {
  beforeCreate(event: { params: { data: Record<string, unknown> } }) {
    validateVlog(event.params.data);
  },
  beforeUpdate(event: { params: { data: Record<string, unknown> } }) {
    validateVlog(event.params.data);
  },
};
