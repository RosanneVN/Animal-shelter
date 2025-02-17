import { useContext, useEffect, useState } from "react";
import { ModalFormContext } from "../Context/ModalFormContext";
import PersonalData from "./Forms/PersonalData";
import Motivaciones from "./Forms/Motivaciones";
import HomeConditions from "./Forms/HomeConditions";
import Experience from "./Forms/Experience";
import LifeStyle from "./Forms/LifeStyle";
import Knowledge from "./Forms/Knowledge";
import Documentation from "./Forms/Documentation";

const ModalForm = () => {
  const { isOpen } = useContext(ModalFormContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    <PersonalData />,
    <Motivaciones key={1} />,
    <HomeConditions key={2} />,
    <Experience key={3} />,
    <LifeStyle key={4} />,
    <Knowledge key={5} />,
    <Documentation key={6} />,
  ];
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return isOpen ? (
    <section
      className="backdrop-blur-md bg-black/30 w-screen h-[100vh] fixed bottom-0 left-0 z-50 
    place-content-center place-items-center"
    >
      <div className="bg-white flex  h-[80vh] w-[700px] rounded-lg">
        <div className="bg-orange-400 w-[40%] flex justify-start items-end rounded-l-lg overflow-hidden">
          <div></div>
          <img className="w-40 h-60" src="/Image/michi.png" alt="" />
        </div>
        {/* componente que cambia*/}
        <PersonalData />,
        <Motivaciones />,
        <HomeConditions />,
        <Experience />,
        <LifeStyle />,
        <Knowledge />,
        <Documentation />,
      </div>
    </section>
  ) : null;
};
export default ModalForm;
