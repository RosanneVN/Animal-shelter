import React, { useContext } from "react";
import { ModalFormContext } from "../../../Context/ModalFormContext";
import { getServicesCreditCards } from "../../../Services/creditcards.services";
import DonationButtonLanding from "../../../components/Buttons/DonationButtonLanding";


type Props = {
  selectedDonation: React.Dispatch<
    React.SetStateAction<{
      cardNumber: string;
      numberPhone: number;
    }>
  >;
};

const CreditCardsList = ({ selectedDonation }: Props) => {
  const { setIsOpen } = useContext(ModalFormContext);
  const { data } = getServicesCreditCards();

  return (
    <>
      <div className="w-[50%] max-sm:w-full flex flex-col gap-10 place-content-center place-items-center">
        {data.map((creditCard) => (
          <DonationButtonLanding
            nameCard={creditCard.nameCard}
            cardNumber={creditCard.cardNumber}
            numberPhone={creditCard.numberPhone}
            onOpen={setIsOpen}
            selectedDonation={selectedDonation}
            key={creditCard.id}
          />
        ))}
      </div>
    </>
  );
};
export default CreditCardsList;
