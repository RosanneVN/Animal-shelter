import AdoptionButton from "../Buttons/AdoptionButton";
type Props = { onOpen: React.Dispatch<React.SetStateAction<boolean>> };
const AdoptionCards = ({ onOpen }: Props) => {
  return (
    <div className="flex flex-col h-fit w-fit  rounded-2xl shadow-xl">
      <div className="flex flex-col py-10 px-8 gap-5">
        <div className="">
          <img
            className="rounded-lg h-48 w-56 object-cover"
            src="/Image/Adoptable1.jpg"
            alt=""
          />
        </div>
        <div>
          <p className="font-bold text-shortLetters">Nombre: </p>
          <div className="flex flex-row justify-between font-semibold text-shortLetters">
            <p>Edad: </p>
            <p>Sexo: </p>
          </div>
        </div>

        <AdoptionButton onClick={() => onOpen(true)} />
      </div>
    </div>
  );
};
export default AdoptionCards;
