import React, { useState, useEffect } from "react";
import { useHandleUpdateBlogPost } from "../../../../Services/blogpost.services";
import InputForm from "../../../../components/Inputs/InputForm";
import MarkdownEditor from "../../../../components/Inputs/MarkdownEditor";
import BlogPostPreview from "../../../../components/BlogPostPreview";
import UploadInput from "../../../../components/Inputs/UploadInput";
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
    img: "", // Base64 image for upload
    publishedDate: "",
    isPublished: true,
  });
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState<BlogPostType | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const {
    handleUpdateBlogPost,
    loading: updateLoading,
    error,
  } = useHandleUpdateBlogPost();

  // Keyboard shortcut for preview toggle
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        setShowPreview((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
              img: "", // Initialize empty for new uploads
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

  const handleImageChange = (base64: string | null) => {
    setValues((prev) => ({ ...prev, img: base64 || "" }));
    setHasUnsavedChanges(true);
  };

  const handleChange = (
    field: keyof typeof values,
    value: string | boolean
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
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
      setHasUnsavedChanges(false);
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {" "}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              ← Volver al Blog
            </button>
            <h1 className="text-3xl font-bold text-lettersDark">Editar Post</h1>
            {hasUnsavedChanges && (
              <span className="text-sm text-orange-600 font-medium">
                • Cambios sin guardar
              </span>
            )}
          </div>
        </div>{" "}
        {showPreview ? (
          /* Preview Mode */ <BlogPostPreview
            title={values.title}
            content={values.content}
            excerpt={values.excerpt}
            imageUrl={values.img || values.imageUrl} // Use uploaded image or fallback to existing URL
            publishedDate={values.publishedDate}
            isPublished={values.isPublished}
            onBackToEditor={() => setShowPreview(false)}
          />
        ) : (
          /* Edit Mode */
          <form
            onSubmit={submit}
            className="bg-white p-8 rounded-xl shadow-lg gap-6 flex flex-col"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {" "}
              <div>
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
                  onChange={(e) =>
                    handleChange("publishedDate", e.target.value)
                  }
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
            </div>{" "}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen del Post
              </label>
              <UploadInput
                onImageChange={handleImageChange}
                previewURL={values.imageUrl}
              />
            </div>{" "}
            <div>
              <MarkdownEditor
                label="Contenido"
                value={values.content}
                onChange={(value) => handleChange("content", value || "")}
                placeholder="Escribe el contenido del post en Markdown..."
                isRequired={true}
                height={500}
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
              <label
                htmlFor="isPublished"
                className="text-sm font-medium text-lettersDark"
              >
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
                {updateLoading ? "Actualizando..." : "Actualizar Post"}{" "}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`px-6 py-2 rounded-lg text-white font-medium transition-colors duration-200 bg-terciary hover:bg-terciary/90`}
                >
                  {showPreview ? "Mostrar Editor" : "Vista Previa"}
                </button>
                <span className="text-xs text-gray-500 max-sm:hidden">
                  Ctrl+P
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
