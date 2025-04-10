import { useState } from "react";
import AdoptionFather from "../../../../components/AdoptionCardList/AdoptionFather";
import EditButtonSection from "./EditButtonSection";
import ModalFormContainer from "../../../../layouts/ModalFormContainer";
import EditCards from "./Forms/EditCards";
import WarningMesage from "../../../../components/administrationComponents/WarningMesage";
import type { PetsType } from "../../../../Domain/Types/PetsType";
import { useHandleDeletePet } from "../../../../Services/adoption.services";

const EditAdoptionCards = ({ id, petname, age, gender, species }: PetsType) => {
  //isEdit es para abrir y cerrar el modal de creacion
  const [isEdit, setIsEdit] = useState(false);
  //isDelete es para abrir y cerrar el modal de confirmacion
  const [isDelete, setIsDelete] = useState(false);
  const { handleDeletePet, loading, error } = useHandleDeletePet();

  const deletePet = () => {
    if (loading) {
      return;
    }
    setIsDelete(false);
    handleDeletePet(id);
    window.location.reload();
  };
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <AdoptionFather
        id={id}
        petname={petname}
        age={age}
        gender={gender}
        species={species}
      >
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
        <EditCards
          id={id}
          petname={petname}
          age={age}
          species={species}
          gender={gender}
          onClose={() => {
            setIsEdit(false);
          }}
        />
      </ModalFormContainer>

      <ModalFormContainer
        isOpen={isDelete}
        onClose={() => {
          setIsDelete(false);
        }}
      >
        <WarningMesage
          onClick={deletePet}
          onClose={() => {
            setIsDelete(false);
          }}
        />
      </ModalFormContainer>
    </>
  );
};
export default EditAdoptionCards;
