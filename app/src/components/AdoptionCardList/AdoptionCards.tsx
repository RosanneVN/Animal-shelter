import React from "react";
import AdoptionButton from "../Buttons/AdoptionButton";
import AdoptionFather from "./AdoptionFather";
import type { Pets } from "../../interfaces";

interface Props extends Pets {
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdoptionCards = ({
  onOpen,
  id,
  petname,
  age,
  gender,
  species,
}: Props) => {
  return (
    <AdoptionFather
      id={id}
      petname={petname}
      age={age}
      gender={gender}
      species={species}
    >
      <AdoptionButton onClick={() => onOpen(true)} />
    </AdoptionFather>
  );
};
export default AdoptionCards;
