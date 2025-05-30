import { FormAdoptionReqProvider } from "../Context/FormAdoptionReqContext";
import { ModalFormProvider } from "../Context/ModalFormContext";
import ModalForm from "../layouts/ModalForm";
import AdoptionCardList from "./AdoptionCardList/AdoptionCardList";
import Stepper from "./Forms/Stepper";

export default function ContendCards() {
  return (
    <>
      <section className="w-full">
        <ModalFormProvider>
          <FormAdoptionReqProvider>
            <ModalForm>
              <Stepper />
            </ModalForm>
            <AdoptionCardList />
          </FormAdoptionReqProvider>
        </ModalFormProvider>
      </section>
    </>
  );
}
