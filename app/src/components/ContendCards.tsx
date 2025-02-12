import { ModalFormProvider } from "../Context/ModalFormContext";
import AdoptionCardList from "./AdoptionCardList/AdoptionCardList";
import ModalForm from "./ModalForm";

export default function ContendCards() {
  return (
    <>
      <section className=" w-full">
        <ModalFormProvider>
          <ModalForm></ModalForm>
          <AdoptionCardList />
        </ModalFormProvider>
      </section>
    </>
  );
}
