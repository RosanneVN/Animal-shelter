"use client";
import { createContext, useState, type ReactNode } from "react";
interface ModalFormContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Provide the type and a default value
export const ModalFormContext = createContext<ModalFormContextType>({
  isOpen: false,
  setIsOpen: () => {}, // This is a no-op function, but it matches the correct type
});
export function ModalFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    //lo que quieres proveer
    <ModalFormContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalFormContext.Provider>
  );
}
