import { useState } from "react";
import TextareaForm from "../Inputs/TextareaForm";
import OptionButtons from "../Inputs/OptionButtons";
import BackAndNext from "../Buttons/BackAndNext";
import Notes from "./Notes";
import FormContent from "../FormContent";

type FormData = {
  motivation: string;
};

type Props = {
  nextStep: any;
  prevStep: any;
};

const Motivaciones = ({ nextStep, prevStep }: Props) => {
  const [values, setValues] = useState<FormData>({
    motivation: "",
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
              Motivación y Responsabilidad
            </h4>
          </div>

          <div className=" flex flex-col justify-between h-full gap-5">
            <div className="flex flex-col gap-5">
              <TextareaForm
                name={""}
                placeholder={"Quiero adoptar porque ..."}
                isRequired={true}
                value={values.motivation}
                label={"¿Por qué desea adoptar una mascota?"}
                defaultValue={""}
                onChange={(inputValue) => {
                  handleChange("motivation", inputValue.target.value);
                }}
                errorMesage={
                  !values.motivation ? "Este campo es obligatorio" : undefined
                }
              />
              <OptionButtons
                label={"¿La mascota será para usted o para otra persona?"}
                first={"Para mi"}
                second={"Otra persona"}
              />

              <OptionButtons
                label={
                  "¿Está dispuesto/a a asumir todos los gastos que conlleva una mascota (alimentación, salud, vacunas, etc.)?"
                }
                first={"Si"}
                second={"No"}
              />
              <Notes
                noteText={"Nota: La esterilización está cubierta por nosotros."}
              ></Notes>

              <OptionButtons
                label={
                  " ¿Está de acuerdo con realizar un seguimiento mensual (enviar fotos o videos para saber del animal)?"
                }
                first={"Si"}
                second={"No"}
              />

              <OptionButtons
                label={
                  " En caso de que no pueda cuidar a la mascota en algún momento, ¿se compromete a contactarnos para buscar una solución en lugar de abandonarla?"
                }
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
export default Motivaciones;
