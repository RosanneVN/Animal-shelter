import React, { useContext } from "react";
import { ModalFormContext } from "../../../../Context/ModalFormContext";

type Props = {};

const CreateEventButton = (props: Props) => {
  const { setIsOpen } = useContext(ModalFormContext);

  return (
    <div className="flex w-full justify-end">
      <button
        className="text-lettersLight text-shortLetters font-semibold uppercase bg-secondary py-2 px-4
      rounded-xl shadow-md hover:shadow-none max-sm:my-5"
        onClick={() => setIsOpen(true)}
      >
        Crear nuevo evento
      </button>
    </div>
  );
};
export default CreateEventButton;
