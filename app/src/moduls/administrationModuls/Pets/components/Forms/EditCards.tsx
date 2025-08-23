import React, { useState, useCallback } from "react";
import InputForm from "../../../../../components/Inputs/InputForm";
import OptionButtons from "../../../../../components/Inputs/OptionButtons";
import SendButton from "../../../../../components/Buttons/SendButton";
import UploadInput from "../../../../../components/Inputs/UploadInput";
import type { PetsType } from "../../../../../Domain/Types/PetsType";
import { useHandleUpdatePet } from "../../../../../Services/adoption.services";
import { PetsEnum } from "../../../../../Const/PetsEnum";

interface Props extends PetsType {
  onClose: () => void;
}
type FormData = {
  imgPet: string;
  namePet: string;
  agePet: string;
  speciesPet: string;
  genderPet: string;
};

const EditCards = ({
  id,
  petname,
  age,
  species,
  gender,
  img,
  onClose,
}: Props) => {
  const [values, setValues] = useState<FormData>({
    imgPet: img || "",
    namePet: petname,
    agePet: age.toString(),
    speciesPet: species || PetsEnum.perro,
    genderPet: gender || PetsEnum.macho,
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

  console.log(values.agePet);
  const { handleUpdatePet, loading, error } = useHandleUpdatePet();
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
    await handleUpdatePet({
      idUpdate: id,
      petnameUpdate: values.namePet,
      ageUpdate: parseInt(values.agePet),
      speciesUpdate: values.speciesPet,
      genderUpdate: values.genderPet,
      imgUpdateBase64: values.imgPet,
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
      className="flex flex-col max-sm:justify-between  w-80 max-sm:h-[100dvh] max-sm:w-full bg-white p-5 rounded-xl gap-5 z-50 "
    >
      <button
        type="button"
        className="rounded-full p-2 shadow-md self-end hover:translate-y-1 hover:shadow-none"
        onClick={onClose}
      >
        {" "}
        <img className="size-4" src="/Image/closeIcon.png" alt="" />
      </button>
      <div className="flex w-full max-sm:items-center">
        <div className="flex  w-full flex-col gap-2 max-sm:gap-4 ">
          <UploadInput
            previewURL={values.imgPet}
            onImageChange={handleImageChange}
            errorMessage={
              !values.imgPet ? "La imagen es obligatoria" : undefined
            }
          />
          <InputForm
            name={""}
            label={"Nombre de la mascota"}
            type={"text"}
            placeholderText={"Rocky"}
            errorMesage={
              !values.namePet ? "Este campo es obligatorio" : undefined
            }
            onChange={(inputValue) => {
              handleChange("namePet", inputValue.target.value.trim());
            }}
            isRequired={true}
            value={values.namePet}
            defaultValue={""}
          />
          <InputForm
            name={""}
            label={"Edad de la mascota"}
            type={"text"}
            placeholderText={"3 meses"}
            errorMesage={
              !values.agePet ? "Este campo es obligatorio" : undefined
            }
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
      </div>

      <div className="flex w-full justify-end text-shortLetters">
        <SendButton type={"submit"} />
      </div>
    </form>
  );
};
export default EditCards;
