import { useCallback, useContext, useState } from "react";
import BackAndNext from "../Buttons/BackAndNext";
import InputForm from "../Inputs/InputForm";
import OptionButtons from "../Inputs/OptionButtons";
import Notes from "./Notes";
import FormContent from "../FormContent";
import { FormAdoptionReq } from "../../Datas/FormAdoptiobReq";
import type { FormDocumentationType } from "../../Domain/Types/FormAdoptionReqType";
import { FormAdoptionReqContext } from "../../Context/FormAdoptionReqContext";
import { useHandleCreateAdoptionReq } from "../../Services/adoptionReq.services";
import { ModalFormContext } from "../../Context/ModalFormContext";
import UploadInput from "../Inputs/UploadInput";

type Props = {
  nextStep?: any;
  prevStep: any;
};

const Documentation = ({ prevStep }: Props) => {
  const { setIsOpen } = useContext(ModalFormContext);
  const [values, setValues] = useState<FormDocumentationType>(
    FormAdoptionReq.Documentation
  );

  const { requestsValues, setRequestsValues } = useContext(
    FormAdoptionReqContext
  );

  const { handleCreateAdoptionReq, loading, error } =
    useHandleCreateAdoptionReq();
  const handleNext = async () => {
    const newRequestsValues = {
      ...requestsValues,
      Documentation: values,
    };
    setRequestsValues(newRequestsValues);
    console.log(newRequestsValues);

    if (loading) {
      return;
    }
    await handleCreateAdoptionReq({
      requestsValuesContext: newRequestsValues,
    });

    if (error) {
      return;
    }
    setIsOpen(false);
  };

  const handleChange = (
    field: keyof typeof values,
    value: string | number | boolean | File
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChangeBack = useCallback((base64: string | null) => {
    setValues((prev) => ({
      ...prev,
      CImgFront: base64 || "",
    }));
  }, []);
  const handleImageChangeFront = useCallback((base64: string | null) => {
    setValues((prev) => ({
      ...prev,
      CImgBack: base64 || "",
    }));
  }, []);


  return (
    <>
      <FormContent>
        <div className="py-9 px-10 flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-1">
            <h3 className="text-center text-lg text-orange-400 font-semibold">
              Formulario de adopción
            </h3>
            <h4 className="text-center text-sm font-semibold text-lettersDark">
              Documentacion
            </h4>
          </div>

          <div className=" flex flex-col justify-between h-full gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-shortLetters text-lettersDark" htmlFor="">Adujnte foto delantera del carnet de identidad</label>
              <UploadInput
                onImageChange={handleImageChangeFront}
                errorMessage={
                  !values.CImgFront? "La imagen es obligatoria" : undefined
                }
              />
                <label className="text-shortLetters text-lettersDark" htmlFor="">Adujnte foto trasera del carnet de identidad</label>
              <UploadInput
                onImageChange={handleImageChangeBack}
                errorMessage={
                  !values.CImgBack? "La imagen es obligatoria" : undefined
                }
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
                selectedValue={values.youAgree}
                onChange={(values) => {
                  handleChange("youAgree", values);
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
export default Documentation;
