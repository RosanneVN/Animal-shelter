import AdoptionCardListFather from "../../../../components/AdoptionCardList/AdoptionCardListFather";
import EditAdoptionCards from "./EditAdoptionCards";
import { getServicesPets } from "../../../../Services/adoption.services";
import PaginationComponents from "../../PaginationComponents";


type Props = {
  filterSpecie: string;
  searchFilter: string;
  page:number;
  setPage:any
};

const EditAdoptionCardList = ({ filterSpecie, searchFilter,page,setPage }: Props) => {
 
  const limit = 8;
  
  const { data, loading, error, pagination } = getServicesPets({
    filterSpecie,
    searchFilter,
    page,
    limit,
  });
  console.log(pagination);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
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
            img={pet.img}
          />
        ))}
      </AdoptionCardListFather>

      <PaginationComponents
        page={page}
        totalPages={pagination.totalPages}
        onNext={() => {
          if (page < pagination.totalPages) {
            setPage(page + 1);
          }
        }}
        onBack={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      />
    </>
  );
};
export default EditAdoptionCardList;
