import { useState } from "react";
import InputForm from "../Inputs/InputForm";
import TextareaForm from "../Inputs/TextareaForm";

type FormData = {
  fullName: string;
  cellPhone?: string | number;
  email: string;
  message: string;
};

const FooterContacto = () => {
  const [values, setValues] = useState<FormData>({
    fullName: "",
    cellPhone: undefined,
    email: "",
    message: "",
  });

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <section className="flex place-items-center place-content-center py-20 w-full">
        <div className="bg-white flex h-[75vh] w-[700px] shadow-md rounded-lg overflow-hidden">
          <div className="flex justify-start items-end bg-orange-400 w-[40%]">
            <img
              className="w-64  scale-x-[-1]"
              src="/Image/perritoForm.png"
              alt=""
            />
          </div>
          <div className="flex flex-col w-[60%] gap-7 py-3 px-10 text-shortLetters">
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
              className="flex flex-col justify-between h-full gap-4 overflow-auto"
            >
              <div className="flex flex-col gap-5 ">
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
                <InputForm
                  name={""}
                  label={"Numero de telefono"}
                  type={"tel"}
                  placeholderText={"Ej: 56 77 52 45"}
                  onChange={(inputValue) => {
                    handleChange("cellPhone", inputValue.target.value.trim());
                  }}
                  isRequired={true}
                  value={values.cellPhone}
                  defaultValue={""}
                  errorMesage={
                    !values.cellPhone ? "Este campo es obligatorio" : undefined
                  }
                />
                <InputForm
                  name={""}
                  label={"Correo"}
                  type={"email"}
                  placeholderText={"Ej: rosanne@gmail.com"}
                  onChange={(inputValue) => {
                    handleChange("email", inputValue.target.value);
                  }}
                  isRequired={true}
                  value={values.email}
                  defaultValue={""}
                  errorMesage={
                    !values.email ? "Este campo es obligatorio" : undefined
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
              <div className="w-full flex justify-end ">
                <button
                  className="uppercase text-lettersDark w-fit bg-orange-200 py-1
                 px-5 rounded-xl shadow-lg"
                >
                  enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default FooterContacto;
