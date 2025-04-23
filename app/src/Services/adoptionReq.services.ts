import useFetch from "./useFetch";

const URL = "http://localhost:4321/api/adoptionRequest";
type Props = {};

export const getServicesAdoptionReq = () => {
  const { data } = useFetch<any>({ url: URL });

  return { data };
};
