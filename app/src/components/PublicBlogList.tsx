import React from "react";
import { getServicesBlogPosts } from "../Services/blogpost.services";
import MarkdownRenderer from "./MarkdownRenderer";

type Props = {
  maxPosts?: number;
  showReadMore?: boolean;
};

const PublicBlogList = ({ maxPosts = 3, showReadMore = true }: Props) => {
  const { data, loading, error } = getServicesBlogPosts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to extract plain text from markdown (simple implementation)
  const extractPlainText = (markdown: string, maxLength = 150) => {
    // Remove markdown syntax
    const plainText = markdown
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
      .replace(/`([^`]+)`/g, '$1') // Remove inline code
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .trim();

    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength) + "...";
    }
    return plainText;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 grid-flow-row gap-4 max-lg:grid-cols-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-row pt-20 pb-10">
            <div className="mr-7 max-sm:mr-0 flex flex-col gap-5 shadow-md rounded-lg animate-pulse">
              <div className="rounded-t-lg h-48 bg-gray-300"></div>
              <div className="mx-5 mb-5 flex flex-col gap-3">
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-red-500">Error al cargar los posts del blog</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-lettersMiddle">No hay posts disponibles</p>
      </div>
    );
  }

  // Filter only published posts and limit the number
  const publishedPosts = data
    .filter(post => post.isPublished)
    .slice(0, maxPosts);

  if (publishedPosts.length === 0) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-lettersMiddle">No hay posts publicados disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 grid-flow-row gap-4 max-lg:grid-cols-1">
      {publishedPosts.map((post) => (
        <div key={post.id} className="flex flex-row pt-20 pb-10">
          <div className="mr-7 max-sm:mr-0 flex flex-col gap-5 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
            <img
              className="rounded-t-lg h-48 w-full object-cover"
              src={post.imageUrl || "/Image/articuloBlogCorto.jpg"}
              alt={post.title}
            />
            <div className="mx-5 mb-5 flex flex-col gap-3">
              <p className="font-semibold text-middleLettersLetters text-lettersDark line-clamp-2">
                {post.title}
              </p>
              <p className="text-lettersMiddle text-shortLetters">
                {formatDate(post.publishedDate)}
              </p>
              <p className="text-lettersMiddle text-shortLetters text-justify">
                {post.excerpt || extractPlainText(post.content)}
              </p>              {showReadMore && (
                <a
                  className="text-primary font-semibold underline text-shortLetters"
                  href={`/Blog/${post.id}`}
                >
                  leer más
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicBlogList;
