import { AdoptionReqEnum } from "../../../../Const/AdoptionReqEnum";

type Props = { onApprovedFilterChange: any };

export default function ApprovedFilter({ onApprovedFilterChange }: Props) {
  return (
    <div>
      {" "}
      <select
        onChange={(e) => {
          onApprovedFilterChange(e.target.value);
        }}
        className="bg-white shadow-md rounded-xl text-lettersDark"
      >
        <option value="">Todas</option>
        <option value={AdoptionReqEnum.aprobadas}>Aprobadas</option>
        <option value={AdoptionReqEnum.noAprobadas}>No Aprobadas</option>
      </select>
    </div>
  );
}
