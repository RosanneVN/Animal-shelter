//lo que llega al backend

//Seccion de las cards de informacion de las mascotas
export interface Pets {
  id: string;
  petname: string;
  age: number;
  gender: string;
  species: string;
}

//Seccion de las solicitudes de adoption
export interface AdoptionReqInterface {
  id: string;
  fullname: string;
  age?: number;
  cellPhone?: number;
  alternativeCellPhone?: number;
  address: string;
  motivation: string;
  forWho: string;
  petMoney: string;
  petFollowing: string;
  notAbandoned: string;
  ownHouse: string;
  agreeRent: string;
  bigPlace: string;
  sleepPlace: string;
  houseNotScape: string;
  childrens: string;
  petAlergic: string;
  family: string;
  adoptionAgree: string;
  howManyPets: number;
  petsBefore: string;
  petsBeforeAlive: string;
  job: string;
  iftravel: string;
  petIfTravel: string;
  otherHouse: string;
  petDoctorClose: string;
  vacunationSchema: string;
  sterilizationOpinion: string;
  CIpicture?: File;
  youAgree: string;
  petId: string;
  isRead: boolean;
  isApproved: boolean;
}
