type Props = {
  noteText: string;
};

const Notes = ({ noteText }: Props) => {
  return (
    <>
      <div className="flex flex-row gap-5 w-full text-lettersDark text-[10px]
       bg-orange-50 py-1 px-3 rounded-full                                  ">
        <div className="w-6 flex place-content-center place-items-center">
          <img className="size-4 w-full" src="/Icons/AlertIcon.png" alt="" />
        </div>
        <p className="">{noteText}</p>
      </div>
    </>
  );
};
export default Notes;
