import React, { useContext, useState, useCallback } from "react";
import OptionButtons from "../../../../../components/Inputs/OptionButtons";
import { PetsEnum } from "../../../../../Const/PetsEnum";
import InputForm from "../../../../../components/Inputs/InputForm";
import UploadInput from "../../../../../components/Inputs/UploadInput";
import { useHandleCreatePet } from "../../../../../Services/adoption.services";
import SendButton from "../../../../../components/Buttons/SendButton";
import { ModalFormContext } from "../../../../../Context/ModalFormContext";

type FormData = {
  imgPet: string;
  namePet: string;
  agePet: string;
  speciesPet: string;
  genderPet: string;
};

export default function CreateCards() {
  const { setIsOpen } = useContext(ModalFormContext);
  const [values, setValues] = useState<FormData>({
    imgPet: "",
    namePet: "",
    agePet: "",
    speciesPet: "",
    genderPet: "",
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
      imgPet: base64 || "",
    }));
  }, []);

  const { handleCreatePet, loading, error } = useHandleCreatePet();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !values.genderPet ||
      !values.speciesPet ||
      !values.namePet ||
      !values.agePet ||
      !values.imgPet
    ) {
      alert("Todos los campos deben estar seleccionados, incluyendo la imagen");
      return;
    }

    if (loading) {
      return;
    }

    await handleCreatePet({
      petnameNew: values.namePet,
      ageNew: parseInt(values.agePet),
      speciesNew: values.speciesPet,
      genderNew: values.genderPet,
      imgNewBase64: values.imgPet,
    });
    if (error) {
      return;
    }
    setIsOpen(false);
    window.location.reload();
  };
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  const validateNoSpecialChars = (value: string): string | undefined => {
    // Permite letras, espacios, acentos y ñ
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*$/;
    if (!value) return "Este campo es obligatorio";
    if (!regex.test(value)) return "No se permiten caracteres especiales";
    return undefined;
  };

  const [nameError, setNameError] = useState<string | undefined>(undefined);

  //el form  tiene una funcion submit que significa q el boton que tenga el type
  // submit se ejecuta cuando se envia el formulario
  return (
    <form
      onSubmit={(e) => submit(e)}
      className="flex flex-col w-80 max-sm:w-full bg-white p-5 rounded-xl gap-5 z-50 "
    >
      <button
        type="button"
        className="rounded-full p-2 shadow-md self-end hover:translate-y-1 hover:shadow-none"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        {" "}
        <img className="size-4" src="/Image/closeIcon.png" alt="" />
      </button>{" "}
      <div className="flex flex-col gap-2">
        <UploadInput
          onImageChange={handleImageChange}
          errorMessage={!values.imgPet ? "La imagen es obligatoria" : undefined}
        />
        <InputForm
          name={""}
          label={"Nombre de la mascota"}
          type={"text"}
          placeholderText={"Rocky"}
          errorMesage={
            !values.namePet ? "Este campo es obligatorio" : nameError
          }
          onChange={(inputValue) => {
            const value = inputValue.target.value.trim();
            setNameError(validateNoSpecialChars(value));
            handleChange("namePet", value);
          }}
          isRequired={true}
          value={values.namePet}
          defaultValue={""}
        />
        <InputForm
          name={""}
          label={"Edad de la mascota"}
          type={"text"}
          placeholderText={" 3 meses"}
          errorMesage={!values.agePet ? "Este campo es obligatorio" : undefined}
          onChange={(inputValue) => {
            handleChange("agePet", inputValue.target.value.trim());
          }}
          isRequired={true}
          value={values.agePet}
          defaultValue={""}
        />
        <OptionButtons
          label={"Seleccione el sexo de la mascota"}
          first={PetsEnum.hembra}
          second={PetsEnum.macho}
          selectedValue={values.genderPet}
          onChange={(value) => {
            handleChange("genderPet", value);
          }}
        />
        <OptionButtons
          label={"Seleccione la especie de la mascota"}
          first={PetsEnum.gato}
          second={PetsEnum.perro}
          selectedValue={values.speciesPet}
          onChange={(value) => {
            handleChange("speciesPet", value);
          }}
        />
      </div>
      <div className="flex w-full justify-end text-shortLetters">
        <SendButton type={"submit"} />
      </div>
    </form>
  );
}
