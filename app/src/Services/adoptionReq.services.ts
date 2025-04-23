import adoptionReqAdapters from "../Domain/Adapters/adoptionReq.adapters";
import useFetch from "./useFetch";

const URL = "http://localhost:4321/api/adoptionRequest";
type Props = {};

export const getServicesAdoptionReq = () => {
  const { data } = useFetch<any>({ url: URL });

  const adaptedData = adoptionReqAdapters({ data });
  return { data: adaptedData };
};
