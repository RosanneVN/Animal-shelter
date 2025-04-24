import adoptionReqAdapters from "../Domain/Adapters/adoptionReq.adapters";
import type { FormAdoptionReqType } from "../Domain/Types/FormAdoptionReqType";
import type { AdoptionReqInterface } from "../interfaces/backendAPI";
import useFetch from "./useFetch";
import useMutation from "./useMutation";

const URL = "http://localhost:4321/api/adoptionRequest";

export const getServicesAdoptionReq = () => {
  const { data, error, loading } = useFetch<AdoptionReqInterface>({ url: URL });

  const adaptedData = adoptionReqAdapters({ data });
  return { data: adaptedData, error, loading };
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
        petId: requestsValuesContext.petId,
      },
    });
  };
  return { handleCreateAdoptionReq, loading, error };
};
