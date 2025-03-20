import { useState } from "react";
import InputForm from "../Inputs/InputForm";
import OptionButtons from "../Inputs/OptionButtons";
import BackAndNext from "../Buttons/BackAndNext";
import FormContent from "../FormContent";

type FormData = {
  sleepPlace: string;
};
type Props = {
  nextStep: any;
  prevStep: any;
};

const HomeConditions = ({ nextStep, prevStep }: Props) => {
  const [values, setValues] = useState<FormData>({
    sleepPlace: "",
  });

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <FormContent>
        <div className="py-9 px-10 flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-1">
            <h3 className="text-center text-lg text-orange-400 font-semibold">
              Formulario de adopción
            </h3>
            <h4 className="text-center text-sm font-semibold text-lettersDark">
              Condiciones del Hogar
            </h4>
          </div>
          <div className=" flex flex-col justify-between h-full gap-5">
            <div className="flex flex-col gap-5">
              <OptionButtons
                label={" ¿Vive en casa propia o alquilada?"}
                first={"Propia"}
                second={"Alquiler"}
              />
              <OptionButtons
                label={
                  "Si es alquilada, ¿ha confirmado que permiten tener animales?"
                }
                first={"Si"}
                second={"No"}
              />
              <OptionButtons
                label={
                  "¿Cuenta con un espacio adecuado para la mascota? (Patio, portal, terraza, etc.)"
                }
                first={"Si"}
                second={"No"}
              />
              <InputForm
                name={""}
                label={"¿Dónde tiene pensado que duerma la mascota?"}
                type={"text"}
                placeholderText={"Ej: En una cesta con mantas..."}
                onChange={(inputValue) => {
                  handleChange("sleepPlace", inputValue.target.value);
                }}
                isRequired={true}
                value={values.sleepPlace}
                defaultValue={""}
                errorMesage={
                  !values.sleepPlace ? "Este campo es obligatorio" : undefined
                }
              />
              <OptionButtons
                label={" ¿La vivienda está asegurada para evitar escapes?"}
                first={"Si"}
                second={"No"}
              />
              <OptionButtons
                label={"¿Hay niños pequeños en casa?"}
                first={"Si"}
                second={"No"}
              />
              <OptionButtons
                label={"¿Hay algún alérgico o asmático en la casa?"}
                first={"Si"}
                second={"No"}
              />
            </div>
            <BackAndNext prevStep={prevStep} nextStep={nextStep}></BackAndNext>
          </div>
        </div>
      </FormContent>
    </>
  );
};
export default HomeConditions;
