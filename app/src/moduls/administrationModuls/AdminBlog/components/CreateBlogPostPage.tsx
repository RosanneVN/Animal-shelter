import React, { useState } from "react";
import { useHandleCreateBlogPost } from "../../../../Services/blogpost.services";
import InputForm from "../../../../components/Inputs/InputForm";
import MarkdownEditor from "../../../../components/Inputs/MarkdownEditor";

export default function CreateBlogPostPage() {
  const [values, setValues] = useState({
    title: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    publishedDate: new Date().toISOString().split('T')[0],
    isPublished: true,
  });

  const { handleCreateBlogPost, loading, error } = useHandleCreateBlogPost();

  const handleChange = (field: keyof typeof values, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!values.title || !values.content || !values.excerpt) {
      alert("Todos los campos obligatorios deben estar llenos");
      return;
    }

    if (loading) return;

    await handleCreateBlogPost(values);
    
    if (!error) {
      // Redirigir al panel de administración de blog
      window.location.href = "/administrationPages/AdminBlog";
    }
  };

  const handleBack = () => {
    window.location.href = "/administrationPages/AdminBlog";
  };

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
          <h1 className="text-3xl font-bold text-lettersDark">Crear Nuevo Post</h1>
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
          </div>          <div>
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
            <label htmlFor="isPublished" className="text-sm font-medium text-lettersDark">
              Publicar inmediatamente
            </label>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              Error al crear el post. Por favor, inténtalo de nuevo.
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
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-secondary hover:bg-secondary/90"
              }`}
            >
              {loading ? "Creando..." : "Crear Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
