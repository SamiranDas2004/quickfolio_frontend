export function ensureHttps(url: string | undefined): string {
  if (!url) return '';
  
  // If already has protocol, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Add https:// prefix
  return `https://${url}`;
}
