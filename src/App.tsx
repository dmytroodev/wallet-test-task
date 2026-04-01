import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import transactionsData from './data/transactions.json'
import { TransactionsList } from './screens/TransactionsList'
import { TransactionDetail } from './screens/TransactionDetail'
import type { Transaction } from './types/transaction'

const transactions = transactionsData as Transaction[]

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<TransactionsList transactions={transactions} />} />
          <Route
            path="/transaction/:id"
            element={<TransactionDetail transactions={transactions} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
