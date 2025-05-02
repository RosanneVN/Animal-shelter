import { useState } from "react";
import AdoptionReqList from "./AdoptionReqList";
import RadingFilter from "./RadingFilter";

export default function AdoptionRequestContend() {
  const [readingFilter, setReadingFilter] = useState("");
  const handleFilterChange = (filter: string) => {
    setReadingFilter(filter);
  };
  return (
    <>
      <RadingFilter onFilterChange={handleFilterChange} />
      <AdoptionReqList readingFilter={readingFilter} />
    </>
  );
}
