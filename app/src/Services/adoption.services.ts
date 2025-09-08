import adoptionAdapters from "../Domain/Adapters/adoption.adapters";
import type { Pets } from "../interfaces/backendAPI";
import useFetch from "./useFetch";
import useMutation from "./useMutation";

const URL = "/api/adoption";
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

  const adaptedData = adoptionAdapters({ data });
  return { data: adaptedData, loading, error, pagination }; 
};

type CreatePets = {
  petnameNew: string;
  ageNew: string;
  speciesNew: string;
  genderNew: string;
  imgNewBase64: string;
};
export const useHandleCreatePet = () => {
  const { mutate, loading, error } = useMutation();
  const handleCreatePet = async ({
    petnameNew,
    ageNew,
    speciesNew,
    genderNew,
    imgNewBase64,
  }: CreatePets) => {
    await mutate({
      url: URL,
      method: "POST",
      body: {
        petname: petnameNew,
        age: ageNew,
        species: speciesNew,
        gender: genderNew,
        img: imgNewBase64,
      },
    });
  };
  return { handleCreatePet, loading, error };
};

type UpdatePets = {
  idUpdate: string;
  petnameUpdate: string;
  ageUpdate: string;
  speciesUpdate: string;
  genderUpdate: string;
  imgUpdateBase64?: string;
};
export const useHandleUpdatePet = () => {
  const { mutate, loading, error } = useMutation();
  const handleUpdatePet = async ({
    idUpdate,
    petnameUpdate,
    ageUpdate,
    speciesUpdate,
    genderUpdate,
    imgUpdateBase64,
  }: UpdatePets) => {
    const body: any = {
      petname: petnameUpdate,
      age: ageUpdate,
      species: speciesUpdate,
      gender: genderUpdate,
    };

    if (imgUpdateBase64) {
      body.img = imgUpdateBase64;
    }

    await mutate({
      url: URL + "?id=" + idUpdate,
      method: "PATCH",
      body,
    });
    console.log(error);
  };
  return { handleUpdatePet, loading, error };
};

export const useHandleDeletePet = () => {
  const { mutate, loading, error } = useMutation();
  const handleDeletePet = async (id: string) => {
    await mutate({
      url: URL + "?id=" + id,
      method: "DELETE",
    });
    console.log(error);
  };
  return { handleDeletePet, loading, error };
};
