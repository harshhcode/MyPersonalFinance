import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import TransactionForm from "../components/TransactionForm";

const Transactions = () => {
  const { transactions, deleteTransaction } = useContext(FinanceContext);

  return (
    <div className="page">
      <h2>Transactions</h2>
      <TransactionForm />
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.type}</td>
              <td>{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>
                <button onClick={() => deleteTransaction(t.id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
