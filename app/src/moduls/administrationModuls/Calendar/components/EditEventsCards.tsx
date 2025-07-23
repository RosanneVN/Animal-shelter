import React, { useState } from "react";
import EventCards from "./EventCards";
import WarningMesage from "../../../../components/administrationComponents/WarningMesage";
import ModalFormContainer from "../../../../layouts/ModalFormContainer";
import { useHandleDeleteCalendarEvents } from "../../../../Services/calendarEvents";
import type { CalendarEventsType } from "../../../../Domain/Types/CalendarEventsType";
import EditCardsForm from "./EditCardsForm";

export default function EditEventsCards({
  id,
  date,
  location,
  description,
  title,
  img,
}: CalendarEventsType) {
  //isEdit es para abrir y cerrar el modal de creacion
  const [isEdit, setIsEdit] = useState(false);
  //isDelete es para abrir y cerrar el modal de confirmacion
  const [isDelete, setIsDelete] = useState(false);
  const { handleDeleteCalendarEvents, loading, error } =
    useHandleDeleteCalendarEvents();

  const deleteEvent = async () => {
    if (loading) {
      return;
    }
    setIsDelete(false);
    await handleDeleteCalendarEvents(id);
    window.location.reload();
  };
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <EventCards
        id={id}
        date={date}
        location={location}
        title={title}
        description={description}
        img={img}
        onEdit={()=>{setIsEdit(true)}}
        onDelete={()=>{setIsDelete(true)}}
      />

      <ModalFormContainer
        isOpen={isEdit}
        onClose={() => {
          setIsEdit(false);
        }}
      >
        <EditCardsForm
          id={id}
          date={date}
          title={title}
          location={location}
          description={description}
          img={img}
          onClose={() => {
            setIsEdit(false);
          }}
        />
      </ModalFormContainer>

      <ModalFormContainer
        isOpen={isDelete}
        onClose={() => {
          setIsDelete(false);
        }}
      >
        <WarningMesage
          onClick={deleteEvent}
          onClose={() => {
            setIsDelete(false);
          }}
        />
      </ModalFormContainer>
    </>
  );
}
