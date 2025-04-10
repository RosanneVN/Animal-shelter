import { ModalFormProvider } from "../Context/ModalFormContext";
import ModalForm from "../layouts/ModalForm";
import AdoptionCardList from "./AdoptionCardList/AdoptionCardList";
import Stepper from "./Forms/Stepper";

export default function ContendCards() {
  return (
    <>
      <section className="w-full">
        <ModalFormProvider>
          <ModalForm>
            <Stepper />
          </ModalForm>
          <AdoptionCardList />
        </ModalFormProvider>
      </section>
    </>
  );
}
