import { useEffect, useState } from "react";
import { ModalFormProvider } from "../../../../Context/ModalFormContext";
import ModalForm from "../../../../layouts/ModalForm";
import CreatePetsButton from "./CreatePetsButton";
import EditAdoptionCardList from "./EditAdoptionCardList";
import CreateCards from "./Forms/CreateCards";
import PetsFilterTest from "./PetsFilterTest";
import SearchBar from "./SearchBar";

export default function AdminContendCards() {
  const [filterSpecie, setFilterSpecie] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = (search: string) => {
    setSearchFilter(search);
    setPage(1);
  };

  const handleSpecie = (specie: string) => {
    setFilterSpecie(specie);
    setPage(1);
  };
  return (
    <>
      <section className="w-full">
        <ModalFormProvider>
          <ModalForm>
            <CreateCards />
          </ModalForm>
          <PetsFilterTest onFilterChange={handleSpecie} />
          <SearchBar onSearch={handleSearch} />
          <CreatePetsButton />
        </ModalFormProvider>
        <EditAdoptionCardList
          setPage={setPage}
          page={page}
          filterSpecie={filterSpecie}
          searchFilter={searchFilter}
        />
      </section>
    </>
  );
}
