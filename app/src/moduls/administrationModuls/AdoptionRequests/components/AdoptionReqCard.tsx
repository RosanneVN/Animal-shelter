import React from "react";

type Props = {};

export default function AdoptionReqCard({}: Props) {
  return (
    <section className="flex w-[70%] rounded-md shadow-md  overflow-hidden">
      <div>
        <img className="size-[212px]" src="/Image/Adoptable1.jpg" alt="" />
      </div>

      <div className="flex flex-col px-10 py-5 text-middleLetters gap-5 text-lettersDark ">
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Nombre:</span> Rosanne Vazquez Nunez
          </p>
          <p>
            <span className="font-semibold">Edad:</span> 21
          </p>
          <p>
            <span className="font-semibold">Telefono:</span> 56775245
          </p>
          <p>
            <span className="font-semibold"> Direccion:</span> Lorem ipsum
            dolor, sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex w-full justify-between">
            <div className=" text-shortLetters py-1 px-2 bg-secondary rounded-md">Aprobada</div>
            <div className="py-1 px-3 shadow-md rounded-md text-red-600">Borrar</div>
        </div>
      </div>
    </section>
  );
}
