import { AdoptionReqEnum } from "../../../../Const/AdoptionReqEnum";

type Props = { onFilterChange: any };

export default function RadingFilter({ onFilterChange }: Props) {
  return (
    <div>
      {" "}
      <select
        onChange={(e) => {
          onFilterChange(e.target.value);
        }}
        className="bg-white shadow-md rounded-xl text-lettersDark"
      >
        <option value="">Todas</option>
        <option value={AdoptionReqEnum.leidas}>Leidas</option>
        <option value={AdoptionReqEnum.noLeidas}>No leidas</option>
      </select>
    </div>
  );
}
