import { useContext, useEffect, useState, type ReactNode } from "react";
import { ModalFormContext } from "../Context/ModalFormContext";

type Props = {
  children: ReactNode;
};

const ModalForm = ({ children }: Props) => {
  const { isOpen, setIsOpen } = useContext(ModalFormContext);
  

  return isOpen ? (
    <section
      onClick={() => {
        setIsOpen(false);
      }}
      className="backdrop-blur-md bg-black/30 w-screen h-[100vh] fixed bottom-0 left-0 z-50 
    place-content-center place-items-center"
    >
      {children}
    </section>
  ) : null;
};
export default ModalForm;
