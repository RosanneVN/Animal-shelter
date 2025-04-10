import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const ModalFormContainer = ({ children, isOpen, onClose }: Props) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return isOpen ? (
    <section
      onClick={handleBackdropClick}
      className="backdrop-blur-md bg-black/30 w-screen h-[100vh] fixed bottom-0 left-0 z-40 
    place-content-center place-items-center"
    >
      <div></div>
      {children}
    </section>
  ) : null;
};
export default ModalFormContainer;
