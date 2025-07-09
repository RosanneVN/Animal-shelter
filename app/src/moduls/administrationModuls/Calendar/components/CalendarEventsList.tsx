import React, { useState } from "react";
import {
  getServicesCalendarEvents,
  useHandleDeleteCalendarEvents,
} from "../../../../Services/calendarEvents";
import EditEventsCards from "./EditEventsCards";
import PaginationComponents from "../../PaginationComponents";

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function CalendarEventsList({ page, setPage }: Props) {
  const limit = 8;

  const { data, loading, error, pagination } = getServicesCalendarEvents({
    page,
    limit,
  });
  console.log(pagination);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log("data", data);

  return (
    <>
      <section className="flex flex-col gap-10 max-sm:gap-5 max-sm:flex-row">
        <div
          className="grid grid-cols-4 grid-rows-flow place-items-center w-full gap-10 h-full
    max-lg:h-[200vh] max-sm:h-[450vh] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-10 my-10"
        >
          {data?.map((event) => (
            <EditEventsCards
              key={event.id}
              id={event.id}
              date={event.date}
              location={event.location}
              description={event.description}
            />
          ))}
        </div>

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
    </>
  );
}
