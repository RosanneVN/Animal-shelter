import AdoptionReqCard from "./AdoptionReqCard";
import { getServicesAdoptionReq } from "../../../../Services/adoptionReq.services";
import type { FormAdoptionReqType } from "../../../../Domain/Types/FormAdoptionReqType";
import PaginationComponents from "../../PaginationComponents";

type Props = {
  readingFilter: string;
  isApprovedFilter: string;
  setPage: any;
  page: number;
};
export default function AdoptionReqList({
  readingFilter,
  isApprovedFilter,
  setPage,
  page,
}: Props) {
  const limit = 8;

  const { data, loading, error, pagination } = getServicesAdoptionReq({
    readingFilter,
    isApprovedFilter,
    page,
    limit,
  });
  console.log("data adption req", pagination);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data || data.length < 1) {
    return <p>No data</p>;
  }
  if (error) {
    return <p>Error loading data</p>;
  }
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
          petImg={adoptionReq.petImg}
        />
      ))}
      <PaginationComponents
        page={page}
        totalPages={pagination.totalPages}
        onNext={() => {
          if (page < pagination.totalPages) {
            setPage(page + 1);
          }
        }}
        onBack={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      />
    </section>
  );
}
