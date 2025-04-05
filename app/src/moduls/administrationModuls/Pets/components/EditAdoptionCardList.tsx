import AdoptionCardListFather from "../../../../components/AdoptionCardList/AdoptionCardListFather";
import EditAdoptionCards from "./EditAdoptionCards";
import { getServicesPets } from "../../../../Services/adoption.services";
import { useState } from "react";

type Props = {
  filterSpecie: string
};

const EditAdoptionCardList = ({filterSpecie}: Props) => {
 
  const { data, loading, error } =  getServicesPets({filterSpecie});

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <AdoptionCardListFather>
      {error && <p>Error: {error}</p>}
      {data?.map((pet) => (
        <EditAdoptionCards
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
export default EditAdoptionCardList;
