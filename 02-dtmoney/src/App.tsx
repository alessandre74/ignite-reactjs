import { useState } from 'react'
import Modal from 'react-modal'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { NewTransactionModal } from './components/NewTransactionModal'
import { TransactionsProvier } from './hooks/useTransactions'

import { GlobalStyle } from './styles/global'

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, SetIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    SetIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    SetIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvier>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />
      <GlobalStyle />
    </TransactionsProvier>
  )
}
