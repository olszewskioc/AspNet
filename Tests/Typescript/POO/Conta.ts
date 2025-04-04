import { Pessoa } from "./Pessoa.ts";

export class Conta {
    protected titular: Pessoa;
    protected saldo: number;

    constructor(titular: Pessoa, saldo: number) {
        this.titular = titular;
        this.saldo = saldo;
    }

    public getSaldo(): number { return this.saldo }

    public getTitular(): string {
        return this.titular.exibirDados();
    }

    public exibirDados(): string {
        return `Nome ${this.titular.getNome()} | Saldo: ${this.getSaldo()}`
    }

    public depositar(valor: number): void {
        if (valor <= 0) throw new Error("Valor de depósito deve ser positivo");

        this.saldo += valor;
    }

    public sacar(valor: number): void {
        if (valor <= 0) throw new Error("Valor de saque deve ser positivo");
        if (valor > this.saldo) throw new Error(`Valor de saque deve ser inferior ao saldo: R$${this.saldo}`);
        this.saldo -= valor;
    }
}

export class Poupanca extends Conta {
    private taxaRendimento: number;

    constructor(titular: Pessoa, saldo: number, taxaRendimento: number) {
        super(titular, saldo);
        this.taxaRendimento = taxaRendimento;
    }

    public aplicarRendimento(): void {
        this.saldo += this.saldo * (this.taxaRendimento / 100); 
    }

    public override exibirDados(): string {
        return `Titular ${this.titular.getNome()} | Saldo: ${this.getSaldo()}\nRendimento: ${this.taxaRendimento}%`
    }
}

export class Corrente extends Conta {
    private limiteChequeEspecial: number;

    constructor(titular: Pessoa, saldo: number, limiteChequeEspecial: number) {
        super(titular, saldo);
        this.limiteChequeEspecial = limiteChequeEspecial;
    }

    public override sacar(valor: number): void {
        if (valor > this.saldo + this.limiteChequeEspecial) throw new Error("Valor do saque excedeu o limite do cheque especial!");
        if (valor <= 0) throw new Error("Valor de saque deve ser positivo");
        if (valor < this.saldo) {
            this.saldo -= valor;
        } else if (valor > this.saldo && valor < this.limiteChequeEspecial) {
            this.limiteChequeEspecial -= valor - this.saldo;
            this.saldo = 0;
        }
    }

    public override exibirDados(): string {
        return `Titular ${this.titular.getNome()} | Saldo: ${this.getSaldo()}\nLimite Cheque Especial: R$${this.limiteChequeEspecial}`
    }
}