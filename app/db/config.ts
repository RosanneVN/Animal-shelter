import { defineDb, defineTable, column } from "astro:db";

const Pets = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    petname: column.text(),
    age: column.text(),
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

const BlogPostsDB = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    content: column.text(),
    excerpt: column.text(),
    imageUrl: column.text({ optional: true }),
    img: column.text({ optional: true }), // Base64 image for upload
    fileId: column.text({ optional: true }), // CDN file ID for deletion
    publishedDate: column.text(),
    isPublished: column.boolean({ default: true }),
    createdAt: column.text(),
    updatedAt: column.text({ optional: true }),
  },
});

const CalendarEvents = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    date: column.text(),
    location: column.text(),
    description: column.text(),
    img: column.text(),
    title: column.text(),
    fileId: column.text(),
  }
})

export default defineDb({
  tables: { Pets, AdoptionRequestsDB, CreditCardsDB, UserAuth, BlogPostsDB, CalendarEvents },
});
