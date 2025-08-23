import React from "react";
import { getServicesCalendarEvents } from "../../../Services/calendarEvents";
import EventsCard from "./EventsCard";

type Props = {};

export default function EventsList({}: Props) {
  const { data } = getServicesCalendarEvents({});
  return (
    <div className="grid lg:grid-cols-4 max max-md:grid-cols-1 place-items-center w-full gap-3">
      {data?.map((calevent) => (
        <EventsCard
          key={calevent.title}
          date={calevent.date}
          description={calevent.description}
          img={calevent.img}
          location={calevent.location}
          title={calevent.title}
        ></EventsCard>
      ))}
    </div>
  );
}
