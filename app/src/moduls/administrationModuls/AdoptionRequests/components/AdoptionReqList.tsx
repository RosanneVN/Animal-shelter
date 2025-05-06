import AdoptionReqCard from "./AdoptionReqCard";
import { getServicesAdoptionReq } from "../../../../Services/adoptionReq.services";
import type { FormAdoptionReqType } from "../../../../Domain/Types/FormAdoptionReqType";

type Props = {
  readingFilter: string;
  isApprovedFilter: string;
};
export default function AdoptionReqList({readingFilter, isApprovedFilter}:Props) {
  const { data } = getServicesAdoptionReq({readingFilter, isApprovedFilter});
  console.log("data", data);

  return (
    <section className="flex flex-col justify-center items-center gap-10">
      {data?.map((adoptionReq: FormAdoptionReqType) => (
        <AdoptionReqCard
          key={adoptionReq.PersonalData.id + adoptionReq.petId}
          id={adoptionReq.PersonalData.id}
          fullname={adoptionReq.PersonalData.fullname}
          age={adoptionReq.PersonalData.age}
          cellPhone={adoptionReq.PersonalData.cellPhone}
          address={adoptionReq.PersonalData.address}
          isRead={adoptionReq.isRead}
          isApproved={adoptionReq.isApproved}
        />
      ))}
    </section>
  );
}
