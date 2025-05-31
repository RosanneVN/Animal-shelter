import type { UpdateAdoptionReqInput } from "../Backend/Schemas/AdoptionReq.schemas";
import adoptionReqAdapters from "../Domain/Adapters/adoptionReq.adapters";
import type { FormAdoptionReqType } from "../Domain/Types/FormAdoptionReqType";
import type { AdoptionReqInterface } from "../interfaces/backendAPI";
import useFetch from "./useFetch";
import useMutation from "./useMutation";

const URL = "http://localhost:4321/api/adoptionRequest";
type Props = {
  filterID?: string;
  readingFilter?: string;
  isApprovedFilter?: string;
  page?: number;
  limit?: number;
};

export const getServicesAdoptionReq = ({
  filterID,
  readingFilter,
  isApprovedFilter,
  page,
  limit,
}: Props) => {
  const { data, error, loading, pagination } = useFetch<AdoptionReqInterface>({
    url: `${URL}${
      filterID ? "?id=" + filterID + "&" : "?"
    }readingFilter=${readingFilter}&isApprovedFilter=${isApprovedFilter}&page=${page}&limit=${limit}`,
  });

  console.log("data", data);

  const adaptedData = adoptionReqAdapters({ data });
  console.log("adaptedData", adaptedData);

  return { data: adaptedData, error, loading, pagination };
};

type CreateAdoptionReq = {
  requestsValuesContext: FormAdoptionReqType;
};
export const useHandleCreateAdoptionReq = () => {
  const { mutate, loading, error } = useMutation();
  const handleCreateAdoptionReq = ({
    requestsValuesContext,
  }: CreateAdoptionReq) => {
    mutate({
      url: URL,
      method: "POST",
      body: {
        fullname: requestsValuesContext.PersonalData.fullname,
        age: requestsValuesContext.PersonalData.age,
        cellPhone: requestsValuesContext.PersonalData.cellPhone,
        alternativeCellPhone:
          requestsValuesContext.PersonalData.alternativeCellPhone,
        address: requestsValuesContext.PersonalData.address,
        motivation: requestsValuesContext.Motivaciones.motivation,
        forWho: requestsValuesContext.Motivaciones.forWho,
        petMoney: requestsValuesContext.Motivaciones.petMoney,
        petFollowing: requestsValuesContext.Motivaciones.petFollowing,
        notAbandoned: requestsValuesContext.Motivaciones.notAbandoned,
        ownHouse: requestsValuesContext.HomeConditions.ownHouse,
        agreeRent: requestsValuesContext.HomeConditions.agreeRent,
        bigPlace: requestsValuesContext.HomeConditions.bigPlace,
        sleepPlace: requestsValuesContext.HomeConditions.sleepPlace,
        houseNotScape: requestsValuesContext.HomeConditions.houseNotScape,
        childrens: requestsValuesContext.HomeConditions.childrens,
        petAlergic: requestsValuesContext.HomeConditions.petAlergic,
        family: requestsValuesContext.Experience.family,
        adoptionAgree: requestsValuesContext.Experience.adoptionAgree,
        howManyPets: requestsValuesContext.Experience.howManyPets,
        petsBefore: requestsValuesContext.Experience.petsBefore,
        petsBeforeAlive: requestsValuesContext.Experience.petsBeforeAlive,
        job: requestsValuesContext.LifeStyle.job,
        iftravel: requestsValuesContext.LifeStyle.iftravel,
        petIfTravel: requestsValuesContext.LifeStyle.petIfTravel,
        otherHouse: requestsValuesContext.LifeStyle.otherHouse,
        petDoctorClose: requestsValuesContext.Knowledge.petDoctorClose,
        vacunationSchema: requestsValuesContext.Knowledge.vacunationSchema,
        sterilizationOpinion:
          requestsValuesContext.Knowledge.sterilizationOpinion,
        youAgree: requestsValuesContext.Documentation.youAgree,
        CImgFront: requestsValuesContext.Documentation.CImgFront,
        CImgBack: requestsValuesContext.Documentation.CImgBack,
        petId: requestsValuesContext.petId,
      },
    });
  };
  return { handleCreateAdoptionReq, loading, error };
};

export const useHandleDeleteAdoptionReq = () => {
  const { mutate, loading, error } = useMutation();
  const handleDeleteAdoptionReq = (id: string) => {
    console.log("id", id);

    const m = mutate({
      url: URL + "?id=" + id,
      method: "DELETE",
    });
  };
  return { handleDeleteAdoptionReq, loading, error };
};

type UpdateAdoptionReq = {
  id: string;
  isApprovedUpdate: boolean;
};
export const useHandleUpdateAdoptionReq = () => {
  const { mutate, loading, error } = useMutation();
  const handleUpdateAdoptionReq = ({
    id,
    isApprovedUpdate,
  }: UpdateAdoptionReq) => {
    const m = mutate({
      url: URL + "?id=" + id,
      method: "PATCH",
      body: {
        isApproved: isApprovedUpdate,
      },
    });
  };
  return { handleUpdateAdoptionReq, loading, error };
};
