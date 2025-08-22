import { useState } from "react";
type Props = {
  first: string;
  second: string;
  label: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

//true es hembra y false es macho
const OptionButtons = ({
  first,
  second,
  label,
  selectedValue,
  onChange,
}: Props) => {
  return (
    <>
      <div className="flex flex-col ">
        <label htmlFor="" className="text-xs max-sm:text-center text-lettersDark">
          {label}
        </label>
        <div className="flex flex-col justify-center items-center">
          <div className="text-xs p-2 bg-orange-50 flex w-fit rounded-md text-lettersDark">
            <button
              type="button"
              className={` w-24 rounded-sm py-1 ${
                selectedValue === first ? "bg-orange-400" : "bg-orange-50 "
              }`}
              onClick={() => {
                onChange(first);
              }}
            >
              {first}
            </button>
            <button
              type="button"
              className={` w-24 rounded-sm py-1 ${
                selectedValue === second ? "bg-orange-400" : "bg-orange-50 "
              }`}
              onClick={() => {
                onChange(second);
              }}
            >
              {second}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default OptionButtons;
