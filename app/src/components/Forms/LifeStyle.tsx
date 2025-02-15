import { useState } from "react";
import BackAndNext from "../Buttons/BackAndNext";
import OptionButtons from "../Inputs/OptionButtons";
import InputForm from "../Inputs/InputForm";

type FormData = {
  ifTravel: string;
};

const LifeStyle = () => {
  const [values, setValues] = useState<FormData>({
    ifTravel: "",
  });

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <>
      <form
        action=""
        className="w-[60%] rounded-xl flex flex-col overflow-auto"
      >
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
              <OptionButtons
                label={"¿Trabaja o estudia?"}
                first={"Trabajo"}
                second={"Estudio"}
              />
              <OptionButtons
                label={"¿Tiene planes de viajar en el futuro?"}
                first={"Si"}
                second={"No"}
              />
              <InputForm
                name={""}
                label={
                  "Si responde “sí,” ¿qué pasará con la mascota durante ese tiempo?"
                }
                type={"text"}
                placeholderText={"Se quedara con..."}
                errorMesage={
                  !values.ifTravel ? "Este campo es obligatorio" : undefined
                }
                onChange={(inputValue) => {
                  handleChange("ifTravel", inputValue.target.value.trim());
                }}
                isRequired={true}
                value={values.ifTravel}
                defaultValue={""}
              />
              <OptionButtons
                label={
                  "En caso de ausencia prolongada, ¿tiene a alguien de confianza que pueda cuidar a la mascota?"
                }
                first={"Si"}
                second={"No"}
              />
            </div>
            <BackAndNext />
          </div>
        </div>
      </form>
    </>
  );
};
export default LifeStyle;
