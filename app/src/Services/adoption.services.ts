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

export const handleUpdatePet = () => {
  const { mutate, loading, error } = useMutation();
  mutate({
    url: URL,
    method: "PATCH",
    body: {
      petname: "Carlos",
      age: 2,
      species: "gato",
      gender: "macho",
    },
  });
};

export const handleDeletePet = (id: string) => {
  const { mutate, loading, error } = useMutation();
  mutate({
    id: id,
    url: URL,
    method: "DELETE",
  });
};
