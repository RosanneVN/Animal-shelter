import React, { useContext, useState } from "react";
import InputForm from "../../../../components/Inputs/InputForm";
import type { CreditCards } from "../../../../interfaces/backendAPI";
import SendButton from "../../../../components/Buttons/SendButton";
import { useHandleCreateCreditCards } from "../../../../Services/creditcards.services";
import { ModalFormContext } from "../../../../Context/ModalFormContext";

export default function CreditCardFormCreate({}) {
  const { setIsOpen } = useContext(ModalFormContext);
  const [values, setValues] = useState<CreditCards>({
    id: "",
    cardNumber: "",
    numberPhone: 0,
    nameCard: "",
  });
  console.log("values", values);

  const handleChange = (field: keyof typeof values, value: string | number) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { handleCreateCreditCards, loading, error } =
    useHandleCreateCreditCards();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.numberPhone || !values.cardNumber || !values.nameCard) {
      alert("Todos los campos deben estar seleccionados");
      return;
    }

    if (loading) {
      return;
    }

    handleCreateCreditCards({
      cardNumberNew: values.cardNumber,
      numberPhoneNew: Number(values.numberPhone),
      nameCardNew: values.nameCard,
    });
    setIsOpen(false);

  };
  
  if (error) {
    return;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <form
        className="flex flex-col w-80 max-sm:w-full bg-white p-5 rounded-xl gap-5 z-50 "
        onSubmit={(e) => submit(e)}
      >
        <button
          type="button"
          className="rounded-full p-2 shadow-md self-end hover:translate-y-1 hover:shadow-none"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <img className="size-4" src="/Image/closeIcon.png" alt="" />
        </button>

        <div className="flex flex-col gap-2">
          <InputForm
            name={""}
            label={"Nombre de la tarjeta"}
            type={"text"}
            placeholderText={"Ej: Tarjeta de ..."}
            onChange={(inputValue) => {
              handleChange("nameCard", inputValue.target.value);
            }}
            isRequired={true}
            value={values.nameCard}
            defaultValue={""}
            errorMesage={
              !values.nameCard ? "Este campo es obligatorio" : undefined
            }
          />
          <InputForm
            name={""}
            label={"Numero de tarjeta"}
            type={"text"}
            placeholderText={"Ej: 9254-0987-5643-6543"}
            onChange={(inputValue) => {
              handleChange("cardNumber", inputValue.target.value);
            }}
            isRequired={true}
            value={values.cardNumber}
            defaultValue={""}
            errorMesage={
              !values.cardNumber ? "Este campo es obligatorio" : undefined
            }
          />

          <InputForm
            name={""}
            label={"Numero de telefono a confirmar"}
            type={"number"}
            placeholderText={"Ej: 56 77 52 45"}
            onChange={(inputValue) => {
              handleChange("numberPhone", inputValue.target.value.trim());
            }}
            isRequired={true}
            value={values.numberPhone}
            defaultValue={""}
            errorMesage={
              !values.numberPhone ? "Este campo es obligatorio" : undefined
            }
          />
        </div>

        <div className="flex w-full justify-end text-shortLetters">
          <SendButton type={"submit"} />
        </div>
      </form>
    </div>
  );
}
