import React, { useState } from "react";
import CreditCardsContent from "../CreditCardsContent";
import Transparent from "../icons/Transparent";
import InputForm from "../Inputs/InputForm";
import TextareaForm from "../Inputs/TextareaForm";
import SendButton from "../Buttons/SendButton";

type FormData = {
  donationUser: string | undefined;
  donationMotivation: string | undefined;
};
type Props = {};

const DonarConPayu = (props: Props) => {
  const [values, setValues] = useState<FormData>({
    donationUser: "",
    donationMotivation: "",
  });

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <>
      <section className="relative">
        <div className="flex flex-col w-full py-28 text-lettersDark px-36 gap-10 max-lg:px-20">
          <div className="flex flex-col items-center justify-center">
            <p className="text-bigLetters text-lettersDark font-semibold text-center uppercase">
              Donar con:
            </p>
            <div className="w-[80%] text-justify text-middleLetters">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, quas ipsa. Veritatis asperiores nesciunt perspiciatis
                voluptate voluptatibus, explicabo dolorum sit culpa totam, ab
                eveniet ea iure reiciendis aut voluptates odio Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Explicabo, quas ipsa.
                Veritatis asperiores nesciunt perspiciatis voluptate
                voluptatibus, explicabo dolorum sit culpa totam, ab eveniet ea
                iure reiciendis aut voluptates odio Lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex w-[50%] justify-center items-center">
              {" "}
              <CreditCardsContent />
            </div>

            <div className="flex flex-col w-[50%] items-center justify-center text-lettersDark text-shortLetters">
              <div className="bg-white w-96 flex flex-col shadow-md rounded-md py-10 px-6 gap-5">
                <div className="flex bg-terciary h-36 rounded-md justify-center items-center">
                  <img className="size-16" src="/Image/camera.png" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    Adjunte la captuta de pantalla
                  </h3>
                  <p>
                    Si desea puede subir la captura de pantalla de la
                    transferencia realizada junto a su nombre y el motivo de
                    esta.{" "}
                  </p>
                </div>
                <div>
                  <InputForm
                    name={""}
                    label={""}
                    type={"text"}
                    placeholderText={"Ej: Rosanne Vazquez"}
                    onChange={(inputValue) => {
                      handleChange("donationUser", inputValue.target.value);
                    }}
                    isRequired={true}
                    value={values.donationUser}
                    defaultValue={""}
                    errorMesage={undefined}
                  />
                  <TextareaForm
                    name={""}
                    placeholder={"Quiero donar porque ..."}
                    isRequired={true}
                    value={values.donationMotivation}
                    label={""}
                    defaultValue={""}
                    onChange={(inputValue) => {
                      handleChange(
                        "donationMotivation",
                        inputValue.target.value
                      );
                    }}
                    errorMesage={undefined}
                  />
                </div>
                <div className="w-full flex justify-end ">
                  <SendButton></SendButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full absolute bottom-0 scale-x-[-1]">
          <Transparent color={"#003049"} />
        </div>
      </section>
    </>
  );
};
export default DonarConPayu;
