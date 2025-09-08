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

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Handle successful login, e.g., redirect or update UI
        console.log("Login successful");
        window.location.href = "/administrationPages/Pets";

        // You might want to redirect the user here, for example:
        // window.location.href = "/admin/dashboard";
      } else {
        // Handle login failure
        const errorData = await response.text();
        console.error("Login failed:", errorData);
        alert("Login failed: " + errorData);
        // You could set an error message in the state to display to the user
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      // Handle network errors or other issues
    }
  };

  return (
    <>
      <section className="flex flex-col bg-secondary h-[100vh] w-full justify-center items-center">
        <div className="flex flex-col w-96 h-96 rounded-full bg-orange-300 justify-center items-center">
          <div className="flex flex-col w-60 gap-5 ">
            <p className="text-lettersLight text-longLetters font-semibold">
              Login
            </p>
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
            <button
              onClick={handleSubmit}
              className="flex self-center text-shortLetters text-lettersDark bg-white w-fit py-0.5 px-5 rounded-md shadow-md hover:shadow-none"
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
