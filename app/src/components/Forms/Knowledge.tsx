import { useState } from "react";
import BackAndNext from "../Buttons/BackAndNext";
import OptionButtons from "../Inputs/OptionButtons";
import TextareaForm from "../Inputs/TextareaForm";
import Notes from "./Notes";
import FormContent from "../FormContent";

type FormData = {
  opnion: string;
};
type Props = {
  nextStep: any;
  prevStep: any;
};

const Knowledge = ({ nextStep, prevStep }: Props) => {
  const [values, setValues] = useState<FormData>({
    opnion: "",
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
              Conocimientos y Opiniones
            </h4>
          </div>

          <div className=" flex flex-col justify-between h-full gap-5">
            <div className="flex flex-col gap-5">
              <OptionButtons
                label={"¿Conoce algún veterinario en su zona?"}
                first={"Para mi"}
                second={"Otra persona"}
              />
              <OptionButtons
                label={"¿Conoce el esquema de vacunación y desparasitación?"}
                first={"Para mi"}
                second={"Otra persona"}
              />
              <Notes
                noteText={
                  "Nota: Es fundamental mantener estas atenciones al día, sin importar la raza o tipo de mascota."
                }
              ></Notes>
              <TextareaForm
                name={""}
                placeholder={"Yo creo que..."}
                isRequired={true}
                value={values.opnion}
                label={
                  "¿Qué opina sobre la esterilización (castrar machos o ligar hembras)"
                }
                defaultValue={""}
                onChange={(inputValue) => {
                  handleChange("opnion", inputValue.target.value);
                }}
                errorMesage={
                  !values.opnion ? "Este campo es obligatorio" : undefined
                }
              />
            </div>
            <BackAndNext prevStep={prevStep} nextStep={nextStep}></BackAndNext>
          </div>
        </div>
      </FormContent>
    </>
  );
};
export default Knowledge;
