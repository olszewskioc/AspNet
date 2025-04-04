type Funcao = (a: number, b: number) => number;

const funcao: Funcao = (a, b) => a + b;

const somaOpcional = (a: number, b?: number) : number => a + (b ?? 0);

console.log(funcao(1,3))

