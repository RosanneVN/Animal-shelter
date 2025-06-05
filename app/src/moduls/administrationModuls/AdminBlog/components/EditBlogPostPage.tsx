import React, { useState, useEffect } from "react";
import { useHandleUpdateBlogPost } from "../../../../Services/blogpost.services";
import InputForm from "../../../../components/Inputs/InputForm";
import type { BlogPostType } from "../../../../Domain/Types/BlogPostType";

type Props = {
  blogPostId: string;
};

export default function EditBlogPostPage({ blogPostId }: Props) {
  const [values, setValues] = useState({
    title: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    publishedDate: "",
    isPublished: true,
  });
  
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState<BlogPostType | null>(null);
  const { handleUpdateBlogPost, loading: updateLoading, error } = useHandleUpdateBlogPost();

  // Fetch blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`/api/blogposts`);
        const data = await response.json();
        
        if (data.data) {
          const post = data.data.find((p: BlogPostType) => p.id === blogPostId);
          if (post) {
            setBlogPost(post);
            setValues({
              title: post.title,
              content: post.content,
              excerpt: post.excerpt,
              imageUrl: post.imageUrl || "",
              publishedDate: post.publishedDate,
              isPublished: post.isPublished,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        alert("Error al cargar el post");
      } finally {
        setLoading(false);
      }
    };

    if (blogPostId) {
      fetchBlogPost();
    }
  }, [blogPostId]);

  const handleChange = (field: keyof typeof values, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!values.title || !values.content || !values.excerpt) {
      alert("Todos los campos obligatorios deben estar llenos");
      return;
    }

    if (updateLoading) return;

    await handleUpdateBlogPost({
      id: blogPostId,
      ...values,
    });
    
    if (!error) {
      window.location.href = "/administrationPages/AdminBlog";
    }
  };

  const handleBack = () => {
    window.location.href = "/administrationPages/AdminBlog";
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
            <p className="text-red-500 mb-4">Post no encontrado</p>
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
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="text-secondary hover:text-primary transition-colors duration-200"
          >
            ← Volver al Blog
          </button>
          <h1 className="text-3xl font-bold text-lettersDark">Editar Post</h1>
        </div>

        <form
          onSubmit={submit}
          className="bg-white p-8 rounded-xl shadow-lg gap-6 flex flex-col"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">            <div>
              <InputForm
                label="Título *"
                name="title"
                placeholderText="Título del post"
                value={values.title}
                onChange={(e) => handleChange("title", e.target.value)}
                type="text"
                isRequired={true}
              />
            </div>
            
            <div>
              <InputForm
                label="Fecha de Publicación *"
                name="publishedDate"
                value={values.publishedDate}
                onChange={(e) => handleChange("publishedDate", e.target.value)}
                type="date"
                isRequired={true}
              />
            </div>
          </div>

          <div>
            <InputForm
              label="Extracto *"
              name="excerpt"
              placeholderText="Breve descripción del post"
              value={values.excerpt}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              type="text"
              isRequired={true}
            />
          </div>

          <div>
            <InputForm
              label="URL de Imagen (opcional)"
              name="imageUrl"
              placeholderText="https://ejemplo.com/imagen.jpg"
              value={values.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              type="url"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-lettersDark mb-2">
              Contenido *
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent resize-vertical min-h-64"
              placeholder="Contenido completo del post..."
              value={values.content}
              onChange={(e) => handleChange("content", e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={values.isPublished}
              onChange={(e) => handleChange("isPublished", e.target.checked)}
              className="w-4 h-4 text-secondary bg-gray-100 border-gray-300 rounded focus:ring-secondary"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-lettersDark">
              Publicado
            </label>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              Error al actualizar el post. Por favor, inténtalo de nuevo.
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={updateLoading}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                updateLoading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-secondary hover:bg-secondary/90"
              }`}
            >
              {updateLoading ? "Actualizando..." : "Actualizar Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
