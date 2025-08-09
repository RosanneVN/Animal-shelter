import React, { useState } from "react";
import { ModalFormProvider } from "../Context/ModalFormContext";
import CreditCard from "../moduls/ApadrinaYDona/components/CreditCard";
import CreditCardsList from "../moduls/ApadrinaYDona/components/CreditCardsList";
import ModalForm from "../layouts/ModalForm";

type Props = {};

const CreditCardsContent = (props: Props) => {
  const [data, setData] = useState({
    cardNumber: "",
    numberPhone: 0,
  });
  return (
    <>
      <section className=" w-full flex justify-center items-center">
        <ModalFormProvider>
          <ModalForm>
            <CreditCard cardNumber={data.cardNumber} numberPhone={data.numberPhone}></CreditCard>
          </ModalForm>
          <CreditCardsList selectedDonation={setData} />
        </ModalFormProvider>
      </section>
    </>
  );
};
export default CreditCardsContent;
