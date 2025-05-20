export function formatFileSize(sizeStr: string): string {
  // Some APIs return already formatted strings (e.g., "112.59 MB")
  // We'll attempt to parse this and format it consistently
  
  // If it's already a formatted string with a unit
  if (typeof sizeStr === 'string' && sizeStr.includes(' ')) {
    return sizeStr; // Return as is
  }
  
  // Try to parse the size as a number (bytes)
  const size = parseFloat(sizeStr);
  
  if (isNaN(size)) {
    return sizeStr; // If parsing fails, return original string
  }
  
  // Format the size
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;
  const TB = GB * 1024;
  
  if (size < KB) {
    return `${size} B`;
  } else if (size < MB) {
    return `${(size / KB).toFixed(2)} KB`;
  } else if (size < GB) {
    return `${(size / MB).toFixed(2)} MB`;
  } else if (size < TB) {
    return `${(size / GB).toFixed(2)} GB`;
  } else {
    return `${(size / TB).toFixed(2)} TB`;
  }
}