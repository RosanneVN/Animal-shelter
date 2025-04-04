import adoptionAdapters, {
  adoptionAdaptersToBackend,
} from "../Domain/Adapters/adoption.adapters";
import type { Pets } from "../interfaces/backendAPI";
import useFetch from "./useFetch";
import useMutation from "./useMutation";

const URL = "http://localhost:4321/api/adoption";

export const getServicesPets = () => {
  const { data, loading, error } = useFetch<Pets>({ url: URL });
  const adaptedData = adoptionAdapters({ data });
  return { data: adaptedData, loading, error };
};

export const handleCreatePet = ({}) => {
  const { mutate, loading, error } = useMutation();
  mutate({
    url: URL,
    method: "POST",
    body: {
      petname: "Pedro",
      age: 2,
      species: "perro",
      gender: "macho",
    },
  });
};

type UpdatePets = {
  idUpdate: string;
  petnameUpdate: string;
  ageUpdate: number;
  speciesUpdate: string;
  genderUpdate: string;
};
export const useHandleUpdatePet = () => {
  const { mutate, loading, error } = useMutation();
  const handleUpdatePet = ({
    idUpdate,
    petnameUpdate,
    ageUpdate,
    speciesUpdate,
    genderUpdate,
  }: UpdatePets) => {
 const m = mutate({
      url: URL + "?id=" + idUpdate,
      method: "PATCH",
      body: {
        petname: petnameUpdate,
        age: ageUpdate,
        species: speciesUpdate,
        gender: genderUpdate,
      },
    });
    console.log(m);

    console.log(error);
  };
  return { handleUpdatePet, loading, error };
};

export const useHandleDeletePet = () => {
  const { mutate, loading, error } = useMutation();
  const handleDeletePet = (id: string) => {
    const m = mutate({
      url: URL + "?id=" + id,
      method: "DELETE",
    });
    console.log(m);

    console.log(error);
  };
  return { handleDeletePet, loading, error };
};
