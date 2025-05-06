import React, { type MouseEvent } from "react";
import AdoptionButton from "../Buttons/AdoptionButton";
import AdoptionFather from "./AdoptionFather";
import type { PetsType } from "../../Domain/Types/PetsType";

interface Props extends PetsType {
  onOpen: () => void;
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
      <AdoptionButton onClick={() => onOpen()} />
    </AdoptionFather>
  );
};
export default AdoptionCards;
