export type BlogPostType = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  img?: string; // Base64 image for upload
  fileId?: string; // CDN file ID for deletion
  publishedDate: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
};
