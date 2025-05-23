import adoptionAdapters from "../Domain/Adapters/adoption.adapters";
import type { Pets } from "../interfaces/backendAPI";
import useFetch from "./useFetch";
import useMutation from "./useMutation";

const URL = "http://localhost:4321/api/adoption";
type Props = {
  filterSpecie?: string;
  searchFilter?: string;
  page?: number;
  limit?: number;
};

export const getServicesPets = ({
  filterSpecie = "",
  searchFilter = "",
  page,
  limit,
}: Props) => {
  const { data, loading, error, pagination } = useFetch<Pets>({
    url: `${URL}?species=${filterSpecie}&search=${searchFilter}&page=${page}&limit=${limit}`,
  });
  console.log(page);
  console.log(limit);

  const adaptedData = adoptionAdapters({ data });
  return { data: adaptedData, loading, error, pagination };
};

type CreatePets = {
  petnameNew: string;
  ageNew: number;
  speciesNew: string;
  genderNew: string;
};
export const useHandleCreatePet = () => {
  const { mutate, loading, error } = useMutation();
  const handleCreatePet = ({
    petnameNew,
    ageNew,
    speciesNew,
    genderNew,
  }: CreatePets) => {
    mutate({
      url: URL,
      method: "POST",
      body: {
        petname: petnameNew,
        age: ageNew,
        species: speciesNew,
        gender: genderNew,
      },
    });
  };
  return { handleCreatePet, loading, error };
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
