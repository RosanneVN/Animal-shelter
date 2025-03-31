type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const WarningMesage = ({ onClick }: Props) => {
  return (
    <div className="flex flex-col bg-white h-28 rounded-lg px-10 justify-center items-center gap-5">
      <p className="text-shortLetters">
        ¿Está seguro que desea eliminar este elemento?
      </p>
      <button
        onClick={onClick}
        className="flex bg-secondary py-2 px-3 rounded-full text-shortLetters hover:shadow-none shadow-md "
      >
        Aceptar
      </button>
    </div>
  );
};
export default WarningMesage;
