import React, { useState, useEffect } from "react";
import MarkdownRenderer from "./MarkdownRenderer/MarkdownRenderer";
import type { BlogPostType } from "../Domain/Types/BlogPostType";

type Props = {
  blogPostId: string;
};

export default function PublicBlogPostDetail({ blogPostId }: Props) {
  const [blogPost, setBlogPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/blogposts`);
        const data = await response.json();
        
        if (data.data) {
          const post = data.data.find((p: BlogPostType) => p.id === blogPostId && p.isPublished);
          if (post) {
            setBlogPost(post);
          }
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (blogPostId) {
      fetchBlogPost();
    }
  }, [blogPostId]);

  const handleBack = () => {
    window.location.href = "/Blog";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="w-full h-full pt-40 pb-20 px-36 max-sm:px-10">
        <div className="flex justify-center items-center min-h-64">
          <p className="text-lettersMiddle">Cargando post...</p>
        </div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="w-full h-full pt-40 pb-20 px-36 max-sm:px-10">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">Post no encontrado o no está disponible</p>
            <button
              onClick={handleBack}
              className="text-secondary hover:text-primary"
            >
              ← Volver al Blog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full pt-40 pb-20 px-36 max-sm:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="text-secondary hover:text-primary transition-colors duration-200"
          >
            ← Volver al Blog
          </button>
        </div>

        {/* Blog Post Content */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Image */}
          {blogPost.imageUrl && (
            <div className="w-full h-64 overflow-hidden">
              <img
                src={blogPost.imageUrl}
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Title and Meta */}
            <header className="mb-8 border-b pb-6">
              <h1 className="text-4xl font-bold text-lettersDark mb-4 max-sm:text-2xl">
                {blogPost.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-lettersMiddle">
                <span>Publicado: {formatDate(blogPost.publishedDate)}</span>
                {blogPost.updatedAt && (
                  <span>Actualizado: {formatDate(blogPost.updatedAt)}</span>
                )}
              </div>
              
              {/* Excerpt */}
              {blogPost.excerpt && (
                <p className="text-lettersMiddle text-lg mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-secondary">
                  {blogPost.excerpt}
                </p>
              )}
            </header>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer 
                content={blogPost.content} 
                className="text-lettersDark leading-relaxed"
              />
            </div>
          </div>
        </article>

        {/* Back button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 
            transition-colors duration-200 font-medium"
          >
            ← Volver al Blog
          </button>
        </div>
      </div>
    </div>
  );
}
