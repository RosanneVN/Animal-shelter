import { ModalFormProvider } from "../../Context/ModalFormContext";
import ModalForm from "../../layouts/ModalForm";
import EditAdoptionCardList from "../../moduls/administrationModuls/Pets/components/EditAdoptionCardList";
import WarningMesage from "./WarningMesage";


export default function WarningMesageModal() {
  return (
    <>
      <section className="w-full">
        <ModalFormProvider>
          <ModalForm>
            <WarningMesage  />
          </ModalForm>
          <EditAdoptionCardList />
        </ModalFormProvider>
      </section>
    </>
  );
}
