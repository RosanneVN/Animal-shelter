import adoptionReqAdapters from "../Domain/Adapters/adoptionReq.adapters";
import type { AdoptionReqInterface } from "../interfaces/backendAPI";
import useFetch from "./useFetch";

const URL = "http://localhost:4321/api/adoptionRequest";

export const getServicesAdoptionReq = () => {
  const { data, error, loading } = useFetch<AdoptionReqInterface>({ url: URL });

  const adaptedData = adoptionReqAdapters({ data });
  return { data: adaptedData, error, loading };
};
