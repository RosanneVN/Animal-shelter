import { useState } from "react";
import AdoptionReqList from "./AdoptionReqList";
import RadingFilter from "./RadingFilter";
import ApprovedFilter from "./ApprovedFilter";

export default function AdoptionRequestContend() {
  const [readingFilter, setReadingFilter] = useState("");
  const handleFilterChange = (filter: string) => {
    setReadingFilter(filter);
  };

  const [isApprovedFilter, setIsApprovedFilter] = useState("");
  const handleApprovedFilterChange = (filter: string) => {
    setIsApprovedFilter(filter);
  };

  return (
    <section className="flex flex-col gap-10">
      <div className="flex justify-end gap-10">
        {" "}
        <RadingFilter onFilterChange={handleFilterChange} />
        <ApprovedFilter onApprovedFilterChange={handleApprovedFilterChange} />
      </div>
      <AdoptionReqList
        readingFilter={readingFilter}
        isApprovedFilter={isApprovedFilter}
      />
    </section>
  );
}
