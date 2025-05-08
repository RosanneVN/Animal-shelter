import React from "react";
import DonationButton from "../../../../components/Buttons/DonationButton";
import ModalFormContainer from "../../../../layouts/ModalFormContainer";
import EditCreditCard from "./EditCreditCard";

type Props = {
  nameCard: string;
  id: string;
  cardNumber: string;
  numberPhone: number;
};

export default function CreditCardWithEdit({
  nameCard,
  id,
  cardNumber,
  numberPhone,
}: Props) {
    const [onClick, setOnClick] = React.useState(false);

  return (
    <>
      <DonationButton onOpen={setOnClick} title={nameCard} />
      <ModalFormContainer
        isOpen={onClick}
        onClose={() => {
          setOnClick(false);
        }}
      >
        <EditCreditCard
          nameCard={nameCard}
          id={id}
          cardNumber={cardNumber}
          numberPhone={numberPhone}
        />
      </ModalFormContainer>
    </>
  );
}
