import { useState } from "react";
import ModalFormContainer from "../../../../layouts/ModalFormContainer";
import WarningMesage from "../../../../components/administrationComponents/WarningMesage";
import { useHandleDeleteAdoptionReq } from "../../../../Services/adoptionReq.services";


type Props = {
  id: string;
  fullname: string;
  age?: number;
  cellPhone?: number;
  address: string;
};

export default function AdoptionReqCard({
  id,
  fullname,
  age,
  cellPhone,
  address,
}: Props) {
  const { handleDeleteAdoptionReq, loading, error } =
    useHandleDeleteAdoptionReq();
  const [isDelete, setIsDelete] = useState(false);
  const deletePet = () => {
    if (loading) {
      return;
    }
    handleDeleteAdoptionReq(id);
    setIsDelete(false);
    window.location.reload();
  };
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }


  
  return (
    <a className="w-full flex flex-col items-center justify-center" href={`/administrationPages/${id}`}>
      <section className="flex w-[700px] rounded-md shadow-md  overflow-hidden">
        <div>
          <img className="size-[212px]" src="/Image/Adoptable1.jpg" alt="" />
        </div>

        <div className="flex flex-col px-10 py-5 text-middleLetters gap-5 text-lettersDark ">
          <div className="flex flex-col">
            <p>
              <span className="font-semibold">Nombre:</span>
              {fullname}
            </p>
            <p>
              <span className="font-semibold">Edad:</span> {age}
            </p>
            <p>
              <span className="font-semibold">Telefono:</span> {cellPhone}
            </p>
            <p>
              <span className="font-semibold"> Direccion:</span> {address}
            </p>
          </div>
          <div className="flex w-full justify-between">
            <div className=" text-shortLetters py-1 px-2 bg-secondary rounded-md cursor-pointer">
              Aprobada
            </div>
            <div className=" text-shortLetters py-1 px-2 bg-secondary rounded-md cursor-pointer">
              Leida
            </div>
            <div
              onClick={() => setIsDelete(true)}
              className="py-1 px-3 shadow-md rounded-md text-red-600 cursor-pointer"
            >
              Borrar
            </div>
          </div>
        </div>
      </section>
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
    </a>
  );
}
