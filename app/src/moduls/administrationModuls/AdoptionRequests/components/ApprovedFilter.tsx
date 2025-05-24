import { AdoptionReqEnum } from "../../../../Const/AdoptionReqEnum";

type Props = { onApprovedFilterChange: any };

export default function ApprovedFilter({ onApprovedFilterChange }: Props) {
  return (
    <div className="flex flex-col max-sm:flex-row gap-2 max-sm:gap-5 text-lettersDark max-sm:text-shortLetters">
      {" "}
      <label htmlFor="">Aprobacion de solicitudes</label>
      <select
        onChange={(e) => {
          onApprovedFilterChange(e.target.value);
        }}
        className="w-36 max-sm:flex-1 bg-white shadow-md rounded-xl text-lettersDark"
      >
        <option value="">Todas</option>
        <option value={AdoptionReqEnum.aprobadas}>Aprobadas</option>
        <option value={AdoptionReqEnum.noAprobadas}>No Aprobadas</option>
      </select>
    </div>
  );
}
