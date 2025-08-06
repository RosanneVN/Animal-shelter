import React, { useContext } from "react";
import { ModalFormContext } from "../../../Context/ModalFormContext";

type Props = {
 
  cardNumber: string;
  numberPhone: number;
};

const CreditCard = ({  cardNumber, numberPhone }: Props) => {
  const { setIsOpen } = useContext(ModalFormContext);
  return (
    <>
      <div className=" bg-white w-96 px-6 py-6 rounded-lg h-[70vh] text-lettersDark justify-between flex flex-col">
        <div className="flex items-end justify-end">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="py-1 px-[11px] rounded-full hover:translate-y-1 hover:text-red-500 shadow-md "
          >
            X
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {" "}
          <div className="rounded-md border-[1px] px-3 py-1 border-solid w-full  border-orange-400">
            <p className="font-semibold">Numero de la tarjeta:</p>
            <hr className="border-orange-400" />
            <p>{cardNumber}</p>
          </div>
          <div className="rounded-md border-[1px] px-3  py-1 border-solid w-full  border-orange-400">
            <p className="font-semibold">Numero de telefono a confirmar:</p>
            <hr className="border-orange-400" />
            <p>{numberPhone}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreditCard;
