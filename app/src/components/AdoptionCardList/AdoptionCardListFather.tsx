type Props = { children: React.ReactNode };

export default function AdoptionCardListFather({ children }: Props) {
  return (
    <>
      <section
        className="grid grid-cols-4 grid-rows-flow place-items-center w-full gap-10 h-full
    max-lg:h-[200vh] max-sm:h-[450vh] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-10 my-10"
      >
        {children}
      </section>
    </>
  );
}
