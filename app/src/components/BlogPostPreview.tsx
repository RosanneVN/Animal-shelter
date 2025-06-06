import React from "react";
import MarkdownRenderer from "./MarkdownRenderer/MarkdownRenderer";

type Props = {
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  publishedDate: string;
  isPublished: boolean;
  onBackToEditor?: () => void;
};

const BlogPostPreview = ({
  title,
  content,
  excerpt,
  imageUrl,
  publishedDate,
  isPublished,
  onBackToEditor,
}: Props) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Sin fecha";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {" "}
      {/* Preview Header */}
      <div className="bg-gray-100 p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">
            Vista Previa del Post
          </h2>
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isPublished
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {isPublished ? "Publicado" : "Borrador"}
            </span>
            {onBackToEditor && (
              <button
                onClick={onBackToEditor}
                className="px-3 py-1 text-xs bg-secondary text-white rounded hover:bg-secondary/90 transition-colors duration-200"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Blog Post Preview Content */}
      <article>
        {/* Header Image */}
        {imageUrl && (
          <div className="w-full h-64 overflow-hidden">
            <img
              src={imageUrl}
              alt={title || "Imagen del post"}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="p-8">
          {/* Title and Meta */}
          <header className="mb-8 border-b pb-6">
            <h1 className="text-4xl font-bold text-lettersDark mb-4 max-sm:text-2xl">
              {title || "Título del post"}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-lettersMiddle">
              <span>Publicado: {formatDate(publishedDate)}</span>
            </div>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-lettersMiddle text-lg mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-secondary">
                {excerpt}
              </p>
            )}
          </header>
          <MarkdownRenderer
            content={content}
            className="text-lettersDark leading-relaxed"
          />

          {/* Footer info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500 text-center">
              Esta es una vista previa de cómo se verá tu post cuando sea
              publicado.
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPreview;
