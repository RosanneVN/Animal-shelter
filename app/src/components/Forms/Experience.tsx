import { useState } from "react";
import InputForm from "../Inputs/InputForm";
import OptionButtons from "../Inputs/OptionButtons";
import BackAndNext from "../Buttons/BackAndNext";

type FormData = {
  family: string;
  pets?: number;
};

const Experience = () => {
  const [values, setValues] = useState<FormData>({
    family: "",
    pets: undefined,
  });

  const handleChange = (field: keyof typeof values, value: string | number) => {
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
              Convivencia Familiar y Experiencia
            </h4>
          </div>
          <div className=" flex flex-col justify-between h-full gap-5">
            <div className="flex flex-col gap-5">
              <InputForm
                name={""}
                label={"¿Con quién vive actualmente?"}
                type={"text"}
                placeholderText={"Ej: En una cesta con mantas..."}
                onChange={(inputValue) => {
                  handleChange("family", inputValue.target.value);
                }}
                isRequired={true}
                value={values.family}
                defaultValue={""}
                errorMesage={
                  !values.family ? "Este campo es obligatorio" : undefined
                }
              />
              <OptionButtons
                label={"¿Todos están de acuerdo con la adopción?"}
                first={"Si"}
                second={"No"}
              />
              <InputForm
                name={""}
                label={"¿Qué otras mascotas hay en casa actualmente?"}
                type={"number"}
                placeholderText={"Ej: 3"}
                onChange={(inputValue) => {
                  handleChange("pets", inputValue.target.value);
                }}
                isRequired={true}
                value={values.pets}
                defaultValue={""}
                errorMesage={
                  !values.pets ? "Este campo es obligatorio" : undefined
                }
              />
              <OptionButtons
                label={"¿Ha tenido anteriormente un perro o gato?"}
                first={"Si"}
                second={"No"}
              />
              <OptionButtons
                label={"Si es así, ¿sigue vivo o falleció?"}
                first={"Sigue vivo"}
                second={"Fallecio"}
              />
             
            </div>
            <BackAndNext></BackAndNext>
          </div>
        </div>
      </form>
    </>
  );
};
export default Experience;
