// Comando para executar o código ts diretamente pelo node:
// npm i -g typescript ts-node
// npx tsc --init   // Create tsconfig.js
// ts-node archive.ts


var a: number = 10;
var b: number = 5;

var total: number = a + b;

console.log(total);

let nome: string = "Thiago";
let sobrenome: string = "Olszewski";

console.log(`Nome completo: ${nome.concat(" ", sobrenome)}`);

let textRepeat: string = nome.repeat(3);

console.log(`Nome repetido: ${textRepeat}`)

let result: string = (7 > 10) ? "A é maior que B" : "B é maior que A";

console.log(result);

console.log(--a, a--, a);   // -- após ele mostra e depois decrementa, antes ele decrementa e depois mostra

let t: string | null = null;

let text: string = t ?? "Não informou nada!";

console.log(text);

let pessoa: { nome: string; idade: number};

pessoa = {nome: "Thiago", idade: 22};

console.table(pessoa);

let user: {senha: number} = {senha: 1234, ...pessoa};
console.table(user);

// any para qualquer tipo

let resultados: { [key: string]: number | string } = {
    a: a,
    b: b,
    soma: a + b,
    subtracao: a - b,
    multiplicacao: a * b,
    divisao: a / b,
    resto: a % b
};

console.table(resultados);
console.log(resultados["soma"]);