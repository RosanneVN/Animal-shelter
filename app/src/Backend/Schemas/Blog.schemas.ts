import { z } from "zod";

export const BlogPostSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  content: z.string().min(1, "El contenido es requerido"),
  excerpt: z.string().min(1, "El extracto es requerido"),
  imageUrl: z.string().optional(),
  img: z.string().optional(), // Base64 image for upload
  fileId: z.string().optional(), // CDN file ID for deletion
  publishedDate: z.string().min(1, "La fecha de publicación es requerida"),
  isPublished: z.boolean().default(true),
});

export const deleteBlogPostSchema = z.object({
  id: z.string().uuid("ID no válido").or(z.string()),
});

export type CreateBlogPostInput = z.infer<typeof BlogPostSchema>;

export const updateBlogPostSchema = BlogPostSchema.partial();
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
