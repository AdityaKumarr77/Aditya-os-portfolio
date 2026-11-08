/**
 * Card previews use the generated WebP thumbnails; the original JPEG is kept
 * for full-size previews in the modal.
 */
export function thumbnailSrc(src: string): string {
  return /\.jpe?g$/i.test(src) ? src.replace(/\.jpe?g$/i, ".webp") : src;
}
