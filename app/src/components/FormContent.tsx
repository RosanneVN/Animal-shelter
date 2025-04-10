import React, { Children, useContext, type ReactNode } from "react";
import { ModalFormContext } from "../Context/ModalFormContext";

type Props = {};

export default function FormContent({ children }: { children: ReactNode }) {
  const { setIsOpen } = useContext(ModalFormContext);
  return (
    <form action="" className=" flex flex-col overflow-auto p-3  flex-1">
      {" "}
      <button
        type="button"
        className="rounded-full p-2 shadow-md self-end hover:translate-y-1 hover:shadow-none"
        onClick={() => setIsOpen(false)}
      >
        <img className="size-4" src="/Image/closeIcon.png" alt="" />
      </button>
      {children}
    </form>
  );
}
