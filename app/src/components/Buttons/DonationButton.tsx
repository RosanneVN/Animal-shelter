type Props = {
  image: any;
  title: string;
};

const DonationButton = ({ image, title }: Props) => {
  return (
    <>
      <button
        className="bg-secondary px-8 py-3 w-full text-shortLetters text-center text-lettersLight font-semibold
         rounded-full hover:bg-primary transition duration-500 max-md:text-sm max-md:px-5 max-md:py-4"
       
      >
        <img src={image} alt="" />
        {title}
      </button>
    </>
  );
};
export default DonationButton;
