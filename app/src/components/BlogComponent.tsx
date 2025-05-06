import React, { Children } from "react";

type Props = {
  children: any;
};

export default function BlogComponent({ children }: Props) {
  return (
    <div className="flex flex-row pt-20 pb-10">
      <div className="mr-7 max-sm:mr-0 flex flex-col gap-5 shadow-md rounded-lg">
        <img
          className="rounded-t-lg"
          src="/Image/articuloBlogCorto.jpg"
          alt=""
        />
        <div className="mx-5 mb-5 flex flex-col gap-3">
          <p className="font-semibold text-middleLettersLetters text-lettersDark">
            ¿Por qué esterilizar?
          </p>
          <p className="text-lettersMiddle text-shortLetters">Mar 14, 2025</p>
          <p className="text-lettersMiddle text-shortLetters text-justify">
            Esterilizar a perros y gatos no solo es un acto de responsabilidad,
            sino también una decisión que mejora su calidad de vida. Es
            completamente falso que un animal necesite tener al menos una camada
            para "madurar" o "estar saludable". Ese es un mito que carece de
            base científica...
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
