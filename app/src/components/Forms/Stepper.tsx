import React from "react";
import useStep from "../../hooks/useStep";
import Motivaciones from "./Motivaciones";
import PersonalData from "./PersonalData";
import HomeConditions from "./HomeConditions";
import Experience from "./Experience";
import LifeStyle from "./LifeStyle";
import Knowledge from "./Knowledge";
import Documentation from "./Documentation";

type Props = {};
enum Steps {
  PersonalData = "Datos personales",
  Motivaciones = "Motivaciones",
  HomeConditions = "Condiciones del hogar",
  Experience = "Experiencia",
  LifeStyle = " Estilo de vida",
  Knowledge = "Conocimiento",
  Documentation = "Documentacion",
}

const steps = [
  Steps.PersonalData,
  Steps.Motivaciones,
  Steps.HomeConditions,
  Steps.Experience,
  Steps.LifeStyle,
  Steps.Knowledge,
  Steps.Documentation,
];
const Stepper = (props: Props) => {
  const { currentStep, nextStep, prevStep, reset } = useStep({
    initialStep: 0,
    maxStep: steps.length,
  });
  const handleNext = () => {
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };
  console.log(currentStep);

  return (
    <div className="bg-white flex  h-[80vh] w-[700px] rounded-lg max-sm:flex-col max-sm:w-[400px] max-sm:h-[100%] overflow-auto">
      <div className="bg-orange-400 w-[40%] max-sm:w-full flex justify-start items-end rounded-l-lg overflow-hidden">
        <div></div>
        <img className="w-40 h-60 " src="/Image/michi.png" alt="" />
      </div>

      {currentStep == steps.indexOf(Steps.PersonalData) && (
        <PersonalData nextStep={handleNext}></PersonalData>
      )}
      {currentStep == steps.indexOf(Steps.Motivaciones) && (
        <Motivaciones
          nextStep={handleNext}
          prevStep={handlePrev}
        ></Motivaciones>
      )}
      {currentStep == steps.indexOf(Steps.HomeConditions) && (
        <HomeConditions
          nextStep={handleNext}
          prevStep={handlePrev}
        ></HomeConditions>
      )}
      {currentStep == steps.indexOf(Steps.Experience) && (
        <Experience nextStep={handleNext} prevStep={handlePrev}></Experience>
      )}
      {currentStep == steps.indexOf(Steps.LifeStyle) && (
        <LifeStyle nextStep={handleNext} prevStep={handlePrev}></LifeStyle>
      )}
      {currentStep == steps.indexOf(Steps.Knowledge) && (
        <Knowledge nextStep={handleNext} prevStep={handlePrev}></Knowledge>
      )}
      {currentStep == steps.indexOf(Steps.Documentation) && (
        <Documentation prevStep={handlePrev}></Documentation>
      )}
    </div>
  );
};

export default Stepper;
