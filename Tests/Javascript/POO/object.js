// Create an object with key: value
let car = {
    brand: "Fiat",
    model: "Uno",
    year: 2010,
    owner: {
        name: "Thiago Olszewski",
        birth: "01/10/2002",
        cpf: "030.669.871-40"
    },
    on: () => console.log("The car is on")
};

// console.log(car);
console.table(car);
car.on();
delete car.on;
console.table(car);
console.log(JSON.stringify(car));

const text = '{"name":"John", "age":30, "city":"New York"}';
const myArr = JSON.parse(text);

console.table(text);
console.table(myArr);