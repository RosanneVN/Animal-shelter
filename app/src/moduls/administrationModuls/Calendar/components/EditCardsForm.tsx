import React, { useCallback, useState } from "react";
import SendButton from "../../../../components/Buttons/SendButton";
import InputForm from "../../../../components/Inputs/InputForm";
import type { CalendarEventsType } from "../../../../Domain/Types/CalendarEventsType";
import { useHandleUpdateCalendarEvents } from "../../../../Services/calendarEvents";
import UploadInput from "../../../../components/Inputs/UploadInput";

interface Props extends CalendarEventsType {
  onClose: () => void;
}
type FormData = { 
  date: string;
  location: string;
  description: string;
  title: string;
  img: string;
};

export default function EditCardsForm({
  id,
  date,
  location,
  description,
  title,
  img,
  onClose,
}: Props) {
  const [values, setValues] = useState<FormData>({
    date: date,
    location: location,
    description: description,
    title: title,
    img: img || "",
  });

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = useCallback((base64: string | null) => {
    setValues((prev) => ({
      ...prev,
      img: base64 || "",
    }));
  }, []);

  const { handleUpdateCalendarEvents, loading, error } =
    useHandleUpdateCalendarEvents();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.date || !values.location || !values.description || !values.img) {
      alert("Todos los campos deben estar seleccionados, incluyendo la imagen");
      return;
    }
    if (loading) {
      return;
    }
    await handleUpdateCalendarEvents({
      idUpdate: id,
      dateUpdate: values.date,
      locationUpdate: values.location,
      descriptionUpdate: values.description,
      imgUpdateBase64: values.img,
      titleUpdate: values.title,
    });
    if (error) {
      return;
    }
    onClose();
    window.location.reload();
  };
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={(e) => submit(e)}
      className="flex flex-col w-80 max-sm:w-full bg-white p-5 rounded-xl gap-5 z-50 "
    >
      <button
        type="button"
        className="rounded-full p-2 shadow-md self-end hover:translate-y-1 hover:shadow-none"
        onClick={onClose}
      >
        {" "}
        <img className="size-4" src="/Image/closeIcon.png" alt="" />
      </button>{" "}
      <div className="flex flex-col gap-2">
         <UploadInput
          onImageChange={handleImageChange}
          errorMessage={!values.img ? "La imagen es obligatoria" : undefined}
        />
          <InputForm
          name={""}
          label={"Nombre del evento"}
          type={"text"}
          placeholderText={"Feria de adopciones de mascotas..."}
          errorMesage={!values.title ? "Este campo es obligatorio" : undefined}
          onChange={(inputValue) => {
            handleChange("title", inputValue.target.value.trim());
          }}
          isRequired={true}
          value={values.title}
          defaultValue={""}
        />
        <InputForm
          name={""}
          label={"Fecha y hora del evento"}
          type={"text"}
          placeholderText={" 20 de mayo de 2022, 11:00 AM"}
          errorMesage={!values.date ? "Este campo es obligatorio" : undefined}
          onChange={(inputValue) => {
            handleChange("date", inputValue.target.value.trim());
          }}
          isRequired={true}
          value={values.date}
          defaultValue={""}
        />
        <InputForm
          name={""}
          label={"Lugar del evento"}
          type={"text"}
          placeholderText={"Playa, Jaimanitas"}
          errorMesage={!values.location ? "Este campo es obligatorio" : undefined}
          onChange={(inputValue) => {
            handleChange("location", inputValue.target.value.trim());
          }}
          isRequired={true}
          value={values.location}
          defaultValue={""}
        />
        <InputForm
          name={""}
          label={"Descripción del evento"}
          type={"text"}
          placeholderText={"Feria de adopciones de mascotas..."}
          errorMesage={!values.description ? "Este campo es obligatorio" : undefined}
          onChange={(inputValue) => {
            handleChange("description", inputValue.target.value.trim());
          }}
          isRequired={true}
          value={values.description}
          defaultValue={""}
        />
      </div>
      <div className="flex w-full justify-end text-shortLetters">
        <SendButton type={"submit"} />
      </div>
    </form>
  );
}
