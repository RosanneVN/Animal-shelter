import { useContext, useState } from "react";
import BackAndNext from "../Buttons/BackAndNext";
import OptionButtons from "../Inputs/OptionButtons";
import InputForm from "../Inputs/InputForm";
import FormContent from "../FormContent";
import { FormAdoptionReq } from "../../Datas/FormAdoptiobReq";
import type { FormLifeStyleType } from "../../Domain/Types/FormAdoptionReqType";
import { FormAdoptionReqContext } from "../../Context/FormAdoptionReqContext";

type Props = {
  nextStep: any;
  prevStep: any;
};

const LifeStyle = ({ nextStep, prevStep }: Props) => {
  const [values, setValues] = useState<FormLifeStyleType>(
    FormAdoptionReq.LifeStyle
  );

  const { setRequestsValues } = useContext(FormAdoptionReqContext);
  const handleNext = () => {
    if (!values.job || !values.iftravel || !values.otherHouse) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }
    const finalValues = { ...values };
    if (finalValues.iftravel === "No") {
      finalValues.petIfTravel = "No pienso viajar";
    }

    setRequestsValues((prev) => ({
      ...prev,
      LifeStyle: finalValues,
    }));
    nextStep();
  };

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
              Estilo de Vida y Planificación
            </h4>
          </div>

          <div className=" flex flex-col justify-between h-full gap-5">
            <div className="flex flex-col gap-5">
              <OptionButtons
                label={"¿Trabaja o estudia?"}
                first={"Trabajo"}
                second={"Estudio"}
                selectedValue={values.job}
                onChange={(value) => {
                  handleChange("job", value);
                }}
              />
              <OptionButtons
                label={"¿Tiene planes de viajar en el futuro?"}
                first={"Si"}
                second={"No"}
                selectedValue={values.iftravel}
                onChange={(value) => {
                  handleChange("iftravel", value);
                }}
              />
              <InputForm
                name={""}
                label={
                  "Si responde “sí,” ¿qué pasará con la mascota durante ese tiempo?"
                }
                type={"text"}
                placeholderText={"Se quedara con..."}
                onChange={(inputValue) => {
                  handleChange("petIfTravel", inputValue.target.value.trim());
                }}
                isRequired={true}
                value={values.petIfTravel}
                defaultValue={""}
              />
              <OptionButtons
                label={
                  "En caso de ausencia prolongada, ¿tiene a alguien de confianza que pueda cuidar a la mascota?"
                }
                first={"Si"}
                second={"No"}
                selectedValue={values.otherHouse}
                onChange={(value) => {
                  handleChange("otherHouse", value);
                }}
              />
            </div>
            <BackAndNext
              prevStep={prevStep}
              nextStep={handleNext}
            ></BackAndNext>
          </div>
        </div>
      </FormContent>
    </>
  );
};
export default LifeStyle;
