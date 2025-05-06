import type { CreditCards } from "../../interfaces/backendAPI";
import type { CreditCardsType } from "../Types/CreditCardsType";

type Props = {
  data: CreditCards[];
};

export default function creditCardsAdapters({ data }: Props): CreditCardsType[] {
  return data.map((creditCard) => ({
    id: creditCard.id,
    cardNumber: creditCard.cardNumber,
    numberPhone: creditCard.numberPhone,
  }));
}