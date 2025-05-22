import type { Dispatch, SetStateAction } from "react";import { PetsEnum } from "../../../../Const/PetsEnum";
type Props = {
  onFilterChange: (specie: string) => void;
};
export default function PetsFilterTest({ onFilterChange }: Props) {
  return (
    <select
      onChange={(e) => {
        onFilterChange(e.target.value);
      }}
      className="bg-white shadow-md rounded-xl text-lettersDark px-3 mx-5"
    >
      <option value="">Todas</option>
      <option value={PetsEnum.perro}>Perro</option>
      <option value={PetsEnum.gato}>Gato</option>
    </select>
  );
}
