import { useState } from "react";
import ScreenWidthLayoutTsx from "../../../layouts/ScreenWidthLayoutTsx";
import InputForm from "../../../components/Inputs/InputForm";
import TextareaForm from "../../../components/Inputs/TextareaForm";


type FormData = {
  fullName: string;
  message: string;
};

const FooterContacto = () => {
  const [values, setValues] = useState<FormData>({
    fullName: "",
    message: "",
  });

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
      
    }));
    console.log(values);
  };

  return (
    <ScreenWidthLayoutTsx>
      <section className="flex place-items-center place-content-center py-20 w-full">
        <div className="bg-white flex max-sm:flex-col lg:h-[75vh] lg:max-h-[350px] w-[700px] max-sm:w-80 shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-start items-end max-sm:items-center max-sm:justify-center max-sm:pt-5 bg-orange-400 w-[40%] max-sm:w-full">
            <img
              className="w-48 max-sm:w-32  scale-x-[-1]"
              src="/Image/perritoForm.png"
              alt=""
            />
          </div>
          <div className="flex flex-col w-[60%] max-sm:w-full gap-7 py-3 px-10 text-shortLetters">
            <div className="flex flex-col">
              <p className="text-orange-400 text-middleLetters uppercase text-center font-semibold">
                contactanos
              </p>
              <p className="text-lettersDark uppercase text-center">
                mandanos un mensaje
              </p>
            </div>
            <form
              action=""
              className="flex flex-col  h-full gap-4 overflow-auto"
            >
              <div className="flex flex-col gap-2 ">
                <InputForm
                  name={""}
                  label={"Nombre completo"}
                  type={"text"}
                  placeholderText={"Ej: Rosanne Vazquez"}
                  onChange={(inputValue) => {
                    handleChange("fullName", inputValue.target.value);
                  }}
                  isRequired={true}
                  value={values.fullName}
                  defaultValue={""}
                  errorMesage={
                    !values.fullName ? "Este campo es obligatorio" : undefined
                  }
                />

                <TextareaForm
                  name={""}
                  placeholder={"Quiero decirles ..."}
                  isRequired={true}
                  value={values.message}
                  label={"Mensaje"}
                  defaultValue={""}
                  onChange={(inputValue) => {
                    handleChange("message", inputValue.target.value);
                  }}
                  errorMesage={
                    !values.message ? "Este campo es obligatorio" : undefined
                  }
                />
              </div>
              <a
                target="_blank"
                href={`https://wa.me/56775245?text=Hola, mi nombre es ${values.fullName}, ${values.message}`}
                className="uppercase text-lettersDark w-fit bg-orange-200 py-1
 px-5 rounded-xl shadow-lg hover:translate-y-1 hover:shadow-none"
              >
                Enviar
              </a>
            </form>
          </div>
        </div>
      </section>
    </ScreenWidthLayoutTsx>
  );
};
export default FooterContacto;
