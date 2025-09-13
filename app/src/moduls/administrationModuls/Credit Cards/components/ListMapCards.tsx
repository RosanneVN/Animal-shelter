import { getServicesCreditCards } from "../../../../Services/creditcards.services";
import CreditCardWithEdit from "./CreditCardWithEdit";

export default function ListMapCards() {
  const { data } = getServicesCreditCards();
  console.log("data", data);

  return (
    <div className="flex flex-col gap-5 min-h-[50vh]">
      {data.map((creditCard) => (
        <CreditCardWithEdit
          nameCard={creditCard.nameCard}
          id={creditCard.id}
          cardNumber={creditCard.cardNumber}
          numberPhone={creditCard.numberPhone}
        />
      ))}
    </div>
  );
}
