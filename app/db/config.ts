import { defineDb, defineTable, column } from "astro:db";

const Pets = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    petname: column.text(),
    age: column.number(),
    gender: column.text(),
    species: column.text(),
    img: column.text(),
    fileId: column.text(),
  },
});

const AdoptionRequestsDB = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    //personal data
    fullname: column.text(),
    age: column.number(),
    cellPhone: column.number(),
    alternativeCellPhone: column.number(),
    address: column.text(),

    //motivaciones

    motivation: column.text(),
    forWho: column.text(),
    petMoney: column.text(),
    petFollowing: column.text(),
    notAbandoned: column.text(),

    //Home conditions
    ownHouse: column.text(),
    agreeRent: column.text(),
    bigPlace: column.text(),
    sleepPlace: column.text(),
    houseNotScape: column.text(),
    childrens: column.text(),
    petAlergic: column.text(),

    //Experience
    family: column.text(),
    adoptionAgree: column.text(),
    howManyPets: column.number(),
    petsBefore: column.text(),
    petsBeforeAlive: column.text(),

    //LifeStyle
    job: column.text(),
    iftravel: column.text(),
    petIfTravel: column.text(),
    otherHouse: column.text(),

    //Knowledge
    petDoctorClose: column.text(),
    vacunationSchema: column.text(),
    sterilizationOpinion: column.text(),

    //Documentation
    youAgree: column.text(),
    CImgFront: column.text(),
    CImgBack: column.text(),
    idImgCIFront: column.text(),
    idImgCBack: column.text(),

    //union de tablas, llave foranea
    petId: column.text({ references: () => Pets.columns.id }),

    //Read
    isRead: column.boolean(),
    isApproved: column.boolean(),
  },
});

const CreditCardsDB = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    cardNumber: column.text(),
    numberPhone: column.number(),
    nameCard: column.text(),
  },
});

const UserAuth = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text(),
    password: column.text(),
  }
})

export default defineDb({
  tables: { Pets, AdoptionRequestsDB, CreditCardsDB, UserAuth },
});
