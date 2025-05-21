/**
 * Utility function to get MIME type from file extension
 */
export function getMimeType(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase() || "";

  // Handle video types
  if (["mp4", "m4v"].includes(extension)) return "video/mp4";
  if (extension === "webm") return "video/webm";
  if (extension === "mov") return "video/quicktime";
  if (extension === "mkv") return "video/x-matroska";

  // Handle audio types
  if (extension === "mp3") return "audio/mpeg";
  if (extension === "wav") return "audio/wav";
  if (extension === "ogg") return "audio/ogg";
  if (extension === "aac") return "audio/aac";

  // Handle image types
  if (["jpg", "jpeg"].includes(extension)) return "image/jpeg";
  if (extension === "png") return "image/png";
  if (extension === "gif") return "image/gif";
  if (extension === "webp") return "image/webp";
  if (extension === "svg") return "image/svg+xml";

  // Handle document types
  if (extension === "pdf") return "application/pdf";
  if (["doc", "docx"].includes(extension)) return "application/msword";
  if (["xls", "xlsx"].includes(extension)) return "application/vnd.ms-excel";
  if (["ppt", "pptx"].includes(extension))
    return "application/vnd.ms-powerpoint";
  if (extension === "txt") return "text/plain";

  // Handle archive types
  if (extension === "zip") return "application/zip";
  if (extension === "rar") return "application/x-rar-compressed";

  // Default fallback
  return "application/octet-stream";
}
