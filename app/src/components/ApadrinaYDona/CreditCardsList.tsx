import React, { useContext } from "react";
import DonationButton from "../Buttons/DonationButton";
import { CreditCardsContext } from "../../Context/CreditCardsContext";

type Props = {};

const CreditCardsList = (props: Props) => {
     const { setIsOpen } = useContext(CreditCardsContext);
  return (
    <>
      <div
        className="w-[50%] flex flex-col gap-10 place-content-center place-items-center"
      >
        <DonationButton onOpen={setIsOpen} title={"tarjeta cup"} />
        <DonationButton onOpen={setIsOpen} title={"tarjeta mlc"} />
        <DonationButton onOpen={setIsOpen} title={"tarjeta zelle"} />
      </div>
    </>
  );
};
export default CreditCardsList;
