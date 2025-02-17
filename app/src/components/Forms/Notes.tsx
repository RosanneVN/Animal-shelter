type Props = {
  noteText: string;
};

const Notes = ({ noteText }: Props) => {
  return (
    <>
      <div className="flex flex-row gap-5 w-full text-lettersDark text-[10px]
       bg-orange-50 py-2 px-5 rounded-full                                  ">
        <div className=" min-w-6 flex place-content-center place-items-center">
          <img className="size-4" src="/Icons/AlertIcon.png" alt="" />
        </div>
        <p className="">{noteText}</p>
      </div>
    </>
  );
};
export default Notes;
