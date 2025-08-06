import React, { useState } from "react";
import { getServicesBlogPosts } from "../../../../Services/blogpost.services";
import BlogPostWithEdit from "./BlogPostWithEdit";
import PaginationComponents from "../../PaginationComponents";

export default function ListMapBlogPosts() {
  const [page, setPage] = useState(1);
  const limit = 9; // 3x3 grid
  
  const { data, loading, error, pagination } = getServicesBlogPosts({ page, limit });
  console.log("data", data);
  console.log("pagination", pagination);
  

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
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 grid-flow-row max-md:grid-cols-1 max-xl:grid-cols-2 gap-4 w-full">
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
      
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationComponents
            page={page}
            totalPages={pagination.totalPages}
            onNext={() => {
              if (page < pagination.totalPages) {
                setPage(page + 1);
              }
            }}
            onBack={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
