import blogPostAdapters from "../Domain/Adapters/blogpost.adapters";
import type { BlogPosts } from "../interfaces/backendAPI";
import useFetch from "./useFetch";
import useMutation from "./useMutation";

const URL = "http://localhost:4321/api/blogposts";

export const getServicesBlogPosts = () => {
  const { data, loading, error } = useFetch<BlogPosts>({
    url: URL,
  });

  const adaptedData = blogPostAdapters({ data });
  return { data: adaptedData, loading, error };
};

type CreateBlogPost = {
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  img?: string; // Base64 image for upload
  publishedDate: string;
  isPublished?: boolean;
};

export const useHandleCreateBlogPost = () => {
  const { mutate, loading, error } = useMutation();  const handleCreateBlogPost = ({
    title,
    content,
    excerpt,
    imageUrl,
    img,
    publishedDate,
    isPublished = true,
  }: CreateBlogPost) => {
    mutate({
      url: URL,
      method: "POST",
      body: {
        title,
        content,
        excerpt,
        imageUrl,
        img,
        publishedDate,
        isPublished,
      },
    });
  };
  return { handleCreateBlogPost, loading, error };
};

type UpdateBlogPost = {
  id: string;
  title?: string;
  content?: string;
  excerpt?: string;
  imageUrl?: string;
  img?: string; // Base64 image for upload
  publishedDate?: string;
  isPublished?: boolean;
};

export const useHandleUpdateBlogPost = () => {
  const { mutate, loading, error } = useMutation();  const handleUpdateBlogPost = ({
    id,
    title,
    content,
    excerpt,
    imageUrl,
    img,
    publishedDate,
    isPublished,
  }: UpdateBlogPost) => {
    mutate({
      url: URL + "?id=" + id,
      method: "PATCH",
      body: {
        title,
        content,
        excerpt,
        imageUrl,
        img,
        publishedDate,
        isPublished,
      },
    });
  };
  return { handleUpdateBlogPost, loading, error };
};

export const useHandleDeleteBlogPost = () => {
  const { mutate, loading, error } = useMutation();
  const handleDeleteBlogPost = (id: string) => {
    mutate({
      url: URL + "?id=" + id,
      method: "DELETE",
    });
  };
  return { handleDeleteBlogPost, loading, error };
};
