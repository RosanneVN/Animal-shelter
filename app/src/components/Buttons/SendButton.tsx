type Props = {
  type?: "submit" | "button";
};

export default function SendButton({ type }: Props) {
  return (
    <>
      <button
        className="uppercase text-lettersDark w-fit bg-orange-200 py-1
 px-5 rounded-xl shadow-lg hover:translate-y-1 hover:shadow-none"
        type={type}
      >
        enviar
      </button>
    </>
  );
}
