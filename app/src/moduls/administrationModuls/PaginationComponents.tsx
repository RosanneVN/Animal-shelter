import React from "react";

type Props = {
  onNext: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onBack: React.MouseEventHandler<HTMLButtonElement> | undefined;
  page: number;
  totalPages: number;
};

export default function PaginationComponents({
  onNext,
  onBack,
  page,
  totalPages,
}: Props) {
  return (
    <section className="w-full">
      <div className="flex justify-between w-full">
        <div className="w-20">
          {page > 1 && (
            <button
              className={`bg-white shadow-lg flex ml-0 py-1 px-3 rounded-full text-secondary text-mediumLetters
         hover:shadow-none `}
              onClick={onBack}
            >
              Anterior
            </button>
          )}
        </div>

        <span >Pagina {page}/{totalPages}</span>
        <div className="w-20">
          {page < totalPages && (
            <button
              className="bg-white flex mr-0 shadow-lg py-1 px-3 rounded-full text-secondary text-middleLetters
         hover:shadow-none"
              onClick={onNext}
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
