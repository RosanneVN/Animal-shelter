type Props = {
  nameContact: string;
};

const ContactCards = ({ nameContact }: Props) => {
  return (
    <>
      <div
        className="flex flex-row shadow-lg rounded-md overflow-hidden w-96 h-20  max-sm:w-full
       justify-between items-center text-lettersDark hover:translate-y-1"
      >
        <div className="w-[30%] h-full bg-secondary flex justify-center items-center">
          <img className="size-8" src="/Image/wz.png" alt="" />
        </div>
        <div className="w-[70%] flex items-center justify-center">
          <p>Contacta con {nameContact}</p>
        </div>
      </div>
    </>
  );
};
export default ContactCards;
