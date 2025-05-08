import React from "react";

type Props = {
  onDelete: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function DeleteButton({ onDelete }: Props) {
  return (
    <button
      onClick={onDelete}
      className="flex justify-center items-center w-14  p-2 "
    >
      <img className="size-4" src="/Image/delete.png" alt="" />
    </button>
  );
}
