export interface TeraboxFile {
  file_name: string;
  download_link: string;
  file_size: string;
  proxy_url: string;
  thumbnail?: string;
  fetchedAt?: string;
  size_bytes?: number; // Added for tracking actual size
  mime_type?: string; // Added for setting proper media types
}
