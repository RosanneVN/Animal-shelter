const BackAndNext = ({prevStep, nextStep}) => {
  return (
    <>
      <div className="flex justify-around pb-4">
        <button
          className="bg-white shadow-lg  hover:bg-red-600 py-1 px-4 rounded-full text-sm"
          onClick={prevStep}
        >
          Anterior
        </button>

        <button
          className="bg-white shadow-lg hover:bg-green-500 text-sm py-1 px-4 rounded-full"
          onClick={nextStep}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};
export default BackAndNext;
