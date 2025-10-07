import React, { useContext, useMemo, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

export default function ExpenseTable({ showOnlyToday = false }) {
  const { transactions, deleteTransaction } = useContext(FinanceContext);
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  const filtered = useMemo(() => {
    let list = [...transactions];
    if (showOnlyToday) {
      const today = new Date().toISOString().slice(0,10);
      list = list.filter(t => t.date === today);
    }
    list.sort((a,b) => {
      if (sortField === "amount") return (a.amount - b.amount) * (sortDir === "asc" ? 1 : -1);
      if (sortField === "date") return (new Date(a.date) - new Date(b.date)) * (sortDir === "asc" ? 1 : -1);
      return 0;
    });
    return list;
  }, [transactions, showOnlyToday, sortField, sortDir]);

  const toggleSort = (field) => {
    if (field === sortField) setSortDir(prev => prev === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="table-wrap">
      <table className="tx-table">
        <thead>
          <tr>
            <th>Type</th>
            <th onClick={() => toggleSort("amount")} style={{cursor:"pointer"}}>Amount</th>
            <th>Category</th>
            <th onClick={() => toggleSort("date")} style={{cursor:"pointer"}}>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan={6} style={{textAlign:"center"}}>No transactions</td></tr>
          )}
          {filtered.map(tx => (
            <tr key={tx.id}>
              <td>{tx.type}</td>
              <td>{tx.amount.toLocaleString()}</td>
              <td>{tx.category}</td>
              <td>{tx.date}</td>
              <td>{tx.description}</td>
              <td><button className="btn-delete" onClick={() => deleteTransaction(tx.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
