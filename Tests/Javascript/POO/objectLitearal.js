// class Jogador {
//     constructor(nome, idade) {
//         this.nome = nome,
//         this.idade = idade,
//         this.chutar = () => console.log(`${this.nome} chutou a bola para o gol!`)
//     }
// };

// class Time {
//     constructor(nome, qtd) {
//         this.nome = nome,
//         this.qtd = qtd,
//         this.jogadores = [],
//         this.addJogador = (jogador) => this.jogadores.push(jogador);
//     }
// };

function Jogador(nome, idade) {
    this.nome = nome,
    this.idade = idade,
    this.chutar = () => console.log(`${this.nome} chutou a bola para o gol!`)
};

function Time(nome, qtd) {
    this.nome = nome,
    this.qtd = qtd,
    this.jogadores = [],
    this.addJogador = (jogador) => this.jogadores.push(jogador)
}

let j1 = new Jogador("Caça rato", 30);
let j2 = new Jogador("Petcovick", 40);
let j3 = new Jogador("Valderrama", 50);

let t1 = new Time("Flamengo", 11);
t1.addJogador(j1);
t1.addJogador(j2);
t1.addJogador(j3);
console.table(t1.jogadores);
console.log(typeof t1)