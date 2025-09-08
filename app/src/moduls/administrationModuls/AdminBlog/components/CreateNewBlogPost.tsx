import React from "react";

export default function CreateNewBlogPost() {
  const handleCreatePost = () => {
    window.location.href = "/administrationPages/Blog/create";
  };

  return (
    <button
      onClick={handleCreatePost}
      className="bg-secondary text-white py-2 px-4 rounded self-start max-sm:self-end hover:bg-opacity-90 
      shadow-md hover:shadow-none transition-all duration-200 text-xs font-semibold"
    >
      + Crear Nuevo Post
    </button>
  );
}
