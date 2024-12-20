/**
 * Formats text for barcode generation by removing special characters
 * and ensuring proper encoding compatibility
 */
export function formatBarcodeText(text: string): string {
  return text
    .replace(/[\n\r]/g, ' ') // Replace newlines with spaces
    .replace(/[^\x20-\x7E]/g, '') // Remove non-ASCII characters
    .trim()
    .substring(0, 50); // Limit length to ensure reliable barcode generation
}