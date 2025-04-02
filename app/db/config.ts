import { defineDb, defineTable, column } from 'astro:db';

const Pets = defineTable({
  columns: {
   id: column.text({ primaryKey: true }),
   petname: column.text(),
   age: column.number(),
   gender: column.text(),
   species: column.text()

  }
})

export default defineDb({
  tables: { Pets },
})