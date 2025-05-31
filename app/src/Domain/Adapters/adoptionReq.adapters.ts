import type { FormAdoptionReqType } from "../Types/FormAdoptionReqType";
import type { AdoptionReqInterface } from "../../interfaces/backendAPI";

type Props = {
  data: AdoptionReqInterface[];
};

export default function adoptionReqAdapters({
  data,
}: Props): FormAdoptionReqType[] {
  return data.map((adoptionReq) => ({
    PersonalData: {
      id: adoptionReq.id,
      fullname: adoptionReq.fullname,
      age: adoptionReq?.age || 0,
      cellPhone: adoptionReq?.cellPhone || 0,
      alternativeCellPhone: adoptionReq?.alternativeCellPhone || 0,
      address: adoptionReq.address,
    },
    Motivaciones: {
      motivation: adoptionReq.motivation,
      forWho: adoptionReq.forWho,
      petMoney: adoptionReq.petMoney,
      petFollowing: adoptionReq.petFollowing,
      notAbandoned: adoptionReq.notAbandoned,
    },
    HomeConditions: {
      ownHouse: adoptionReq.ownHouse,
      agreeRent: adoptionReq.agreeRent,
      bigPlace: adoptionReq.bigPlace,
      sleepPlace: adoptionReq.sleepPlace,
      houseNotScape: adoptionReq.houseNotScape,
      childrens: adoptionReq.childrens,
      petAlergic: adoptionReq.petAlergic,
    },
    Experience: {
      family: adoptionReq.family,
      adoptionAgree: adoptionReq.adoptionAgree,
      howManyPets: adoptionReq?.howManyPets || 0,
      petsBefore: adoptionReq.petsBefore,
      petsBeforeAlive: adoptionReq.petsBeforeAlive,
    },
    LifeStyle: {
      job: adoptionReq.job,
      iftravel: adoptionReq.iftravel,
      petIfTravel: adoptionReq.petIfTravel,
      otherHouse: adoptionReq.otherHouse,
    },
    Knowledge: {
      petDoctorClose: adoptionReq.petDoctorClose,
      vacunationSchema: adoptionReq.vacunationSchema,
      sterilizationOpinion: adoptionReq.sterilizationOpinion,
    },
    Documentation: {
      youAgree: adoptionReq.youAgree,
      CImgFront: adoptionReq.CImgFront,
      CImgBack: adoptionReq.CImgBack,
    },
    petId: adoptionReq.petId,
    isRead: adoptionReq.isRead,
    isApproved : adoptionReq.isApproved,
    petImg: adoptionReq.petImg
  }));
}
