import { useContext, useEffect, useState, type ReactNode } from "react";
import { ModalFormContext } from "../Context/ModalFormContext";
import ModalFormContainer from "./ModalFormContainer";

type Props = {
  children: ReactNode;
};

const ModalForm = ({ children }: Props) => {
  const { isOpen, setIsOpen } = useContext(ModalFormContext);
  const onClose = () => {
      setIsOpen(false);
  };
  return(
    <ModalFormContainer isOpen={isOpen} onClose={onClose}>
      {children}
    </ModalFormContainer>
  )
};
export default ModalForm;
