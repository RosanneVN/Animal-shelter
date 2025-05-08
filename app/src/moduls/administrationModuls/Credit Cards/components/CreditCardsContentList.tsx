import React, { useContext } from "react";
import ModalForm from "../../../../layouts/ModalForm";
import CreateCards from "../../Pets/components/Forms/CreateCards";
import {
  ModalFormContext,
  ModalFormProvider,
} from "../../../../Context/ModalFormContext";
import CreateNewCreditCard from "./CreateNewCreditCard";
import CreditCardFormCreate from "./CreditCardFormCreate";
import ListMapCards from "./ListMapCards";

type Props = {};

export default function CreditCardsContentList({}: Props) {
  return (
    <>
      {" "}
      <ModalFormProvider>
        <ModalForm>
          <CreditCardFormCreate />
        </ModalForm>
        <CreateNewCreditCard />
      </ModalFormProvider>
      <ListMapCards />
    </>
  );
}
