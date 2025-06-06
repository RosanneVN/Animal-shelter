import React from "react";
import { getServicesBlogPosts } from "../../../../Services/blogpost.services";
import BlogPostWithEdit from "./BlogPostWithEdit";

export default function ListMapBlogPosts() {
  const { data, loading, error } = getServicesBlogPosts();
  console.log("data",data);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-lettersMiddle">Cargando posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-red-500">Error al cargar los posts: {error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-lettersMiddle">No hay posts disponibles. ¡Crea el primer post!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 grid-flow-row max-lg:grid-cols-1 gap-4 w-full">
      {data.map((blogPost) => (
        <BlogPostWithEdit
          key={blogPost.id}
          id={blogPost.id}
          title={blogPost.title}
          content={blogPost.content}
          excerpt={blogPost.excerpt}
          imageUrl={blogPost.imageUrl}
          publishedDate={blogPost.publishedDate}
          isPublished={blogPost.isPublished}
          createdAt={blogPost.createdAt}
          updatedAt={blogPost.updatedAt}
        />
      ))}
    </div>
  );
}
