import { useState } from "react";
import TextareaForm from "../Inputs/TextareaForm";
import OptionButtons from "../Inputs/OptionButtons";

type FormData = {
  motivation: string;
};

const Motivaciones = () => {
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
      <form action="" className="py-9 px-10 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-center text-lg text-orange-400 font-semibold">
            Formulario de adopción
          </h3>
          <h4 className="text-center text-sm font-semibold text-lettersDark">
            Motivación y Responsabilidad
          </h4>
        </div>

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
          <div className="flex flex-col gap-3">
            <OptionButtons
              label={
                "¿Está dispuesto/a a asumir todos los gastos que conlleva una mascota (alimentación, salud, vacunas, etc.)?"
              }
              first={"Si"}
              second={"No"}
            />
            <p className="text-xs text-lettersDark">
              Nota: La esterilización está cubierta por nosotros.
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
export default Motivaciones;
