const FONT_PATH_PATTERN = /\/fonts\/([^/]+)\//;

export function resolveOpenFreeMapGlyphsUrl(url: string): string {
  const match = FONT_PATH_PATTERN.exec(url);

  if (!match) return url;

  let fontStack: string;

  try {
    fontStack = decodeURIComponent(match[1]);
  } catch {
    fontStack = match[1];
  }

  const replacement = /bold/i.test(fontStack) ? 'Noto Sans Bold' : 'Noto Sans Regular';

  if (fontStack === replacement) return url;

  return url.replace(FONT_PATH_PATTERN, `/fonts/${encodeURIComponent(replacement)}/`);
}
