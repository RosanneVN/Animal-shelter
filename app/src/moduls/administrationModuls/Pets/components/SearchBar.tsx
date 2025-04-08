import { useDebouncedCallback } from "use-debounce";

type Props = {
  onSearch: (search: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const debounced = useDebouncedCallback((value) => {
    onSearch(value);
  }, 1000);
  return (
    <input
      type="text"
      placeholder="Buscar mascotas ..."
      onChange={(e) => {
        debounced(e.target.value);
      }}
    />
  );
}
