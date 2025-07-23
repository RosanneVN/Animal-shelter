import {
  db,
  Pets,
  AdoptionRequestsDB,
  CreditCardsDB,
  UserAuth,
  BlogPostsDB,
  CalendarEvents,
} from "astro:db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
export default async function () {
  await db.insert(Pets).values([
    {
      id: "311221",
      petname: "Maykelbb",
      age: 3,
      gender: "macho",
      species: "gato",
      img: "https://th.bing.com/th/id/OIP.DZxGvmQNRyqBpiFYR74KdQHaEK?rs=1&pid=ImgDetMain",
      fileId: "gggg",
    },
    {
      id: "999",
      petname: "Paco",
      age: 4,
      gender: "macho",
      species: "perro",
      img: "https://th.bing.com/th/id/OIP.DZxGvmQNRyqBpiFYR74KdQHaEK?rs=1&pid=ImgDetMain",
      fileId: "ggg3g",
    },
    {
      id: uuidv4(),
      petname: "Jacinto",
      age: 2.5,
      gender: "macho",
      species: "perro",
      img: "https://th.bing.com/th/id/OIP.DZxGvmQNRyqBpiFYR74KdQHaEK?rs=1&pid=ImgDetMain",
      fileId: "gggg",
    },
  ]);
  await db.insert(AdoptionRequestsDB).values([
    {
      id: uuidv4(),
      fullname: "Rosanne Vazquez Nunez",
      age: 21,
      cellPhone: 56775245,
      alternativeCellPhone: 56775245,
      address: "Playa, Jaimanistas",
      motivation: "Me gusta animales",
      forWho: "Para mi",
      petMoney: "Si",
      petFollowing: "Si",
      notAbandoned: "Si",
      ownHouse: "Alquilado",
      agreeRent: "Si",
      bigPlace: "Si",
      sleepPlace: "Camita de perro",
      houseNotScape: "Si",
      childrens: "No",
      petAlergic: "No",
      family: "mi novio",
      adoptionAgree: "Si",
      howManyPets: 0,
      petsBefore: "Si",
      petsBeforeAlive: "Si",
      job: "Trabajo",
      iftravel: "Si",
      petIfTravel: "Mi mm lo cuidara",
      otherHouse: "Si",
      petDoctorClose: "Para mi",
      vacunationSchema: "Para mi",
      sterilizationOpinion: "Bien",
      youAgree: "Si",
      CImgFront:
        "https://th.bing.com/th/id/OIP.uji87jJr-E5MppjfnrVCdwHaDt?rs=1&pid=ImgDetMain",
      CImgBack:
        "https://th.bing.com/th/id/OIP.uji87jJr-E5MppjfnrVCdwHaDt?rs=1&pid=ImgDetMain",
      idImgCIFront: "gggg",
      idImgCBack: "ggg3g",
      petId: "311221",
      isRead: false,
      isApproved: false,
    },
    {
      id: uuidv4(),
      fullname: "Erick Garcia",
      age: 23,
      cellPhone: 56775245,
      alternativeCellPhone: 56775245,
      address: "La Lisa, UCI",
      motivation: "Me gusta animales",
      forWho: "Para mi",
      petMoney: "Si",
      petFollowing: "Si",
      notAbandoned: "Si",
      ownHouse: "Alquilado",
      agreeRent: "Si",
      bigPlace: "Si",
      sleepPlace: "Camita de perro",
      houseNotScape: "Si",
      childrens: "No",
      petAlergic: "No",
      family: "mi novio",
      adoptionAgree: "Si",
      howManyPets: 0,
      petsBefore: "Si",
      petsBeforeAlive: "Si",
      job: "Trabajo",
      iftravel: "Si",
      petIfTravel: "Mi mm lo cuidara",
      otherHouse: "Si",
      petDoctorClose: "Para mi",
      vacunationSchema: "Para mi",
      sterilizationOpinion: "Bien",
      youAgree: "Si",
      CImgFront:
        "https://images.unsplash.com/photo-1678489860935-a5a732d25b4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      CImgBack:
        "https://images.unsplash.com/photo-1678489860935-a5a732d25b4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      idImgCIFront: "ggg3g",
      idImgCBack: "gggg",
      petId: "999",
      isRead: false,
      isApproved: false,
    },
  ]);

  await db.insert(CreditCardsDB).values([
    {
      id: uuidv4(),
      cardNumber: "9254-0987-5643-6543",
      numberPhone: 56775245,
      nameCard: "Tarjeta de prueba",
    },
    {
      id: uuidv4(),
      cardNumber: "9254-6621-5643-8734",
      numberPhone: 58908790,
      nameCard: "Tarjeta de prueba",
    },
    {
      id: uuidv4(),
      cardNumber: "1234-0987-5643-6543",
      numberPhone: 53435687,
      nameCard: "Tarjeta de prueba",
    },
  ]);
  await db.insert(UserAuth).values([
    {
      id: uuidv4(),
      username: "rosanne",
      password: bcrypt.hashSync("123456", 10),
    },
  ]);

  await db.insert(BlogPostsDB).values([
    {
      id: uuidv4(),
      title: "Cómo preparar tu hogar para adoptar una mascota",
      content:
        "Adoptar una mascota es una decisión importante que requiere preparación. En este artículo te explicamos todo lo que necesitas saber para preparar tu hogar y recibir a tu nuevo compañero de la mejor manera posible. Desde la elección del espacio adecuado hasta los elementos básicos que necesitarás tener listos antes de la llegada de tu nueva mascota.",
      excerpt:
        "Guía completa para preparar tu hogar antes de adoptar una mascota. Consejos prácticos y elementos esenciales.",
      imageUrl:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      publishedDate: "2024-12-01",
      isPublished: true,
      createdAt: "2024-12-01T10:00:00Z",
      updatedAt: "2024-12-01T10:00:00Z",
    },
    {
      id: uuidv4(),
      title: "Los beneficios de adoptar mascotas mayores",
      content:
        "Muchas personas buscan cachorros cuando deciden adoptar, pero las mascotas mayores tienen ventajas únicas que las hacen compañeros maravillosos. Son más tranquilas, ya tienen personalidad definida, y suelen ser muy agradecidas. En este post exploramos por qué adoptar una mascota mayor puede ser la mejor decisión que tomes.",
      excerpt:
        "Descubre las ventajas de adoptar mascotas adultas y cómo pueden ser los compañeros perfectos.",
      imageUrl:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      publishedDate: "2024-11-28",
      isPublished: true,
      createdAt: "2024-11-28T14:30:00Z",
      updatedAt: "2024-11-28T14:30:00Z",
    },
    {
      id: uuidv4(),
      title: "Cuidados básicos para gatos rescatados",
      content:
        "Los gatos rescatados necesitan cuidados especiales durante sus primeras semanas en el nuevo hogar. Desde la alimentación adecuada hasta la socialización gradual, este artículo cubre todos los aspectos importantes para garantizar que tu gato rescatado se adapte de la mejor manera a su nueva vida.",
      excerpt:
        "Todo lo que necesitas saber sobre el cuidado de gatos recién rescatados.",
      imageUrl:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      publishedDate: "2024-11-25",
      isPublished: true,
      createdAt: "2024-11-25T09:15:00Z",
      updatedAt: "2024-11-25T09:15:00Z",
    },
    {
      id: uuidv4(),
      title: "Historia de éxito: Jacinto encuentra su hogar perfecto",
      content:
        "Conoce la emotiva historia de Jacinto, un perro que llegó al refugio en condiciones difíciles y después de meses de cuidado y amor, finalmente encontró una familia que lo adoptó. Esta es una historia que nos recuerda por qué hacemos este trabajo y la importancia de nunca rendirse.",
      excerpt:
        "La inspiradora historia de Jacinto y su camino hacia encontrar una familia amorosa.",
      imageUrl:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      publishedDate: "2024-11-20",
      isPublished: true,
      createdAt: "2024-11-20T16:45:00Z",
      updatedAt: "2024-11-20T16:45:00Z",
    },
    {
      id: uuidv4(),
      title: "Próximos eventos de adopción en la comunidad",
      content:
        "Te invitamos a participar en nuestros próximos eventos de adopción que se realizarán en diferentes puntos de la ciudad. Estos eventos son una oportunidad perfecta para conocer a nuestras mascotas disponibles para adopción en un ambiente relajado y familiar. ¡Ven y conoce a tu futuro compañero!",
      excerpt:
        "Únete a nuestros eventos de adopción y encuentra a tu nuevo mejor amigo.",
      imageUrl:
        "https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      publishedDate: "2024-11-15",
      isPublished: false,
      createdAt: "2024-11-15T12:00:00Z",
    },
  ]);

  await db.insert(CalendarEvents).values([
    {
      id: uuidv4(),
      date: "2024-11-20",
      title: "Feria de adopciones de mascotas",
      location: "Playa, Jaimanitas",
      description:
        "Feria de adopciones donde se puede ver a los animales y adoptarlos.",
      img: "https://th.bing.com/th/id/OIP.DZxGvmQNRyqBpiFYR74KdQHaEK?rs=1&pid=ImgDetMain",
      fileId: "gggg",
    },
    {
      id: uuidv4(),
      date: "2024-11-15",
      title: "Feria de adopciones de mascotas",
      location: "Playa, Jaimanitas",
      description:
        "Feria de adopciones donde se puede ver a los animales y adoptarlos.",
      img: "https://th.bing.com/th/id/OIP.DZxGvmQNRyqBpiFYR74KdQHaEK?rs=1&pid=ImgDetMain",
      fileId: "gggg",
    },
  ]);
}
