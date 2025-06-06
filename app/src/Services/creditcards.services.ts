import creditCardsAdapters from "../Domain/Adapters/creditcards.adapters";
import type { CreditCards } from "../interfaces/backendAPI";
import useFetch from "./useFetch";
import useMutation from "./useMutation";

const URL = "http://localhost:4321/api/creaditcards";

export const getServicesCreditCards = () => {
  const { data, loading, error } = useFetch<CreditCards>({
    url: URL,
  });

  const adaptedData = creditCardsAdapters({ data });
  return { data: adaptedData, loading, error };
};

type CreateCreditCards = {
  cardNumberNew: string;
  numberPhoneNew: number;
  nameCardNew: string;
};
export const useHandleCreateCreditCards = () => {
  const { mutate, loading, error } = useMutation();
  const handleCreateCreditCards = ({
    cardNumberNew,
    numberPhoneNew,
    nameCardNew
  }: CreateCreditCards) => {
    mutate({
      url: URL,
      method: "POST",
      body: {
        cardNumber: cardNumberNew,
        numberPhone: numberPhoneNew,
        nameCard: nameCardNew
      },
    });
  };
  return { handleCreateCreditCards, loading, error };
};

type UpdateCreditCards = {
  idUpdate: string;
  cardNumberUpdate: string;
  numberPhoneUpdate: number;
  nameCardUpdate: string;
};
export const useHandleUpdateCreditCards = () => {
  const { mutate, loading, error } = useMutation();
  const handleUpdateCreditCards = ({
    idUpdate,
    cardNumberUpdate,
    numberPhoneUpdate,
    nameCardUpdate
  }: UpdateCreditCards) => {
    const m = mutate({
      url: URL + "?id=" + idUpdate,
      method: "PATCH",
      body: {
        cardNumber: cardNumberUpdate,
        numberPhone: numberPhoneUpdate,
        nameCard: nameCardUpdate
      },
    });
  };
  return { handleUpdateCreditCards, loading, error };
};

export const useHandleDeleteCreditCards = () => {
  const { mutate, loading, error } = useMutation();
  const handleDeleteCreditCards = (id: string) => {
    const m = mutate({
      url: URL + "?id=" + id,
      method: "DELETE",
    });
  };
  return { handleDeleteCreditCards, loading, error };
};
