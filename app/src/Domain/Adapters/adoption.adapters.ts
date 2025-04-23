import type { Pets } from "../../interfaces/backendAPI";
import type { PetsType } from "../Types/PetsType";

type Props = {
  data: Pets[];
};

//adaptar lo que me llega del backend a la interface del frontend
export default function adoptionAdapters({ data }: Props): PetsType[] {
  return data.map((pet) => ({
    id: pet.id,
    petname: pet.petname,
    age: pet.age,
    gender: pet.gender,
    species: pet.species,
  }));
}

type PropsToBackend = {
  data: PetsType[];
};
export function adoptionAdaptersToBackend({ data }: PropsToBackend): Pets[] {
  return data.map((pet) => ({
    id: pet.id,
    petname: pet.petname,
    age: pet.age,
    gender: pet.gender,
    species: pet.species,
  }));
}
