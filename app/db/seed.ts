import { db, Pets } from 'astro:db';
import { v4 as uuidv4 } from 'uuid';

export default async function () {
	await db.insert(Pets).values([
		{id: uuidv4(), petname: "Maykelbb", age:3, gender: "macho", species: "gato"},
		{id: uuidv4(), petname: "Paco", age:4, gender: "macho", species: "perro"},
		{id: uuidv4(), petname: "Juan", age:1, gender: "macho", species: "gato"},
		{id: uuidv4(), petname: "Manolo", age:5, gender: "macho", species: "perro"}
	])
}
