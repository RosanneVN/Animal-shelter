import { ModalFormProvider } from "../../../../Context/ModalFormContext";
import ModalForm from "../../../../layouts/ModalForm";
import CreateCardForm from "./CreateCardForm";
import CreateEventButton from "./CreateEventButton";
import CalendarEventsList from "./CalendarEventsList";

type Props = {};

export default function AdminContentCalendarEvents({}: Props) {
  return (
    <section className="w-full flex flex-col">
      <ModalFormProvider>
        <ModalForm>
          <CreateCardForm />
        </ModalForm>
        <CreateEventButton />
      </ModalFormProvider>

      <CalendarEventsList  />
    </section>
  );
}
