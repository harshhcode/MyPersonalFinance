import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

export default function Profile() {
  const { profile, updateProfile, transactions } = useContext(FinanceContext);
  const [form, setForm] = useState(profile);

  const totalExpenses = transactions.filter(t => t.type === "Expense").reduce((a,b) => a + b.amount, 0);
  const totalIncome = transactions.filter(t => t.type === "Income").reduce((a,b) => a + b.amount, 0);
  const totalSavings = totalIncome - totalExpenses;

  function onSave() {
    updateProfile(form);
  }

  return (
    <div>
      <h1>Profile</h1>

      <div className="panel">
        <label>Name</label>
        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />

        <label>Email</label>
        <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} />

        <label>Default Currency</label>
        <select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})}>
          <option>₹</option>
          <option>$</option>
          <option>€</option>
          <option>£</option>
        </select>

        <button onClick={onSave}>Save Profile</button>
      </div>

      <div className="panel">
        <p><strong>Total Expenses:</strong> {profile.currency}{totalExpenses.toLocaleString()}</p>
        <p><strong>Total Savings:</strong> {profile.currency}{totalSavings.toLocaleString()}</p>
      </div>
    </div>
  );
}
