import AdoptionCardList from "../../../../components/AdoptionCardList/AdoptionCardListFather";
import { ModalFormProvider } from "../../../../Context/ModalFormContext";
import ModalForm from "../../../../layouts/ModalForm";
import CreatePetsButton from "./CreatePetsButton";
import EditAdoptionCardList from "./EditAdoptionCardList";
import CreateCards from "./Forms/CreateCards";

export default function AdminContendCards() {
  return (
    <>
      <section className="w-full">
        <ModalFormProvider>
          <ModalForm>
            <CreateCards />
          </ModalForm>
          <CreatePetsButton />
        </ModalFormProvider>
        <EditAdoptionCardList />
      </section>
    </>
  );
}
