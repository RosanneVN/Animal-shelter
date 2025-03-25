import React from "react";
import ModalForm from "../layouts/ModalForm";
import { ModalFormProvider } from "../Context/ModalFormContext";
import CreditCard from "../moduls/ApadrinaYDona/components/CreditCard";
import CreditCardsList from "../moduls/ApadrinaYDona/components/CreditCardsList";

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
