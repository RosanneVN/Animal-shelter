"use client";
import { createContext, useState, type ReactNode } from "react";
interface CreditCardsContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Provide the type and a default value
export const CreditCardsContext = createContext<CreditCardsContextType>({
  isOpen: false,
  setIsOpen: () => {}, 
});
export function CreditCardsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    //lo que quieres proveer
    <CreditCardsContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CreditCardsContext.Provider>
  );
}