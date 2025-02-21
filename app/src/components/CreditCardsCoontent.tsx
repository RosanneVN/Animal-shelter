import React from "react";
import { CreditCardsProvider } from "../Context/CreditCardsContext";
import CreditCardsList from "./ApadrinaYDona/CreditCardsList";
import ModalForm from "./ModalForm";

type Props = {};

const CreditCardsCoontent = (props: Props) => {
  return (
    <>
       <section className=" w-full">
        <CreditCardsProvider>
          <ModalForm></ModalForm>
          <CreditCardsList />
        </CreditCardsProvider>
      </section>
    </>
  );
};
export default CreditCardsCoontent;
