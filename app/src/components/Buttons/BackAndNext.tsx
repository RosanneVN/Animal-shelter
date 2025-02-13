import { useContext } from "react";
import { ModalFormContext } from "../../Context/ModalFormContext";

const BackAndNext = () => {
  const { setIsOpen, isOpen } = useContext(ModalFormContext);
  return (
    <>
      <div className="flex justify-around pb-4">
        <button
          className="bg-white shadow-lg  hover:bg-red-600 py-1 px-4 rounded-full text-sm"
          onClick={() => setIsOpen(false)}
        >
          Cancelar
        </button>

        <button className="bg-white shadow-lg hover:bg-green-500 text-sm py-1 px-4 rounded-full">
          Siguiente
        </button>
      </div>
    </>
  );
};
export default BackAndNext;
