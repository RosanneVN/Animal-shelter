import React, { useState } from "react";
import InputForm from "../../../../components/Inputs/InputForm";

type Props = {};

export default function AuthContent({}: Props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <section className="flex flex-col bg-secondary h-[100vh] w-full justify-center items-center">
        <div className="flex flex-col w-96 h-96 rounded-full bg-orange-300 justify-center items-center">
          <div className="flex flex-col w-60 gap-5 ">
            <p className="text-lettersLight text-longLetters font-semibold">Login</p>
            <div className="flex flex-col gap-2">
              <InputForm
                name={""}
                type={"text"}
                placeholderText={"Usuario"}
                onChange={(inputValue) => {
                  handleChange("username", inputValue.target.value);
                }}
                isRequired={true}
                value={values.username}
                defaultValue={""}
                errorMesage={
                  !values.username ? "Este campo es obligatorio" : undefined
                }
              />
              <InputForm
                name={""}
                type={"text"}
                placeholderText={"Contraseña"}
                onChange={(inputValue) => {
                  handleChange("password", inputValue.target.value);
                }}
                isRequired={true}
                value={values.password}
                defaultValue={""}
                errorMesage={
                  !values.password ? "Este campo es obligatorio" : undefined
                }
              />
            </div>
            <button className="flex self-center text-shortLetters text-lettersDark bg-white w-fit py-0.5 px-5 rounded-md shadow-md hover:shadow-none">Login</button>
          </div>
        </div>
      </section>
    </>
  );
}
