import React from "react";

type Props = {
  onNext: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onBack: React.MouseEventHandler<HTMLButtonElement> | undefined;
  page: number;
};

export default function PaginationComponents({ onNext, onBack, page }: Props) {
  return (
    <section>
      <div>
        <button onClick={onBack}>Anterior</button>
        <button onClick={onNext}>Siguiente</button>
      </div>

      <span>Pagina {page}</span>
    </section>
  );
}
