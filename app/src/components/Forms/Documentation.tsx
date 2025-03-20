import { useState } from "react";
import BackAndNext from "../Buttons/BackAndNext";
import InputForm from "../Inputs/InputForm";
import OptionButtons from "../Inputs/OptionButtons";
import Notes from "./Notes";
import FormContent from "../FormContent";

type FormData = {
  docId?: any;
};
type Props = {
  nextStep?: any;
  prevStep: any;
};

const Documentation = ({ nextStep, prevStep }: Props) => {
  const [values, setValues] = useState<FormData>({
    docId: undefined,
  });

  const handleChange = (
    field: keyof typeof values,
    value: string | number | boolean
  ) => {
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
              Datos Personales
            </h4>
          </div>

          <div className=" flex flex-col justify-between h-full gap-5">
            <div className="flex flex-col gap-5">
              <InputForm
                name={""}
                label={
                  "Envíenos una foto de su carnet de identidad (frontal y trasera)"
                }
                type={"file"}
                placeholderText={""}
                errorMesage={
                  !values.docId ? "Este campo es obligatorio" : undefined
                }
                onChange={(inputValue) => {
                  handleChange("docId", inputValue.target.value.trim());
                }}
                isRequired={true}
                value={values.docId}
                defaultValue={""}
              />
              <Notes
                noteText={
                  "Nota: Recuerde que al adoptar se compromete a cuidar a la mascota durante toda su vida. Nunca regale ni abandone al animal bajo ninguna circunstancia. Si tiene algún problema, contáctenos de inmediato para buscar una solución."
                }
              ></Notes>
              <OptionButtons
                label={"¿Está de acuerdo con todas las condiciones anteriores?"}
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
export default Documentation;
