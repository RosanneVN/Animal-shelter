import React from "react";
import CreditCardsList from "./ApadrinaYDona/CreditCardsList";
import ModalForm from "../layouts/ModalForm";
import { ModalFormProvider } from "../Context/ModalFormContext";
type Props = {};

const CreditCardsCoontent = (props: Props) => {
  return (
    <>
      <section className=" w-full">
        <ModalFormProvider>
          <ModalForm>Holaaa</ModalForm>
          <CreditCardsList />
        </ModalFormProvider>
      </section>
    </>
  );
};
export default CreditCardsCoontent;
