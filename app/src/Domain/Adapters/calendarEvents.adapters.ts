import type { CalendarEvents } from "../../interfaces/backendAPI"
import type { CalendarEventsType } from "../Types/CalendarEventsType"

type Props = {
    data: CalendarEvents[]
}

export default function calendarEventsAdapters({ data }: Props):CalendarEventsType[] {
    return data.map((event) => ({
        id: event.id,
        date: event.date,
        location: event.location,
        description: event.description,
        img: event.img,
    }))
}