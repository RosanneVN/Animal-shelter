import { useContext, useEffect, useState } from "react";
import { ModalFormContext } from "../Context/ModalFormContext";
import InputForm from "./Inputs/InputForm";
import PersonalData from "./Forms/PersonalData";

const ModalForm = () => {
  const { setIsOpen, isOpen } = useContext(ModalFormContext);

  const [isSubmitted, setIsSubmitted] = useState(false);

  return isOpen ? (
    <section
      className="backdrop-blur-md bg-black/30 w-screen h-[100vh] fixed bottom-0 left-0 z-50 
    place-content-center place-items-center"
    >
      <div className="bg-white flex  h-[80vh] w-[700px] rounded-lg">
        <div className="bg-orange-400 w-[40%] flex justify-start items-end rounded-l-lg overflow-hidden">
          <div>
          </div>
          <img className="w-40 h-60" src="/Image/michi.png" alt="" />
        </div>

        <div className="w-[60%] rounded-xl">
          <PersonalData></PersonalData>
          <div className="flex justify-around">
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
        </div>
      </div>
    </section>
  ) : null;
};
export default ModalForm;
