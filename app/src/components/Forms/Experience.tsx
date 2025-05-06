import { useContext, useState } from "react";
import InputForm from "../Inputs/InputForm";
import OptionButtons from "../Inputs/OptionButtons";
import BackAndNext from "../Buttons/BackAndNext";
import FormContent from "../FormContent";
import type { FromExperienceType } from "../../Domain/Types/FormAdoptionReqType";
import { FormAdoptionReq } from "../../Datas/FormAdoptiobReq";
import { FormAdoptionReqContext } from "../../Context/FormAdoptionReqContext";

type Props = {
  nextStep: any;
  prevStep?: any;
};

const Experience = ({ nextStep, prevStep }: Props) => {
  const [values, setValues] = useState<FromExperienceType>(
    FormAdoptionReq.Experience
  );

  const { setRequestsValues } = useContext(FormAdoptionReqContext);
  const handleNext = () => {
    setRequestsValues((prev) => ({
      ...prev,
      Experience: {
        family: values.family,
        adoptionAgree: values.adoptionAgree,
        howManyPets: Number(values.howManyPets),
        petsBefore: values.petsBefore,
        petsBeforeAlive: values.petsBeforeAlive,
      },
    }));
    nextStep();
  };

  const handleChange = (field: keyof typeof values, value: string | number) => {
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
              Convivencia Familiar y Experiencia
            </h4>
          </div>
          <div className=" flex flex-col justify-between h-full gap-5">
            <div className="flex flex-col gap-5">
              <InputForm
                name={""}
                label={"¿Con quién vive actualmente?"}
                type={"text"}
                placeholderText={"Ej: Actualmente vivo con..."}
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
                selectedValue={values.adoptionAgree}
                onChange={(value) => {
                  handleChange("adoptionAgree", value);
                }}
              />
              <InputForm
                name={""}
                label={"¿Qué otras mascotas hay en casa actualmente?"}
                type={"number"}
                placeholderText={"Ej: 3"}
                onChange={(inputValue) => {
                  handleChange("howManyPets", inputValue.target.value);
                }}
                isRequired={true}
                value={values.howManyPets}
                defaultValue={""}
                errorMesage={
                  !values.howManyPets ? "Este campo es obligatorio" : undefined
                }
              />
              <OptionButtons
                label={"¿Ha tenido anteriormente un perro o gato?"}
                first={"Si"}
                second={"No"}
                selectedValue={values.petsBefore}
                onChange={(value) => {
                  handleChange("petsBefore", value);
                }}
              />
              <OptionButtons
                label={"Si es así, ¿sigue vivo o falleció?"}
                first={"Sigue vivo"}
                second={"Fallecio"}
                selectedValue={values.petsBeforeAlive}
                onChange={(value) => {
                  handleChange("petsBeforeAlive", value);
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
export default Experience;
