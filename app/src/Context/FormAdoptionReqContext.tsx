"use client";
import { createContext, useState, type ReactNode } from "react";
import { FormAdoptionReq } from "../Datas/FormAdoptiobReq";
import type { FormAdoptionReqType } from "../Domain/Types/FormAdoptionReqType";

interface FormAdoptionReqContextType {
  requestsValues: FormAdoptionReqType;
  setRequestsValues: React.Dispatch<React.SetStateAction<FormAdoptionReqType>>;
}

// Provide the type and a default value
export const FormAdoptionReqContext = createContext<FormAdoptionReqContextType>(
  {
    requestsValues: FormAdoptionReq,
    setRequestsValues: () => {},
  }
);
export function FormAdoptionReqProvider({ children }: { children: ReactNode }) {
  const [requestsValues, setRequestsValues] =
    useState<FormAdoptionReqType>(FormAdoptionReq);
    console.log(requestsValues);
    
  return (
    //lo que quieres proveer
    <FormAdoptionReqContext.Provider
      value={{ requestsValues, setRequestsValues }}
    >
      {children}
    </FormAdoptionReqContext.Provider>
  );
}
