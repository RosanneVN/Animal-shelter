import React, { useContext } from "react";
import ModalForm from "../../../../layouts/ModalForm";
import CreateCards from "../../Pets/components/Forms/CreateCards";
import {
  ModalFormContext,
  ModalFormProvider,
} from "../../../../Context/ModalFormContext";
import CreateNewCreditCard from "./CreateNewCreditCard";
import CreditCardFormCreate from "./CreditCardFormCreate";
import CreditCardsContent from "../../../../components/CreditCardsContent";
import ListMapCards from "./ListMapCards";

type Props = {};

export default function CreditCardsContentList({}: Props) {
  const { setIsOpen } = useContext(ModalFormContext);
  return (
    <>
      {" "}
      <ModalFormProvider>
        <ModalForm>
          <CreditCardFormCreate />
        </ModalForm>
        <CreateNewCreditCard />
      </ModalFormProvider>
      <ListMapCards onClick={setIsOpen} />
    </>
  );
}
