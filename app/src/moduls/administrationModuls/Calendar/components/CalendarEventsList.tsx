import React, { useState } from "react";
import {
  getServicesCalendarEvents,
  useHandleDeleteCalendarEvents,
} from "../../../../Services/calendarEvents";
import EditEventsCards from "./EditEventsCards";

type Props = {};

export default function CalendarEventsList({}: Props) {
  const { data, loading, error } = getServicesCalendarEvents({});
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
console.log("data", data);

  return (
    <>
      <section
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
      </section>
    </>
  );
}
