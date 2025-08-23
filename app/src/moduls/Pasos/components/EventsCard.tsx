import React from "react";

type Props = {
  img: string;
  title: string;
  date: string;
  location: string;
  description: string;
};

export default function EventsCard({
  img,
  title,
  date,
  location,
  description,
}: Props) {
  return (
    <section className="w-60 py-7 px-3 rounded-md shadow-md flex flex-col gap-5 items-center">
      <div>
        <img className="w-60 h-40" src={img} alt="Event" />
      </div>

      <div className="flex flex-col gap-2 text-lettersDark text-shortLetters">
        <div>
          <span className="text-secondary font-semibold">Evento:</span>
          {title}
        </div>
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
    </section>
  );
}
