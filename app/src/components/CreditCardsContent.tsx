import React from "react";
import CreditCardsList from "./ApadrinaYDona/CreditCardsList";
import CreditCard from "./ApadrinaYDona/CreditCard";
import ModalForm from "../layouts/ModalForm";
import { ModalFormProvider } from "../Context/ModalFormContext";

type Props = {};

const CreditCardsContent = (props: Props) => {
  return (
    <>
      <section className=" w-full flex justify-center items-center">
        <ModalFormProvider>
          <ModalForm>
            <CreditCard></CreditCard>
          </ModalForm>
          <CreditCardsList />
        </ModalFormProvider>
      </section>
    </>
  );
};
export default CreditCardsContent;
