import React, { useState } from "react";
import ModalFormContainer from "../../../../layouts/ModalFormContainer";
import CreateBlogPostForm from "./CreateBlogPostForm";

export default function CreateNewBlogPost() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-secondary text-white py-2 px-4 rounded self-start hover:bg-opacity-90 
        shadow-md hover:shadow-none transition-all duration-200 text-xs font-semibold"
      >
        + Crear Nuevo Post
      </button>

      {isOpen && (
        <ModalFormContainer 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        >
          <CreateBlogPostForm onClose={() => setIsOpen(false)} />
        </ModalFormContainer>
      )}
    </>
  );
}
