type Props = {
  nameCard: string;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  numberPhone: number;
  cardNumber: string;
  selectedDonation: React.Dispatch<React.SetStateAction<{
    cardNumber: string;
    numberPhone: number;
  }>>;
};

const DonationButtonLanding = ({
  nameCard,
  onOpen = () => {},
  numberPhone,
  cardNumber,
  selectedDonation
}: Props) => {
  const handleDonation = () => {
    selectedDonation({
      cardNumber,
      numberPhone,
    });
    onOpen(true);
  }

  return (
    <>
      <button
        onClick={() => handleDonation()}
        className="flex flex-row bg-white shadow-md px-20 py-3 w-fit text-middleLetters gap-10
         text-lettersDark uppercase rounded-lg max-md:text-sm max-md:px-5 max-md:py-4 hover:translate-y-1"
      >
        <img className="size-8" src="/Image/creditCard.png" alt="" />
        {nameCard}
      </button>
    </>
  );
};
export default DonationButtonLanding;
