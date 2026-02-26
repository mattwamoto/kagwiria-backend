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

function validateDocumentary(data: Record<string, unknown>) {
  const trailerUrl = typeof data.trailerYoutubeUrl === 'string' ? data.trailerYoutubeUrl.trim() : '';
  const trailerId = typeof data.trailerYoutubeVideoId === 'string' ? data.trailerYoutubeVideoId.trim() : '';

  if (trailerId && !YOUTUBE_ID_RE.test(trailerId)) {
    throw new Error('trailerYoutubeVideoId must be a valid 11-character YouTube ID');
  }

  if (trailerUrl) {
    const extracted = extractYouTubeId(trailerUrl);
    if (!extracted) {
      throw new Error('trailerYoutubeUrl must be a valid YouTube link');
    }

    if (!trailerId) {
      data.trailerYoutubeVideoId = extracted;
    }
  }
}

export default {
  beforeCreate(event: { params: { data: Record<string, unknown> } }) {
    validateDocumentary(event.params.data);
  },
  beforeUpdate(event: { params: { data: Record<string, unknown> } }) {
    validateDocumentary(event.params.data);
  },
};
