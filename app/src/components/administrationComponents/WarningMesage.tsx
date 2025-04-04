type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const WarningMesage = ({ onClick, onClose }: Props) => {
  return (
    <div className="flex flex-col bg-white h-28 rounded-lg px-10 justify-center items-center gap-5">
      <p className="text-shortLetters">
        ¿Está seguro que desea eliminar este elemento?
      </p>
      <div className="flex gap-2">
        <button
          onClick={onClick}
          className="flex bg-secondary py-2 px-3 rounded-full text-shortLetters hover:shadow-none shadow-md "
        >
          Aceptar
        </button>
        <button
          onClick={onClose}
          className="flex bg-white text-red-600 py-2 px-3 rounded-full text-shortLetters hover:shadow-none shadow-md "
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
export default WarningMesage;
