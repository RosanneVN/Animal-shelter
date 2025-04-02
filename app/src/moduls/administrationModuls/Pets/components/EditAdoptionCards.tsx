import React, { useState } from "react";
import AdoptionFather from "../../../../components/AdoptionCardList/AdoptionFather";
import EditButtonSection from "./EditButtonSection";
import ModalFormContainer from "../../../../layouts/ModalFormContainer";
import EditCards from "./EditCards";
import WarningMesage from "../../../../components/administrationComponents/WarningMesage";
import type { Pets } from "../../../../interfaces";

const EditAdoptionCards = ({ id, petname, age, gender, species }: Pets) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <AdoptionFather id={id} petname={petname} age={age} gender={gender} species={species}>
        <EditButtonSection
          onClick={() => {
            setIsEdit(true);
          }}
          onDelete={() => {
            setIsDelete(true);
          }}
        />
      </AdoptionFather>
      <ModalFormContainer
        isOpen={isEdit}
        onClose={() => {
          setIsEdit(false);
        }}
      >
        <EditCards />
      </ModalFormContainer>

      <ModalFormContainer
        isOpen={isDelete}
        onClose={() => {
          setIsDelete(false);
        }}
      >
        <WarningMesage
          onClick={() => {
            setIsDelete(false);
          }}
        />
      </ModalFormContainer>
    </>
  );
};
export default EditAdoptionCards;
