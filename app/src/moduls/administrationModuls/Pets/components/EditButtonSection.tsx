import React, { type MouseEventHandler } from "react";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
};

const EditButtonSection = ({ onClick, onDelete }: Props) => {
  return (
    <div className="flex flex-row w-full justify-between">
      <button
        className="flex bg-secondary w-24 text-shortLetters items-center justify-center uppercase py-1 px-2 shadow-md
         hover:shadow-none rounded-full "
        onClick={onClick}
      >
        <img className="size-5 flex" src="/Image/Edit.png" alt="" />
      </button>
      <button
        onClick={onDelete}
        className="flex justify-center items-center w-20  p-2 shadow-md rounded-full hover:shadow-none"
      >
        <img className="size-5" src="/Image/delete.png" alt="" />
      </button>
    </div>
  );
};
export default EditButtonSection;
