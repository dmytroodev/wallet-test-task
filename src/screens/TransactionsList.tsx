import type { Transaction } from '../types/transaction'
import {
  CARD_LIMIT,
  calculateDailyPoints,
  formatCurrency,
  formatPoints,
} from '../utils/wallet'
import { TransactionRow } from '../components/TransactionRow'

interface TransactionsListProps {
  transactions: Transaction[]
}

const initialCardBalance = Number((Math.random() * 400 + 10).toFixed(2))

export function TransactionsList({ transactions }: TransactionsListProps) {
  const available = CARD_LIMIT - initialCardBalance
  const dailyPoints = formatPoints(calculateDailyPoints())

  return (
    <main className="screen">
      <section className="summary-grid">
        <article className="summary-card">
          <p className="summary-label">Card Balance</p>
          <p className="summary-value">{formatCurrency(initialCardBalance)}</p>
          <p className="summary-subtext">{formatCurrency(available)} Available</p>
        </article>

        <article className="summary-card payment-due-card">
          <p className="summary-label">No Payment Due</p>
          <p className="summary-subtext payment-due-text">You've paid your balance.</p>
          <p className="payment-due-check">✓</p>
        </article>

        <article className="summary-card">
          <p className="summary-label">Daily Points</p>
          <p className="summary-points">{dailyPoints}</p>
        </article>
      </section>

      <section className="transactions-panel">
        <h1 className="section-title">Latest Transactions</h1>
        <div className="transactions-list">
          {transactions.slice(0, 10).map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </section>
    </main>
  )
}
