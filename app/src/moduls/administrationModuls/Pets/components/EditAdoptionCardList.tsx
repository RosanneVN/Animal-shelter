import AdoptionCardListFather from "../../../../components/AdoptionCardList/AdoptionCardListFather";
import EditAdoptionCards from "./EditAdoptionCards";
import { getServicesPets } from "../../../../Services/adoption.services";

type Props = {};

const EditAdoptionCardList = (props: Props) => {
  const { data, loading, error } =  getServicesPets();

  return (
    <AdoptionCardListFather>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
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
