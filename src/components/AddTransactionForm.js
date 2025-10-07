import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

export default function AddTransactionForm() {
  const { addTransaction, profile } = useContext(FinanceContext);
  const [form, setForm] = useState({
    type: "Expense",
    amount: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;
    const tx = {
      ...form,
      id: Date.now(),
      amount: Number(form.amount)
    };
    addTransaction(tx);
    setForm({ type: "Expense", amount: "", category: "", date: new Date().toISOString().slice(0,10), description: "" });
  };

  return (
    <form className="form-row" onSubmit={onSubmit}>
      <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option>Income</option>
        <option>Expense</option>
      </select>
      <input
        type="number"
        placeholder={`${profile.currency} Amount`}
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />
      <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
      <input placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button type="submit">Add</button>
    </form>
  );
}
