import React, { useContext } from "react";
import AdoptionCards from "./AdoptionCards";
import { ModalFormContext } from "../../Context/ModalFormContext";
import AdoptionCardListFather from "./AdoptionCardListFather";
import { getServicesPets } from "../../Services/adoption.services";

type Props = {};
const URL = "http://localhost:4321/api/adoption";
const AdoptionCardList = (props: Props) => {
  const { data, loading, error } =  getServicesPets({});
  const { setIsOpen } = useContext(ModalFormContext);
  return (
    <AdoptionCardListFather>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      {data?.map((pet) => (
        <AdoptionCards
          onOpen={setIsOpen}
          key={pet.id}
          petname={pet.petname}
          id={pet.id}
          age={pet.age}
          gender={pet.gender}
          species={pet.species}
        />
      ))}
    </AdoptionCardListFather>
  );
};
export default AdoptionCardList;
