import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import type { Transaction } from '../types/transaction'
import { formatAmount, formatDateForList, getTransactionIcon } from '../utils/wallet'

interface TransactionRowProps {
  transaction: Transaction
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const navigate = useNavigate()
  const { icon, background } = getTransactionIcon(transaction.id)

  const subtitle = `${transaction.pending ? 'Pending - ' : ''}${transaction.description}`

  const dateLine = transaction.authorizedUser
    ? `${transaction.authorizedUser} - ${formatDateForList(transaction.date)}`
    : formatDateForList(transaction.date)

  return (
    <button
      type="button"
      className="transaction-row"
      onClick={() => navigate(`/transaction/${transaction.id}`)}
    >
      <span className="transaction-icon" style={{ backgroundColor: background }}>
        <FontAwesomeIcon icon={icon} />
      </span>

      <span className="transaction-main">
        <span className="transaction-name">{transaction.name}</span>
        <span className="transaction-subtitle">{subtitle}</span>
        <span className="transaction-meta">{dateLine}</span>
      </span>

      <span className="transaction-aside">
        <span
          className={`transaction-amount ${
            transaction.type === 'Payment' ? 'transaction-amount-positive' : ''
          }`}
        >
          {formatAmount(transaction.type, transaction.amount)}
        </span>
        <span className="transaction-chevron">
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </span>
    </button>
  )
}
