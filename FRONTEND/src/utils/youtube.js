/**
 * Validates a YouTube URL and extracts the 11-character Video ID.
 *
 * Supported formats:
 * 1. https://www.youtube.com/watch?v=VIDEO_ID
 * 2. https://youtu.be/VIDEO_ID
 * 3. https://www.youtube.com/shorts/VIDEO_ID
 * 4. https://www.youtube.com/embed/VIDEO_ID
 *
 * Correctly handles query parameters like ?t=10, ?feature=shared, ?si=xxxxx, &list=xxxxx
 *
 * @param {string} url - YouTube URL to parse
 * @returns {string|null} 11-character video ID if valid, null otherwise
 */
export const extractVideoId = (url) => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    return null;
  }

  try {
    // Ensure URL has protocol for uniform URL parsing
    const urlToParse = /^https?:\/\//i.test(trimmedUrl)
      ? trimmedUrl
      : `https://${trimmedUrl}`;

    const parsedUrl = new URL(urlToParse);
    const hostname = parsedUrl.hostname.toLowerCase();

    // Validate YouTube domain
    const validDomains = [
      'youtube.com',
      'www.youtube.com',
      'm.youtube.com',
      'music.youtube.com',
      'youtu.be',
      'www.youtu.be',
    ];

    if (!validDomains.includes(hostname)) {
      return null;
    }

    let candidateId = null;

    if (hostname === 'youtu.be' || hostname === 'www.youtu.be') {
      // Short URL format: https://youtu.be/VIDEO_ID
      const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
      candidateId = pathParts[0] || null;
    } else {
      // Standard youtube.com formats
      if (parsedUrl.searchParams.has('v')) {
        // Watch URL: https://www.youtube.com/watch?v=VIDEO_ID
        candidateId = parsedUrl.searchParams.get('v');
      } else {
        const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
        // Shorts, Embed, or v URLs: https://www.youtube.com/shorts/VIDEO_ID
        if (pathParts.length >= 2 && ['shorts', 'embed', 'v'].includes(pathParts[0].toLowerCase())) {
          candidateId = pathParts[1];
        }
      }
    }

    // YouTube video IDs are exactly 11 characters consisting of alphanumeric, underscore, or hyphen
    if (candidateId && /^[a-zA-Z0-9_-]{11}$/.test(candidateId)) {
      return candidateId;
    }

    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Checks whether a given string is a valid YouTube URL.
 *
 * @param {string} url
 * @returns {boolean}
 */
export const isValidYouTubeUrl = (url) => {
  return extractVideoId(url) !== null;
};
