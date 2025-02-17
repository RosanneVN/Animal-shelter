import type { MouseEventHandler } from "react";

type Props = { onClick: MouseEventHandler<HTMLButtonElement> };
export default function AdoptionButton({ onClick }: Props) {
  return (
    <>
      <div className="flex justify-center">
        <button
          className="bg-secondary px-8 py-3 w-full text-shortLetters text-center text-lettersLight font-semibold
         rounded-full hover:bg-primary transition duration-500 max-md:text-sm max-md:px-5 max-md:py-4"
          onClick={onClick}>
          ADOPTAR
        </button>
      </div>
    </>
  );
}
