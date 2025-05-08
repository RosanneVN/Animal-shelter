import React, { useState } from "react";
import DonationButton from "../../../../components/Buttons/DonationButton";
import ModalFormContainer from "../../../../layouts/ModalFormContainer";
import EditCreditCard from "./EditCreditCard";
import DeleteButton from "../../../../components/Buttons/DeleteButton";
import WarningMesage from "../../../../components/administrationComponents/WarningMesage";
import { useHandleDeleteCreditCards } from "../../../../Services/creditcards.services";

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
  const [onClick, setOnClick] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { handleDeleteCreditCards, loading, error } =
    useHandleDeleteCreditCards();
  const deleteCard = () => {
    if (loading) {
      return;
    }
    handleDeleteCreditCards(id);
    setIsDelete(false);
    window.location.reload();
  };

  return (
    <>
      <DonationButton onOpen={setOnClick} title={nameCard}>
        <DeleteButton onDelete={() => setIsDelete(true)}></DeleteButton>
      </DonationButton>
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
          onClick={() => setOnClick(false)}
        />
      </ModalFormContainer>

      <ModalFormContainer
        isOpen={isDelete}
        onClose={() => {
          setIsDelete(false);
        }}
      >
        <WarningMesage
          onClick={deleteCard}
          onClose={() => {
            setIsDelete(false);
            setOnClick(false);
          }}
        />
      </ModalFormContainer>
    </>
  );
}
