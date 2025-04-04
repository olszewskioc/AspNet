import { Poupanca, Corrente } from './Conta.ts';
import { assertEquals, assertThrows } from "@std/assert";
import { Pessoa } from "./Pessoa.ts";

Deno.test("CC: Teste de saque: Saldo + cheque 300 - saque 150", () => {
  const pessoa = new Pessoa("Thiago", 22);
  const conta = new Corrente(pessoa, 200, 100);
  conta.sacar(150);

  assertEquals(conta.getSaldo(), 50);
});

Deno.test("CC: Saque maior que saldo deve lançar erro", () => {
  const pessoa = new Pessoa("Thiago", 22);
  const conta = new Corrente(pessoa, 100, 100);

  assertThrows(
    () => conta.sacar(250),
    Error,
    "Valor do saque excedeu o limite do cheque especial!"
  );
});