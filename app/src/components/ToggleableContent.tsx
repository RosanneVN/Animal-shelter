import React, { useState } from "react";
type TypeProps = {
  question: string;
  answer: string;
  isStartOpen?: boolean;
};
const ToggleableContent = ({
  question,
  answer,
  isStartOpen = false,
}: TypeProps) => {
  // Estado para controlar la visibilidad del contenido
  const [isOpen, setIsOpen] = useState(isStartOpen);

  // Función para alternar la visibilidad
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col bg-gray-50 p-3 rounded-lg">
      <div className="flex flex-row justify-between items-center">
        <p className="text-middleLetters uppercase text-secondary font-semibold max-sm:text-base">
          {question}
        </p>
        <button
          type="button"
          onClick={toggle}
          className="px-1 rounded-full bg-lettersMiddle w-fit h-fit text-lettersLight"
        >
          {isOpen ? "-" : "+"}
        </button>
      </div>

      {/* Contenido desplegable con animación */}
      <div
        className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-fit" : "max-h-0"
        }`}
      >
        <div className="mt-2 p-2 border-t flex h-full border-lettersMiddle">
          <p className="text-middleLetters text-lettersDark  text-justify">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default ToggleableContent;
