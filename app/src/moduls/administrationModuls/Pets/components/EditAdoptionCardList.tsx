import AdoptionCardListFather from "../../../../components/AdoptionCardList/AdoptionCardListFather";
import EditAdoptionCards from "./EditAdoptionCards";
import { getServicesPets } from "../../../../Services/adoption.services";

type Props = {
  filterSpecie: string;
  searchFilter: string;
 limit: number;
  page: number;
};

const EditAdoptionCardList = ({ filterSpecie, searchFilter, limit, page }: Props) => {
  const { data, loading, error } = getServicesPets({
    filterSpecie,
    searchFilter,
    limit,
    page,
  });

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
