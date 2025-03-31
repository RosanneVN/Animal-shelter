import React, { useContext, useState } from "react";
import InputForm from "../../../../components/Inputs/InputForm";
import OptionButtons from "../../../../components/Inputs/OptionButtons";
import { ModalFormContext } from "../../../../Context/ModalFormContext";
import SendButton from "../../../../components/Buttons/SendButton";
import UploadInput from "../../../../components/Inputs/UploadInput";

type Props = {};
type FormData = {
  imgPet: any;
  namePet: string;
  agePet: string;
};

const EditCards = (props: Props) => {
  const { setIsOpen } = useContext(ModalFormContext);
  const [values, setValues] = useState<FormData>({
    imgPet: "",
    namePet: "",
    agePet: "",
  });

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="flex flex-col w-80 max-sm:w-full bg-white p-5 rounded-xl gap-5 z-50 ">
      <button
        type="button"
        className="rounded-full p-2 shadow-md self-end hover:translate-y-1 hover:shadow-none"
        onClick={() => setIsOpen(false)}
      >
        {" "}
        <img className="size-4" src="/Image/closeIcon.png" alt="" />
      </button>

      <div className="flex flex-col gap-2">
        <UploadInput></UploadInput>
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
          first={"Hembra"}
          second={"Macho"}
        />
      </div>

      <div className="flex w-full justify-end text-shortLetters">
        <SendButton />
      </div>
    </div>
  );
};
export default EditCards;
