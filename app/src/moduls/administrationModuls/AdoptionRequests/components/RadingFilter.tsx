import { AdoptionReqEnum } from "../../../../Const/AdoptionReqEnum";

type Props = { onFilterChange: any };

export default function RadingFilter({ onFilterChange }: Props) {
  return (
    <div className="flex flex-col max-sm:flex-row gap-2 max-sm:gap-5 text-lettersDark max-sm:w-full 
    max-sm:text-shortLetters">
      {" "}
      <label htmlFor="">Lectura de solicitudes: </label>
      <select
        onChange={(e) => {
          onFilterChange(e.target.value);
        }}
        className="w-36 max-sm:flex-1 bg-white shadow-md rounded-xl text-lettersDark"
      >
        <option value="">Todas</option>
        <option value={AdoptionReqEnum.leidas}>Leidas</option>
        <option value={AdoptionReqEnum.noLeidas}>No leidas</option>
      </select>
    </div>
  );
}
