import type { FormAdoptionReqType } from "../Domain/Types/FormAdoptionReqType";

export const FormAdoptionReq: FormAdoptionReqType = {
  PersonalData: {
    id: "",
    fullname: "",
    age: undefined,
    cellPhone: undefined,
    alternativeCellPhone: undefined,
    address: "",
  },
  Motivaciones: {
    motivation: "",
    forWho: "",
    petMoney: "",
    petFollowing: "",
    notAbandoned: "",
  },
  HomeConditions: {
    ownHouse: "",
    agreeRent: "",
    bigPlace: "",
    sleepPlace: "",
    houseNotScape: "",
    childrens: "",
    petAlergic: "",
  },
  Experience: {
    family: "",
    adoptionAgree: "",
    howManyPets: 0,
    petsBefore: "",
    petsBeforeAlive: "",
  },
  LifeStyle: {
    job: "",
    iftravel: "",
    petIfTravel: "",
    otherHouse: "",
  },
  Knowledge: {
    petDoctorClose: "",
    vacunationSchema: "",
    sterilizationOpinion: "",
  },
  Documentation: {
    CImgFront: "",
    CImgBack: "",
    youAgree: "",
  },
  petId: "",  
  isRead: false,
  isApproved: false,
};
