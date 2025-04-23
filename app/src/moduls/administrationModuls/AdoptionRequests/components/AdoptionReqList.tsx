import AdoptionReqCard from "./AdoptionReqCard";
import { getServicesAdoptionReq } from "../../../../Services/adoptionReq.services";
type Props = {};

export default function AdoptionReqList({}: Props) {
  const { data } = getServicesAdoptionReq();
  return (
    <section className="flex flex-col justify-center items-center gap-10">
      {data?.map((adoptionReq: any) => (
        <AdoptionReqCard
          key={adoptionReq.id}
          fullname={adoptionReq.fullname}
          age={adoptionReq.age}
          cellPhone={adoptionReq.cellPhone}
          address={adoptionReq.address}
        />
      ))}
    </section>
  );
}
