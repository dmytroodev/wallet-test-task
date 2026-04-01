import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'

import type { Transaction } from '../types/transaction'
import {
  formatCurrency,
  formatDateForList,
  formatFullDate,
  getTransactionIcon,
} from '../utils/wallet'

interface TransactionDetailProps {
  transactions: Transaction[]
}

export function TransactionDetail({ transactions }: TransactionDetailProps) {
  const navigate = useNavigate()
  const { id } = useParams()

  const transaction = transactions.find((entry) => entry.id === id)

  if (!transaction) {
    return (
      <main className="screen detail-screen">
        <button type="button" className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Back
        </button>
        <p className="not-found">Transaction not found.</p>
      </main>
    )
  }

  const { icon, background } = getTransactionIcon(transaction.id)

  return (
    <main className="screen detail-screen">
      <button type="button" className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
        Back
      </button>

      <section className="detail-header">
        <span className="detail-header-icon" style={{ backgroundColor: background }}>
          <FontAwesomeIcon icon={icon} />
        </span>
        <h1 className="detail-amount">{formatCurrency(transaction.amount)}</h1>
        <p className="detail-name">{transaction.name}</p>
        <p className="detail-date">{formatFullDate(transaction.date)}</p>
      </section>

      <section className="detail-card">
        <div className="detail-row detail-row-strong">
          <span>Status: {transaction.pending ? 'Pending' : 'Approved'}</span>
        </div>
        <div className="detail-row detail-row-muted">
          <span>{transaction.cardName}</span>
        </div>
        <div className="detail-divider" />
        <div className="detail-row">
          <span>Type</span>
          <span>{transaction.type}</span>
        </div>
        <div className="detail-row">
          <span>Description</span>
          <span>{transaction.description}</span>
        </div>
        <div className="detail-row">
          <span>Date</span>
          <span>{formatDateForList(transaction.date)}</span>
        </div>
        {transaction.authorizedUser && (
          <div className="detail-row">
            <span>Authorized User</span>
            <span>{transaction.authorizedUser}</span>
          </div>
        )}
        <div className="detail-divider" />
        <div className="detail-row detail-row-strong">
          <span>Total</span>
          <span>{formatCurrency(transaction.amount)}</span>
        </div>
      </section>
    </main>
  )
}
