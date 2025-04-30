import { useState } from "react";
import { useHandleDeletePet } from "../../../../Services/adoption.services";
import AdoptionReqList from "./AdoptionReqList";
import ModalFormContainer from "../../../../layouts/ModalFormContainer";
import WarningMesage from "../../../../components/administrationComponents/WarningMesage";

type Props = {
  id: string;
};

export default function AdoptionRequestContend() {
  return (
    <>
      <AdoptionReqList  />
    </>
  );
}
