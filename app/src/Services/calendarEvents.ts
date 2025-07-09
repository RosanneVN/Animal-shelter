import type { CalendarEvents } from "../interfaces/backendAPI";
import useFetch from "./useFetch";
import calendarEventsAdapters from "../Domain/Adapters/calendarEvents.adapters";
import useMutation from "./useMutation";

const URL = "http://localhost:4321/api/calendarEvents";

type Props = {
  page?: number;
  limit?: number;
}; 
export const getServicesCalendarEvents = ({page, limit}:Props) => {
const { data, loading, error, pagination } = useFetch<CalendarEvents>({
    url: `${URL}?page=${page}&limit=${limit}`,
})

console.log("dataPaquito", data);

const adaptedData = calendarEventsAdapters({ data });
return { data: adaptedData, loading, error, pagination };
}
type CreateCalendarEvents = {
    dateNew: string;
    locationNew: string;
    descriptionNew: string;
}
export const useHandleCreateCalendarEvents = () => {
     const { mutate, loading, error } = useMutation();
     const handleCreateCalendarEvents = async ({
         dateNew,
         locationNew,
         descriptionNew
     }: CreateCalendarEvents) => {
        await mutate({
            url: URL,
            method: "POST",
            body: {
                date: dateNew,
                location: locationNew,
                description: descriptionNew,
            },
        });
    };
    return { handleCreateCalendarEvents, loading, error };
}

type UpdateCalendarEvents = {
    idUpdate: string;
    dateUpdate: string;
    locationUpdate: string;
    descriptionUpdate: string;
}
export const useHandleUpdateCalendarEvents = () => {
    const { mutate, loading, error } = useMutation();
    const handleUpdateCalendarEvents = async ({
        idUpdate,
        dateUpdate,
        locationUpdate,
        descriptionUpdate
    }: UpdateCalendarEvents) => {
        const body: any = {
            date: dateUpdate,
            location: locationUpdate,
            description: descriptionUpdate,
        };

        await mutate({
            url: URL + "?id=" + idUpdate,
            method: "PATCH",
            body,
        });
        console.log(error);
    };
    return { handleUpdateCalendarEvents, loading, error };
}

export const useHandleDeleteCalendarEvents = () => {
    const { mutate, loading, error } = useMutation();
    const handleDeleteCalendarEvents = async (id: string) => {
        await mutate({
            url: URL + "?id=" + id,
            method: "DELETE",
        });
        console.log(error);
    };
    return { handleDeleteCalendarEvents, loading, error };
}