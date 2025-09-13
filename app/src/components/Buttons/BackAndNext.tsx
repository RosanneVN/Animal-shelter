type Props = {
  prevStep?: () => void;
  nextStep?: () => void;
  isFinalStep?: boolean;
};

const BackAndNext = ({ prevStep, nextStep, isFinalStep = false }: Props) => {
  return (
    <div className="flex justify-between w-full pb-4">
      {prevStep && (
        <button
          type="button"
          onClick={prevStep}
          className="bg-white shadow-lg hover:translate-y-1 hover:shadow-none hover:text-red-600 py-1 px-4 rounded-full text-sm"
        >
          Anterior
        </button>
      )}

      {isFinalStep ? (
        <button
          type="submit"
          className="bg-white shadow-lg hover:translate-y-1 hover:shadow-none hover:text-red-600 py-1 px-4 rounded-full text-sm"
        >
          Finalizar
        </button>
      ) : (
        <button
          type="button"
          onClick={nextStep}
          className="bg-white shadow-lg ml-auto hover:translate-y-1 hover:shadow-none hover:text-red-600 py-1 px-4 rounded-full text-sm"
        >
          Siguiente
        </button>
      )}
    </div>
  );
};
export default BackAndNext;
