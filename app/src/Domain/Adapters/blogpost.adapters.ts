import type { BlogPosts } from "../../interfaces/backendAPI";
import type { BlogPostType } from "../Types/BlogPostType";

type Props = {
  data: BlogPosts[];
};

export default function blogPostAdapters({ data }: Props): BlogPostType[] {
  return data.map((blogPost) => ({
    id: blogPost.id,
    title: blogPost.title,
    content: blogPost.content,
    excerpt: blogPost.excerpt,
    imageUrl: blogPost.imageUrl,
    publishedDate: blogPost.publishedDate,
    isPublished: blogPost.isPublished,
    createdAt: blogPost.createdAt,
    updatedAt: blogPost.updatedAt,
  }));
}
