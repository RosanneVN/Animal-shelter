import React from "react";
import { ModalFormProvider } from "../Context/ModalFormContext";
import CreditCard from "../moduls/ApadrinaYDona/components/CreditCard";
import CreditCardsList from "../moduls/ApadrinaYDona/components/CreditCardsList";
import ModalForm from "../layouts/ModalForm";

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
