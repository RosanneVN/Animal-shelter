import React, { useContext } from "react";
import { getServicesCreditCards } from "../../../../Services/creditcards.services";
import DonationButton from "../../../../components/Buttons/DonationButton";
import { ModalFormContext } from "../../../../Context/ModalFormContext";

type Props = {onClick:any};

export default function ListMapCards({onClick}: Props) {
  const { data } = getServicesCreditCards();
  console.log("data", data);
 
  return (
    <div>
      {data.map((creditCard) => (
        <DonationButton onOpen={onClick} title={creditCard.nameCard} />
      ))}
    </div>
  );
}
