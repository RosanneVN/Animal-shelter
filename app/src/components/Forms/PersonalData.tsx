import { useContext, useState } from "react";
import InputForm from "../Inputs/InputForm";
import BackAndNext from "../Buttons/BackAndNext";
import FormContent from "../FormContent";
import { FormAdoptionReq } from "../../Datas/FormAdoptiobReq";
import type { FormPersonalDataType } from "../../Domain/Types/FormAdoptionReqType";
import { FormAdoptionReqContext } from "../../Context/FormAdoptionReqContext";

type Props = {
  nextStep: any;
  prevStep?: any;
};

const PersonalData = ({ nextStep }: Props) => {
  const [values, setValues] = useState<FormPersonalDataType>(
    FormAdoptionReq.PersonalData
  );
  const { setRequestsValues } = useContext(FormAdoptionReqContext);
  const handleNext = () => {
    setRequestsValues((prev) => ({
      ...prev,
      PersonalData: {
        address:values.address,
        fullname:values.fullname,
        age:Number(values.age),
        id:values.id,
        alternativeCellPhone:Number(values.alternativeCellPhone),
        cellPhone:Number(values.cellPhone)
      },
    }));
    nextStep()
  };
  const handleChange = (
    field: keyof typeof values,
    value: string | number | boolean
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

  };

  const getEdadError = () => {
    const num = Number(values.age);
    if (num < 18) {
      return "Edad minima 18";
    }

    if (num > 100) {
      return "Edad maxima 100";
    }
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
                label={"Nombre completo"}
                type={"text"}
                placeholderText={"Ej: Rosanne Vazquez"}
                onChange={(inputValue) => {
                  handleChange("fullname", inputValue.target.value);
                }}
                isRequired={true}
                value={values.fullname}
                defaultValue={""}
                errorMesage={
                  !values.fullname ? "Este campo es obligatorio" : undefined
                }
              />
              <InputForm
                name={""}
                label={"Edad"}
                type={"number"}
                placeholderText={"23"}
                errorMesage={getEdadError()}
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
                errorMesage={
                  !values.address ? "Este campo es obligatorio" : undefined
                }
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
                errorMesage={
                  !values.cellPhone ? "Este campo es obligatorio" : undefined
                }
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
                errorMesage={
                  !values.alternativeCellPhone
                    ? "Este campo es obligatorio"
                    : undefined
                }
                onChange={(inputValue) => {
                  handleChange(
                    "alternativeCellPhone",
                    inputValue.target.value.trim()
                  );
                }}
                isRequired={true}
                value={values.alternativeCellPhone}
                defaultValue={""}
              />
            </div>
            {/*botones de siguiente*/}
            <BackAndNext prevStep={undefined} nextStep={handleNext}></BackAndNext>
          </div>
        </div>
      </FormContent>
    </>
  );
};
export default PersonalData;
