import {
  ModalFormContext,
  ModalFormProvider,
} from "../../../../Context/ModalFormContext";
import ModalForm from "../../../../layouts/ModalForm";
import CreateCardForm from "./CreateCardForm";
import CreateEventButton from "./CreateEventButton";
import CalendarEventsList from "./CalendarEventsList";
import { useContext, useState } from "react";

type Props = {};

export default function AdminContentCalendarEvents({}: Props) {
  const [page, setPage] = useState(1);
  
  return (
    <section className="w-full flex flex-col">
      <ModalFormProvider>
        <ModalForm>
          <CreateCardForm />
        </ModalForm>
        <CreateEventButton />
      </ModalFormProvider>

      <CalendarEventsList page={page} setPage={setPage} />
    </section>
  );
}
