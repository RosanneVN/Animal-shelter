import React, { useState } from "react";
import ScreenWidthLayoutTsx from "../../../layouts/ScreenWidthLayoutTsx";
import CreditCardsContent from "../../../components/CreditCardsContent";
import InputForm from "../../../components/Inputs/InputForm";
import TextareaForm from "../../../components/Inputs/TextareaForm";
import SendButton from "../../../components/Buttons/SendButton";
import Transparent from "../../../components/icons/Transparent";

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
    <section className="relative" id="donarCon">
      <ScreenWidthLayoutTsx>
        <div
          className="flex flex-col w-full py-28 text-lettersDark px-36 gap-10 max-lg:px-20 
       max-sm:px-10 "
        >
          <div className="flex flex-col items-center justify-center gap-5 ">
            <p className="text-bigLetters max-sm:text-longLetters text-lettersDark font-semibold text-center uppercase">
              Donar con:
            </p>
            <div className="w-[80%] max-sm:w-full text-justify text-middleLetters">
              <p>
                Haz tu donación a través de tranferencia bancaria(MLC, CUP,
                Zelle). Cada gesto cuenta y nos ayuda a seguir cuidando a
                nuestros peluditos. ¡Gracias por tu apoyo!
              </p>
            </div>
          </div>
          <div className="flex flex-row w-full max-lg:flex-col max-lg:gap-10">
            <div className="flex w-full max-lg:w-full justify-center items-center">
              {" "}
              <CreditCardsContent />
            </div>

           
          </div>
        </div>
      </ScreenWidthLayoutTsx>
      <div className="w-full absolute -bottom-0.5 scale-x-[-1]">
        <Transparent color={"#003049"} />
      </div>
    </section>
  );
};
export default DonarConPayu;
