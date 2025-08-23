import {
  getServicesAdoptionReq,
  useHandleUpdateAdoptionReq,
} from "../../../../Services/adoptionReq.services";

type Props = {
  adoptionReqID?: string;
};

export const AdoptionReqView = ({ adoptionReqID }: Props) => {
  console.log(adoptionReqID);

  const { data } = getServicesAdoptionReq({ filterID: adoptionReqID });
  console.log("data", data);
  const adoptionReq = data[0];

  const { handleUpdateAdoptionReq, loading, error } =
    useHandleUpdateAdoptionReq();

  const phoneNumber = adoptionReq?.PersonalData.cellPhone;
  const sendWhatsAppMessage = ({ message }: { message: string }) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleApproved = async () => {
    await handleUpdateAdoptionReq({
      id: adoptionReq.PersonalData.id,
      isApprovedUpdate: true,
    });
    sendWhatsAppMessage({
      message:
        "Hola, somos la Organizacion de proteccion animal PASOS, hemos culminado con la revision de su solicitud, le damos la enorabuena¡Aprobamos tu solicitud! Pongase en contacto con nosotros para los siguientes pasos a seguir.",
    });
    window.location.href = "/administrationPages/AdoptionRequests";
  };
  const handleNotApproved = async () => {
    await handleUpdateAdoptionReq({
      id: adoptionReq.PersonalData.id,
      isApprovedUpdate: false,
    });
    console.log("desaprobada");
    sendWhatsAppMessage({
      message:
        "Hola, somos la Organizacion de proteccion animal PASOS, hemos culminado con la revision de su solicitud, lamentamos informarle que actualmente no cumple con los requerimientos necesarios para realizar la adopcion. Le agradecemos por su tiempo.",
    });
    window.location.href = "/administrationPages/AdoptionRequests";
  };

  return (
    <>
      <section
        className="pb-20 pt-40 px-36 w-full flex flex-col justify-center items-center gap-10
       text-lettersDark text-middleLetters max-sm:px-5 max-sm:text-shortLetters"
      >
        <div>
          <img
            className="size-80 rounded-lg"
            src={adoptionReq?.petImg}
            alt=""
          />
        </div>

        <div
          className="flex flex-col gap-5 rounded-lg w-[800px] border-2 border-orange-200 pb-5 overflow-hidden
        max-sm:w-[350px]"
        >
          <div className=" px-10 bg-orange-200 py-1">
            <h3 className=" font-semibold text-longLetters  uppercase">
              Personal Data
            </h3>
          </div>
          <div className=" px-10 max-sm:px-5">
            <p>
              <span className="font-semibold">Nombre completo: </span>{" "}
              {adoptionReq?.PersonalData.fullname}
            </p>
            <p>
              <span className="font-semibold">Edad: </span>{" "}
              {adoptionReq?.PersonalData.age}
            </p>
            <p>
              <span className="font-semibold">Dirección de residencia: </span>{" "}
              {adoptionReq?.PersonalData.address}
            </p>
            <p>
              <span className="font-semibold">
                Teléfono de contacto principal:
              </span>{" "}
              {adoptionReq?.PersonalData.cellPhone}
            </p>
            <p>
              <span className="font-semibold">Teléfono alternativo: </span>{" "}
              {adoptionReq?.PersonalData.alternativeCellPhone}
            </p>
          </div>
        </div>

        <div
          className=" rounded-lg w-[800px]  border-2 border-orange-200 pb-5 overflow-hidden gap-5
        max-sm:w-[350px]"
        >
          <div className=" px-10 bg-orange-200 py-1">
            {" "}
            <h3 className="font-semibold text-longLetters uppercase">
              Motivaciones
            </h3>
          </div>
          <div className=" px-10 max-sm:px-5 py-3">
            {" "}
            <p>
              <span className="font-semibold">Motivaciones: </span>{" "}
              {adoptionReq?.Motivaciones.motivation}{" "}
            </p>
            <p>
              <span className="font-semibold">Para quien: </span>{" "}
              {adoptionReq?.Motivaciones.forWho}
            </p>
            <p>
              <span className="font-semibold">
                {" "}
                ¿Está dispuesto/a a asumir todos los gastos que conlleva una
                mascota?:
              </span>
              {adoptionReq?.Motivaciones.petMoney}
            </p>
            <p>
              <span className="font-semibold">
                {" "}
                ¿Está de acuerdo con realizar un seguimiento mensual?:
              </span>

              {adoptionReq?.Motivaciones.petFollowing}
            </p>
            <p>
              <span className="font-semibold">
                {" "}
                En caso de que no pueda cuidar a la mascota en algún momento,
                ¿se compromete a contactarnos para buscar una solución en lugar
                de abandonarla?:
              </span>
              {adoptionReq?.Motivaciones.notAbandoned}
            </p>
          </div>
        </div>

        <div
          className="rounded-lg w-[800px]  border-2 border-orange-200 pb-5 overflow-hidden gap-5
        max-sm:w-[350px]"
        >
          <div className=" px-10 bg-orange-200 py-1">
            {" "}
            <h3 className="font-semibold text-longLetters uppercase">
              Condiciones del Hogar
            </h3>
          </div>
          <div className=" px-10 max-sm:px-5 py-3">
            {" "}
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                ¿Vive en casa propia o alquilada?:
              </span>{" "}
              {adoptionReq?.HomeConditions.ownHouse}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                Si es alquilada, ¿ha confirmado que permiten tener animales?:
              </span>{" "}
              {adoptionReq?.HomeConditions.agreeRent}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                ¿Cuenta con un espacio adecuado para la mascota?:
              </span>{" "}
              {adoptionReq?.HomeConditions.bigPlace}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                ¿Dónde tiene pensado que duerma la mascota?:
              </span>{" "}
              {adoptionReq?.HomeConditions.sleepPlace}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                ¿La vivienda está asegurada para evitar escapes?:
              </span>{" "}
              {adoptionReq?.HomeConditions.houseNotScape}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                ¿Hay niños pequeños en casa?:
              </span>{" "}
              {adoptionReq?.HomeConditions.childrens}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                ¿Hay algún alérgico o asmático en la casa?:
              </span>{" "}
              {adoptionReq?.HomeConditions.petAlergic}
            </p>
          </div>
        </div>

        <div
          className="rounded-lg w-[800px]  border-2 border-orange-200 pb-5 overflow-hidden gap-5
        max-sm:w-[350px]"
        >
          <div className=" px-10 bg-orange-200 py-1">
            {" "}
            <h3 className="font-semibold text-longLetters uppercase">
              Experiencia
            </h3>
          </div>
          <div className="px-10 py-3 max-sm:px-5">
            <p>
              {" "}
              <span className="font-semibold">
                ¿Con quién vive actualmente?:
              </span>{" "}
              {adoptionReq?.Experience.family}
            </p>
            <p>
              <span className="font-semibold">
                {" "}
                ¿Todos están de acuerdo con la adopción?:
              </span>{" "}
              {adoptionReq?.Experience.adoptionAgree}
            </p>
            <p>
              <span className="font-semibold">
                {" "}
                ¿Qué otras mascotas hay en casa actualmente?:
              </span>{" "}
              {adoptionReq?.Experience.howManyPets}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                ¿Ha tenido anteriormente un perro o gato?:
              </span>{" "}
              {adoptionReq?.Experience.petsBefore}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                Si es así, ¿sigue vivo o falleció?:
              </span>{" "}
              {adoptionReq?.Experience.petsBeforeAlive}
            </p>
          </div>
        </div>

        <div
          className="rounded-lg w-[800px]  border-2 border-orange-200 pb-5 overflow-hidden gap-5
        max-sm:w-[350px]"
        >
          <div className=" px-10 bg-orange-200 py-1">
            <h3 className="font-semibold text-longLetters uppercase">
              Estilo de vida
            </h3>
          </div>

          <div className="px-10 py-3 max-sm:px-5">
            {" "}
            <p>
              <span className="font-semibold">¿Trabaja o estudia?:</span>{" "}
              {adoptionReq?.LifeStyle.job}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                ¿Tiene planes de viajar en el futuro?:
              </span>{" "}
              {adoptionReq?.LifeStyle.iftravel}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                Si responde “sí,” ¿qué pasará con la mascota durante ese
                tiempo?:
              </span>
              {adoptionReq?.LifeStyle.petIfTravel}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                En caso de ausencia prolongada, ¿tiene a alguien de confianza
                que pueda cuidar a la mascota?:
              </span>
              {adoptionReq?.LifeStyle.otherHouse}
            </p>
          </div>
        </div>

        <div
          className="rounded-lg w-[800px]  border-2 border-orange-200 pb-5 overflow-hidden gap-5
        max-sm:w-[350px]"
        >
          <div className=" px-10 bg-orange-200 py-1">
            {" "}
            <h3 className="font-semibold text-longLetters uppercase">
              Conocimientos y Opiniones
            </h3>
          </div>
          <div className=" px-10 py-3 max-sm:px-5">
            {" "}
            <p>
              {" "}
              <span className="font-semibold">
                ¿Conoce algún veterinario en su zona?:
              </span>
              {adoptionReq?.Knowledge.petDoctorClose}
            </p>
            <p>
              {" "}
              <span className="font-semibold">
                {" "}
                ¿Conoce el esquema de vacunación y desparasitación?:
              </span>
              {adoptionReq?.Knowledge.vacunationSchema}
            </p>
            <p>
              <span className="font-semibold">
                {" "}
                ¿Qué opina sobre la esterilización?:
              </span>

              {adoptionReq?.Knowledge.sterilizationOpinion}
            </p>
          </div>
        </div>

        <div
          className="rounded-lg w-[800px]  border-2 border-orange-200 pb-5 overflow-hidden gap-5
        max-sm:w-[350px]"
        >
          <div className=" px-10 bg-orange-200 py-1">
            {" "}
            <h3 className="font-semibold text-longLetters uppercase">
              Documentación
            </h3>
          </div>
          <div className=" px-10 py-3 max-sm:px-5">
            {" "}
            <p>
              <span className="font-semibold">
                {" "}
                ¿Está de acuerdo con todas las condiciones anteriores?:
              </span>{" "}
              {adoptionReq?.Documentation.youAgree}
            </p>
            <p>
              <span className="font-semibold">Foto del CI:</span>
            </p>
            <div>
              <img src={adoptionReq?.Documentation.CImgFront} alt="p" />
              <img src={adoptionReq?.Documentation.CImgBack} alt="p" />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between px-36 max-sm:px-0">
          <button
            onClick={handleNotApproved}
            className="py-1 px-3 bg-secondary shadow-md rounded-lg font-semibold hover:text-red-600 hover:bg-white"
          >
            Desaprobar solicitud
          </button>
          <button
            onClick={handleApproved}
            className="py-1 px-3 bg-secondary shadow-md rounded-lg font-semibold hover:text-green-600 hover:bg-white"
          >
            Aprobar solicitud
          </button>
        </div>
      </section>
    </>
  );
};
