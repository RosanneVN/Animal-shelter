import AdoptionCardList from "../../../../components/AdoptionCardList/AdoptionCardListFather";
import { ModalFormProvider } from "../../../../Context/ModalFormContext";
import ModalForm from "../../../../layouts/ModalForm";
import CreatePetsButton from "./CreatePetsButton";
import EditAdoptionCardList from "./EditAdoptionCardList";
import EditCards from "./EditCards";

export default function AdminContendCards() {
  return (
    <>
      <section className="w-full">
        <ModalFormProvider>
          <ModalForm>
            <></>
          </ModalForm>
        </ModalFormProvider>
        <CreatePetsButton />
        <EditAdoptionCardList />
      </section>
    </>
  );
}
