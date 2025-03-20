import AdoptionButton from "../Buttons/AdoptionButton";
type Props = { onOpen: React.Dispatch<React.SetStateAction<boolean>> };
const AdoptionCards = ({ onOpen }: Props) => {
  return (
    <section className="relative">
      <div className="bg-white p-2 rounded-full absolute top-2 right-3">
        <img className="size-6" src="/Icons/SVGs/Female.svg" alt="" />
      </div>
      <div className="flex flex-col h-fit w-fit rounded-2xl shadow-xl">
        <div className="flex flex-col py-7 px-4 gap-5">
          <div className="">
            <img
              className="rounded-lg h-40 w-48 object-cover"
              src="/Image/Adoptable1.jpg"
              alt=""
            />
          </div>
          <div>
            <p className="font-bold text-shortLetters">Nombre: </p>
            <div className="flex flex-row justify-between font-semibold text-shortLetters">
              <p>Edad: </p>
            </div>
          </div>

          <AdoptionButton onClick={() => onOpen(true)} />
        </div>
      </div>
    </section>
  );
};
export default AdoptionCards;
