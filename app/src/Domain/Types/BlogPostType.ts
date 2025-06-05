export type BlogPostType = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  publishedDate: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
};
