import { useContext } from "react";
import AdoptionCards from "./AdoptionCards";
import { ModalFormContext } from "../../Context/ModalFormContext";

type Props = {};

export default function AdoptionCardList({}: Props) {
  const { setIsOpen } = useContext(ModalFormContext);
  return (
    <>
      <section
        className="grid grid-cols-4 grid-rows-flow place-items-center w-full gap-10 h-full
    max-lg:h-[200vh] max-sm:h-[450vh] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-10"
      >
        {" "}
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
      </section>
    </>
  );
}
