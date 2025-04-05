import { useState } from "react";
import { ModalFormProvider } from "../../../../Context/ModalFormContext";
import ModalForm from "../../../../layouts/ModalForm";
import CreatePetsButton from "./CreatePetsButton";
import EditAdoptionCardList from "./EditAdoptionCardList";
import CreateCards from "./Forms/CreateCards";
import PetsFilterTest from "./PetsFilterTest";

export default function AdminContendCards() {
   const [filterSpecie, setFilterSpecie] = useState("");
  return (
    <>
      <section className="w-full">
        <ModalFormProvider>
          <ModalForm>
            <CreateCards />
          </ModalForm>
          <PetsFilterTest onFilterChange={setFilterSpecie} />
          <CreatePetsButton />
        </ModalFormProvider>
        <EditAdoptionCardList filterSpecie={filterSpecie}/>
      </section>
    </>
  );
}
