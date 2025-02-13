import { useState } from "react";
type Props = {
  first: string;
  second: string;
  label: string;
};

const OptionButtons = ({ first, second, label }: Props) => {
  const [isSelected, setIsSelected] = useState(true);
  return (
    <>
      <div className="flex flex-col ">
        <label htmlFor="" className="text-xs text-lettersDark">
          {label}
        </label>
        <div className="flex flex-col justify-center items-center">
        <div className="text-xs p-2 bg-orange-50 flex w-fit rounded-md text-lettersDark">
          <button
            className={` w-24 rounded-sm py-1 ${
              isSelected === true ? "bg-orange-400" : "bg-orange-50 "
            }`}
            onClick={() => {
              setIsSelected(true);
            }}
          >
            {first}
          </button>
          <button
            className={` w-24 rounded-sm py-1 ${
              isSelected === false ? "bg-orange-400" : "bg-orange-50 "
            }`}
            onClick={() => {
              setIsSelected(false);
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
