import type { Dispatch, SetStateAction } from "react";
import { PetsEnum } from "../../../../Const/PetsEnum";
type Props = {
  onFilterChange: (specie: string) => void;
};
export default function PetsFilterTest({ onFilterChange }: Props) {
  return (
    <div className="flex self-end  max-sm:w-full gap-3 text-lettersDark font-semibold justify-center items-center">
      <label htmlFor="">Especie:</label>
      <select
        onChange={(e) => {
          onFilterChange(e.target.value);
        }}
        className=" bg-white shadow-md rounded-xl text-lettersDark px-3 mx-5 w-36 max-sm:m-0
       max-sm:w-full"
      >
        <option value="">Todas</option>
        <option value={PetsEnum.perro}>Perro</option>
        <option value={PetsEnum.gato}>Gato</option>
      </select>
    </div>
  );
}
