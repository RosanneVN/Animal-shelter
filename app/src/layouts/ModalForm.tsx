import { useContext, useEffect, useState, type ReactNode } from "react";
import { ModalFormContext } from "../Context/ModalFormContext";

type Props = {
  children: ReactNode;
};

const ModalForm = ({ children }: Props) => {
  const { isOpen, setIsOpen } = useContext(ModalFormContext);
  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };
  return isOpen ? (
    <section
      onClick={handleBackdropClick}
      className="backdrop-blur-md bg-black/30 w-screen h-[100vh] fixed bottom-0 left-0 z-40 
    place-content-center place-items-center"
    >
      <div></div>
      {children}
    </section>
  ) : null;
};
export default ModalForm;
