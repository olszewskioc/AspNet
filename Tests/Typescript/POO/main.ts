import { Pessoa } from "./Pessoa.ts";
import { Conta, Poupanca, Corrente } from "./Conta.ts";
import chalk from "@chalk";

function main(): void {
  try {
    const clientes: Array<Pessoa> = [new Pessoa("João", 30), new Pessoa("Maria", 20)];
    const contas: Array<Conta> = [new Corrente(clientes[0], 500, 200), new Poupanca(clientes[1], 200, 50)];

    // Aplicações financeiras
    contas[0].sacar(150);
    contas[0].depositar(50);
    console.log(contas[1].exibirDados(), "\n");

    contas[1].depositar(150);
    contas[1].sacar(150);
    console.log(chalk.green(contas[0].exibirDados()));

  } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("ERROR:", error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
  }
}
// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main();
}
