import React, { useContext } from "react";
import { ModalFormContext } from "../../../../Context/ModalFormContext";

type Props = {};

export default function CreateNewCreditCard({}: Props) {
  const { setIsOpen } = useContext(ModalFormContext);
  return (
    <button
      className="text-lettersLight text-shortLetters font-semibold uppercase bg-secondary py-2 px-4
  rounded-xl shadow-md hover:shadow-none"
      onClick={() => setIsOpen(true)}
    >
      Agregar trajeta
    </button>
  );
}
