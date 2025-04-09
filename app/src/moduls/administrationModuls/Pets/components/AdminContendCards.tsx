import { useState } from "react";
import { ModalFormProvider } from "../../../../Context/ModalFormContext";
import ModalForm from "../../../../layouts/ModalForm";
import CreatePetsButton from "./CreatePetsButton";
import EditAdoptionCardList from "./EditAdoptionCardList";
import CreateCards from "./Forms/CreateCards";
import PetsFilterTest from "./PetsFilterTest";
import SearchBar from "./SearchBar";
import PaginationComponents from "./PaginationComponents";

export default function AdminContendCards() {
  const [filterSpecie, setFilterSpecie] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 2;
  return (
    <>
      <section className="w-full">
        <ModalFormProvider>
          <ModalForm>
            <CreateCards />
          </ModalForm>
          <PetsFilterTest onFilterChange={setFilterSpecie} />
          <SearchBar onSearch={setSearchFilter} />
          <CreatePetsButton />
        </ModalFormProvider>
        <EditAdoptionCardList
          filterSpecie={filterSpecie}
          searchFilter={searchFilter}
          limit={limit}
          page={page}
        />
        <PaginationComponents
          page={page}
          onNext={() => setPage(page + 1)}
          onBack={() => setPage(page - 1)}
        />
      </section>
    </>
  );
}
