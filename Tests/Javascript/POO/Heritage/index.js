import Animal from "./Animal.js"
import { Snake } from "./Snake.js";

const animal = new Animal("Animal", 25, "Red", 20, 6);
const snake = new Snake("Animal", 25, "Red", 20, 6);
console.table(snake)
let snake1
console.log(Object.getOwnPropertyDescriptors(snake));
Object.assign(snake1, snake) // Copia snake para snake1

