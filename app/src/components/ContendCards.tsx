import { ModalFormProvider } from "../Context/ModalFormContext";
import AdoptionCardList from "./AdoptionCardList/AdoptionCardList";
import ModalForm from "../layouts/ModalForm";
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
