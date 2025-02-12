import { useContext } from "react";
import AdoptionCards from "./AdoptionCards";
import { ModalFormContext } from "../../Context/ModalFormContext";

type Props = {};

export default function AdoptionCardList({}: Props) {
  const { setIsOpen } = useContext(ModalFormContext);
  return (
    <>
      <section
        className="grid grid-cols-3 grid-rows-flow place-items-center w-full h-full
    max-lg:h-[150vh] max-sm:h-[400vh] max-lg:grid-cols-2 max-sm:grid-cols-1 gap-16"
      >
        {" "}
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
        <AdoptionCards onOpen={setIsOpen} />
      </section>
    </>
  );
}
