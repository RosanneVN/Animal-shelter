type Props = {
  nameContact: string;
  numberContact: any;
};

const ContactCards = ({ nameContact, numberContact }: Props) => {
  return (
    <>
      <div className="flex flex-row shadow-lg my-10 rounded-md bg-white w-96 h-20 px-5
        justify-between items-center text-lettersDark hover:translate-y-1">
        <p>{nameContact}</p>
        <p>{numberContact}</p>
      </div>
    </>
  );
};
export default ContactCards;
