// import { Animal } from "./Animal.js";   // Without export default
import Animal from "./Animal.js";   // With export default

export class Snake extends Animal {
    static venomous = true;
    constructor(name, weight, color, age, paws) {
        super(name, weight, color, age, paws);
    }
    walk = () => console.log("walnking snake")
};

class BlindSnake extends Animal {
    static venomous = false;
    constructor(name, weight, color, age, paws) {
        super(name, weight, color, age, paws);
    }
    walk = () => console.log("walnking snake")
};

// let s1 = new Snake("Cobla", 1, "Green", 1, 0)

// let s = []
// s.push(new Snake("Cobla", 1, "Green", 1, 0));
// s.push(new BlindSnake("Blind", 2, "Black", 2, 0));
// console.table(s)
