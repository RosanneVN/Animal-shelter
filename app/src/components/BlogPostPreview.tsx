import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";

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
  onBackToEditor 
}: Props) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Sin fecha";
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  // Simple markdown to HTML converter for preview
  const renderMarkdownPreview = (markdown: string) => {
    if (!markdown) return "";
    
    return markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-3 mt-6 text-lettersDark">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-4 mt-8 text-lettersDark">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 mt-8 text-lettersDark">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code>$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="mb-1">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="mb-1">$1</li>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
      // Paragraphs (replace double line breaks with paragraph tags)
      .replace(/\n\n/g, '</p><p class="mb-4">')
      // Single line breaks
      .replace(/\n/g, '<br/>')
      // Wrap in paragraph tags
      .replace(/^(.*)/, '<p class="mb-4">$1')
      .replace(/(.*$)/, '$1</p>');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">      {/* Preview Header */}
      <div className="bg-gray-100 p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">Vista Previa del Post</h2>
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              isPublished 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            }`}>
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
                target.style.display = 'none';
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
          </header>          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {content ? (
              <div 
                className="text-lettersDark leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(content) }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '16px'
                }}
              />
            ) : (
              <p className="text-gray-500 italic">No hay contenido disponible para mostrar</p>
            )}
          </div>

          {/* Footer info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500 text-center">
              Esta es una vista previa de cómo se verá tu post cuando sea publicado.
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPreview;
