import { useState } from "react";
import InputForm from "../Inputs/InputForm";

type FormData = {
  fullName: string;
  age?: number;
  address: string;
  cellPhone?: string | number;
  alternativeCellPhone?: string | number;
};

const PersonalData = () => {
  const [values, setValues] = useState<FormData>({
    fullName: "",
    age:undefined ,
    cellPhone: undefined,
    alternativeCellPhone: undefined,
    address: "",
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
      <form action="" className="py-9 px-10 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-center text-lg text-orange-400 font-semibold">
            Formulario de adopción
          </h3>
          <h4 className="text-center text-sm font-semibold text-lettersDark">
            Datos Personales
          </h4>
        </div>

        <div className="flex flex-col gap-5">
          <InputForm
            name={""}
            label={"Nombre completo"}
            type={"text"}
            placeholderText={"Ej: Rosanne Vazquez"}
            errorMesage={""}
            onChange={(inputValue) => {
              handleChange("fullName", inputValue.target.value);
            }}
            isRequired={true}
            value={values.fullName}
            defaultValue={""}
          />
          <InputForm
            name={""}
            label={"Edad"}
            type={"number"}
            placeholderText={"23"}
            errorMesage={""}
            onChange={(inputValue) => {
              handleChange("age", inputValue.target.value);
            }}
            isRequired={true}
            value={values.age}
            defaultValue={""}
          />
          <InputForm
            name={""}
            label={"Dirección de residencia (Municipio)"}
            type={"text"}
            placeholderText={"5ta A / 238 y 240 #23810, Playa, Jaimanistas"}
            errorMesage={""}
            onChange={(inputValue) => {
              handleChange("address", inputValue.target.value);
            }}
            isRequired={true}
            value={values.address}
            defaultValue={""}
          />
          <InputForm
            name={""}
            label={"Teléfono de contacto principal"}
            type={"tel"}
            placeholderText={"56 77 52 45"}
            errorMesage={""}
            onChange={(inputValue) => {
              handleChange("cellPhone", inputValue.target.value.trim());
            }}
            isRequired={true}
            value={values.cellPhone}
            defaultValue={""}
          />
          <InputForm
            name={""}
            label={"Teléfono alternativo (familiar o amigo cercano)"}
            type={"tel"}
            placeholderText={"56 77 52 45"}
            errorMesage={""}
            onChange={(inputValue) => {
              handleChange("alternativeCellPhone", inputValue.target.value.trim());
            }}
            isRequired={true}
            value={values.alternativeCellPhone}
            defaultValue={""}
          />
        </div>
      </form>
    </>
  );
};
export default PersonalData;
