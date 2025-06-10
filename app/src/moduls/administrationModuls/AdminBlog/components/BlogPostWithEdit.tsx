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
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-row pt-20 w-full lg:w-80">
      <div className="max-sm:mr-0 flex flex-col gap-5 shadow-md rounded-lg ">
        <a href={"/administrationPages/Blog/" + id}>
          <img
            className="rounded-t-lg h-48 w-full object-cover"
            src={imageUrl || "/Image/articuloBlogCorto.jpg"}
            alt={title}
          />
        </a>
        <div className="mx-5 mb-5 flex flex-col gap-3 h-full justify-between">
          <a
            className="flex flex-col gap-3 "
            href={"/administrationPages/Blog/" + id}
          >
            <p className="font-semibold text-middleLettersLetters text-lettersDark line-clamp-2">
              {title}
            </p>
            <p className="text-lettersMiddle text-shortLetters">
              {formatDate(publishedDate)}
            </p>
            <p className="text-lettersMiddle text-shortLetters text-justify line-clamp-3">
              {excerpt}
            </p>
          </a>
          <EditButtonSection onClick={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
