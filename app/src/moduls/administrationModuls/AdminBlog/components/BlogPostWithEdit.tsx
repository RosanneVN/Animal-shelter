import React from "react";
import EditButtonSection from "../../../../components/administrationComponents/EditButtonSection";
import { useHandleDeleteBlogPost } from "../../../../Services/blogpost.services";
import type { BlogPostType } from "../../../../Domain/Types/BlogPostType";

type Props = BlogPostType;

export default function BlogPostWithEdit({
  id,
  title,
  content,
  excerpt,
  imageUrl,
  publishedDate,
  isPublished,
  createdAt,
  updatedAt,
}: Props) {
  const { handleDeleteBlogPost } = useHandleDeleteBlogPost();

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este post?")) {
      await handleDeleteBlogPost(id);
      window.location.reload();
    }
  };
  const handleEdit = () => {
    window.location.href = `/administrationPages/Blog/edit/${id}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-row pt-20 w-full">
      <div className="max-sm:mr-0 flex flex-col gap-5 shadow-md rounded-lg ">
        <img
          className="rounded-t-lg h-48 w-full object-cover"
          src={imageUrl || "/Image/articuloBlogCorto.jpg"}
          alt={title}
        />
        <div className="mx-5 mb-5 flex flex-col gap-3 ">
          <p className="font-semibold text-middleLettersLetters text-lettersDark">
            {title}
          </p>
          <p className="text-lettersMiddle text-shortLetters">
            {formatDate(publishedDate)}
          </p>
          <p className="text-lettersMiddle text-shortLetters text-justify">
            {excerpt}
          </p>          <EditButtonSection
            onClick={handleEdit}
            onDelete={handleDelete}
          />        </div>
      </div>
    </div>
  );
}
