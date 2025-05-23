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
    
      <section className="w-full flex flex-col justify-center items-center gap-5">
      <ModalFormProvider>
        <ModalForm>
          <CreditCardFormCreate />
        </ModalForm>
        <CreateNewCreditCard />
      </ModalFormProvider>
      <ListMapCards />
      </section>
   
  );
}
