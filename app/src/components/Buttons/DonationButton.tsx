type Props = {
  title: string;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const DonationButton = ({ title, onOpen }: Props) => {
  return (
    <>
      <button
        onClick={() => onOpen(true)}
        className="flex flex-row bg-white shadow-md px-10 py-3 w-fit text-middleLetters gap-10
         text-lettersDark uppercase rounded-lg max-md:text-sm max-md:px-5 max-md:py-4 hover:translate-y-1"
      >
        <img className="size-8" src="/Image/creditCard.png" alt="" />
        {title}
      </button>
    </>
  );
};
export default DonationButton;
