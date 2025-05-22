import { useDebouncedCallback } from "use-debounce";

type Props = {
  onSearch: (search: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const debounced = useDebouncedCallback((value) => {
    onSearch(value);
  }, 1000);
  return (
    <>
      <div className="pl-5 py-1 flex w-fit border-[1px] border-solid border-gray-500
       focus-within:border-secondary focus-within:bg-orange-50 rounded-full overflow-hidden">
        <img className="size-5" src="/Icons/SVGs/lupa.svg" alt="" />
        <input
          className="outline-none pl-4 focus:bg-orange-50"
          type="text"
          placeholder="Buscar mascotas ..."
          onChange={(e) => {
            debounced(e.target.value);
          }}
        />
      </div>
    </>
  );
}
