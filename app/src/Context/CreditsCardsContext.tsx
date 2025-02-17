"use client";
import { createContext, useState, type ReactNode } from "react";
interface CreditCradsContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Provide the type and a default value
export const CreditCradsContext = createContext<CreditCradsContextType>({
  isOpen: false,
  setIsOpen: () => {}, 
});
export function CreditCradsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    //lo que quieres proveer
    <CreditCradsContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CreditCradsContext.Provider>
  );
}