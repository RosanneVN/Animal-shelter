import type { CalendarEvents } from "../interfaces/backendAPI";
import useFetch from "./useFetch";
import calendarEventsAdapters from "../Domain/Adapters/calendarEvents.adapters";
import useMutation from "./useMutation";

const URL = "/api/calendarEvents";

type Props = {
  page?: number;
  limit?: number;
};
export const getServicesCalendarEvents = ({ page, limit }: Props) => {
  const { data, loading, error, pagination } = useFetch<CalendarEvents>({
    url: `${URL}?page=${page}&limit=${limit}`,
  });

  console.log("dataPaquito", data);

  const adaptedData = calendarEventsAdapters({ data });
  return { data: adaptedData, loading, error, pagination };
};
type CreateCalendarEvents = {
  dateNew: string;
  locationNew: string;
  descriptionNew: string;
  imgNewBase64: string;
  titleNew: string;
};
export const useHandleCreateCalendarEvents = () => {
  const { mutate, loading, error } = useMutation();
  const handleCreateCalendarEvents = async ({
    dateNew,
    locationNew,
    descriptionNew,
    imgNewBase64,
    titleNew,
  }: CreateCalendarEvents) => {
    await mutate({
      url: URL,
      method: "POST",
      body: {
        date: dateNew,
        location: locationNew,
        description: descriptionNew,
        title: titleNew,
        img: imgNewBase64,
      },
    });
  };
  return { handleCreateCalendarEvents, loading, error };
};

type UpdateCalendarEvents = {
  idUpdate: string;
  dateUpdate: string;
  locationUpdate: string;
  descriptionUpdate: string;
  titleUpdate: string;
  imgUpdateBase64?: string;
};
export const useHandleUpdateCalendarEvents = () => {
  const { mutate, loading, error } = useMutation();
  const handleUpdateCalendarEvents = async ({
    idUpdate,
    dateUpdate,
    locationUpdate,
    descriptionUpdate,
    titleUpdate,
    imgUpdateBase64,
  }: UpdateCalendarEvents) => {
    const body: any = {
      date: dateUpdate,
      location: locationUpdate,
      description: descriptionUpdate,
      title: titleUpdate,
    };
    if (imgUpdateBase64) {
      body.img = imgUpdateBase64;
    }

    await mutate({
      url: URL + "?id=" + idUpdate,
      method: "PATCH",
      body,
    });
    console.log(error);
  };
  return { handleUpdateCalendarEvents, loading, error };
};

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
};
