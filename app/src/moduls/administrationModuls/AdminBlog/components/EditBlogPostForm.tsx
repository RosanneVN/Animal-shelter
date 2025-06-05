import React, { useState } from "react";
import { useHandleUpdateBlogPost } from "../../../../Services/blogpost.services";
import InputForm from "../../../../components/Inputs/InputForm";
import type { BlogPostType } from "../../../../Domain/Types/BlogPostType";

type Props = {
  blogPost: BlogPostType;
  onClose: () => void;
};

export default function EditBlogPostForm({ blogPost, onClose }: Props) {
  const [values, setValues] = useState({
    title: blogPost.title,
    content: blogPost.content,
    excerpt: blogPost.excerpt,
    imageUrl: blogPost.imageUrl || "",
    publishedDate: blogPost.publishedDate.split('T')[0],
    isPublished: blogPost.isPublished,
  });

  const { handleUpdateBlogPost, loading, error } = useHandleUpdateBlogPost();

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

    await handleUpdateBlogPost({
      id: blogPost.id,
      ...values,
    });
    
    if (!error) {
      onClose();
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col max-sm:w-full bg-white p-5 rounded-xl gap-5 z-50 w-full"
    >
      <button
        type="button"
        className="rounded-full p-2 shadow-md self-end hover:translate-y-1 hover:shadow-none"
        onClick={onClose}
      >
        <img className="size-4" src="/Image/closeIcon.png" alt="" />
      </button>

      <h3 className="text-lg font-semibold text-lettersDark">Editar Post</h3>

      <InputForm
        name="title"
        label="Título del post *"
        type="text"
        placeholderText="Ingresa el título"
        errorMesage={!values.title ? "Este campo es obligatorio" : undefined}
        onChange={(e) => handleChange("title", e.target.value.trim())}
        isRequired={true}
        value={values.title}
        defaultValue=""
      />

      <div className="flex flex-col gap-2">
        <label className="text-xs text-lettersDark font-semibold">Contenido *</label>
        <textarea
          className="rounded-lg border-[1px] focus:border-2 focus:outline-none focus:bg-orange-50 border-orange-400 border-solid 
          text-lettersDark font-normal text-xs py-1 px-3 min-h-32"
          placeholder="Escribe el contenido del post"
          value={values.content}
          onChange={(e) => handleChange("content", e.target.value)}
          required
        />
        {!values.content && (
          <span className="text-red-600 text-[10px]">Este campo es obligatorio</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-lettersDark font-semibold">Extracto *</label>
        <textarea
          className="rounded-lg border-[1px] focus:border-2 focus:outline-none focus:bg-orange-50 border-orange-400 border-solid 
          text-lettersDark font-normal text-xs py-1 px-3 h-20"
          placeholder="Breve descripción del post"
          value={values.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          required
        />
        {!values.excerpt && (
          <span className="text-red-600 text-[10px]">Este campo es obligatorio</span>
        )}
      </div>

      <InputForm
        name="imageUrl"
        label="URL de imagen (opcional)"
        type="url"
        placeholderText="https://ejemplo.com/imagen.jpg"
        onChange={(e) => handleChange("imageUrl", e.target.value.trim())}
        value={values.imageUrl}
        defaultValue=""
      />

      <InputForm
        name="publishedDate"
        label="Fecha de publicación *"
        type="date"
        value={values.publishedDate}
        onChange={(e) => handleChange("publishedDate", e.target.value)}
        isRequired={true}
        defaultValue=""
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isPublished"
          checked={values.isPublished}
          onChange={(e) => handleChange("isPublished", e.target.checked)}
          className="rounded border-orange-400"
        />
        <label htmlFor="isPublished" className="text-xs text-lettersDark">
          Publicar inmediatamente
        </label>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-secondary text-white py-2 px-4 rounded hover:bg-opacity-90 disabled:opacity-50 text-xs"
      >
        {loading ? "Actualizando..." : "Actualizar Post"}
      </button>
    </form>
  );
}
