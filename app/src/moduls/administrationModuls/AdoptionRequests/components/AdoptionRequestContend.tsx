import { useState } from "react";
import AdoptionReqList from "./AdoptionReqList";
import RadingFilter from "./RadingFilter";
import ApprovedFilter from "./ApprovedFilter";

export default function AdoptionRequestContend() {
  const [readingFilter, setReadingFilter] = useState("");
  const [page, setPage] = useState(1);

  const handleFilterChange = (filter: string) => {
    setReadingFilter(filter);
  };

  const [isApprovedFilter, setIsApprovedFilter] = useState("");
  const handleApprovedFilterChange = (filter: string) => {
    setIsApprovedFilter(filter);
  };

  return (
    <section className="flex flex-col gap-10 max-sm:gap-16 min-h-[60vh]">
      <div className="flex justify-end gap-10 max-sm:gap-5 max-sm:flex-col">
        {" "}
        <RadingFilter onFilterChange={handleFilterChange} />
        <ApprovedFilter onApprovedFilterChange={handleApprovedFilterChange} />
      </div>
      <AdoptionReqList
        readingFilter={readingFilter}
        isApprovedFilter={isApprovedFilter}
        setPage={setPage}
        page={page}
      />
    </section>
  );
}
