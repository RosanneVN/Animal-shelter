import { useContext, useState } from "react";
import TextareaForm from "../Inputs/TextareaForm";
import OptionButtons from "../Inputs/OptionButtons";
import BackAndNext from "../Buttons/BackAndNext";
import Notes from "./Notes";
import FormContent from "../FormContent";
import type { FormMotivacionesType } from "../../Domain/Types/FormAdoptionReqType";
import { FormAdoptionReq } from "../../Datas/FormAdoptiobReq";
import { FormAdoptionReqContext } from "../../Context/FormAdoptionReqContext";

type Props = {
  nextStep: any;
  prevStep: any;
};

const Motivaciones = ({ nextStep, prevStep }: Props) => {
  const [values, setValues] = useState<FormMotivacionesType>(
    FormAdoptionReq.Motivaciones
  );

  const { setRequestsValues } = useContext(FormAdoptionReqContext);
  const handleNext = () => {
    if (
      !values.motivation ||
      !values.forWho ||
      !values.petMoney ||
      !values.petFollowing ||
      !values.notAbandoned
    ) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }
    setRequestsValues((prev) => ({
      ...prev,
      Motivaciones: values,
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
                selectedValue={values.forWho}
                onChange={(value) => {
                  handleChange("forWho", value);
                }}
              />

              <OptionButtons
                label={
                  "¿Está dispuesto/a a asumir todos los gastos que conlleva una mascota (alimentación, salud, vacunas, etc.)?"
                }
                first={"Si"}
                second={"No"}
                selectedValue={values.petMoney}
                onChange={(value) => {
                  handleChange("petMoney", value);
                }}
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
                selectedValue={values.petFollowing}
                onChange={(value) => {
                  handleChange("petFollowing", value);
                }}
              />

              <OptionButtons
                label={
                  " En caso de que no pueda cuidar a la mascota en algún momento, ¿se compromete a contactarnos para buscar una solución en lugar de abandonarla?"
                }
                first={"Si"}
                second={"No"}
                selectedValue={values.notAbandoned}
                onChange={(value) => {
                  handleChange("notAbandoned", value);
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
export default Motivaciones;
