import React from "react";
import EditButtonSection from "../../../../components/administrationComponents/EditButtonSection";

type Props = {
  id: string;
  date: string;
  location: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function EventCards({ date, location, description, id, onEdit, onDelete }: Props) {
  return (
    <section className="w-72 py-7 px-3 rounded-md shadow-md flex flex-col gap-5 items-center">
      <div>
        <img className="w-72 h-60" src="/Image/Señora.jpg" alt="" />
      </div>

      <div className="flex flex-col gap-2 text-lettersDark text-shortLetters">
        <div>
          <span className="text-secondary font-semibold">Fecha:</span>
          {date}
        </div>
        <div>
          <span className="text-secondary font-semibold">Lugar:</span>{" "}
          {location}
        </div>
        <div>
          <span className="text-secondary font-semibold">Descripcion:</span>{" "}
          {description}
        </div>
      </div>

      <div className="flex w-full">
        <EditButtonSection onClick={onEdit} onDelete={onDelete} />
      </div>
    </section>
  );
}
