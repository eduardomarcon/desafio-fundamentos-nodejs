import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: string;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length === 0) {
      return { income: 0, outcome: 0, total: 0 };
    }
    const sumIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((previous, { value }) => previous + value, 0);
    const sumOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((previous, { value }) => previous + value, 0);
    return {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
