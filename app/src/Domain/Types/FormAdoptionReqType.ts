export interface FormPersonalDataType {
  id: string;
  fullname: string;
  age?: number;
  cellPhone?: number;
  alternativeCellPhone?: number;
  address: string;
}

export interface FormMotivacionesType {
  motivation: string;
  forWho: string;
  petMoney: string;
  petFollowing: string;
  notAbandoned: string;
}

export interface FormHomeConditionsType {
  ownHouse: string;
  agreeRent: string;
  bigPlace: string;
  sleepPlace: string;
  houseNotScape: string;
  childrens: string;
  petAlergic: string;
}

export interface FromExperienceType {
  family: string;
  adoptionAgree: string;
  howManyPets: number;
  petsBefore: string;
  petsBeforeAlive: string;
}

export interface FormLifeStyleType {
  job: string;
  iftravel: string;
  petIfTravel: string;
  otherHouse: string;
}

export interface FormKnowledgeType {
  petDoctorClose: string;
  vacunationSchema: string;
  sterilizationOpinion: string;
}

export interface FormDocumentationType {
  CIpicture?: File;
  youAgree: string;
}

export type FormAdoptionReqType = {
  PersonalData: FormPersonalDataType;
  Motivaciones: FormMotivacionesType;
  HomeConditions: FormHomeConditionsType;
  Experience: FromExperienceType;
  LifeStyle: FormLifeStyleType;
  Knowledge: FormKnowledgeType;
  Documentation: FormDocumentationType;
  petId: string;
};
