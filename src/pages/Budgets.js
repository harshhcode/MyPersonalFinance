import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { toast } from "react-toastify";

export default function Budgets() {
  const { budgets, setBudgets, transactions, profile } = useContext(FinanceContext);
  const [cat, setCat] = useState("");
  const [amt, setAmt] = useState("");

  const addBudget = () => {
    if (!cat || !amt) return;
    setBudgets(prev => ({ ...prev, [cat]: Number(amt) }));
    setCat(""); setAmt("");
    toast.success("Budget saved");
  };

  const spent = (category) =>
    transactions.filter(t => t.type === "Expense" && t.category === category).reduce((a,b) => a + b.amount, 0);

  return (
    <div>
      <h1>Budgets</h1>

      <div className="panel">
        <div className="form-row">
          <input placeholder="Category" value={cat} onChange={e => setCat(e.target.value)} />
          <input placeholder="Amount" type="number" value={amt} onChange={e => setAmt(e.target.value)} />
          <button onClick={addBudget}>Set Budget</button>
        </div>
      </div>

      <div className="panel">
        <h3>Budgets Overview</h3>
        {Object.keys(budgets).length === 0 && <p>No budgets yet.</p>}
        <ul className="budget-list">
          {Object.entries(budgets).map(([category, limit]) => {
            const s = spent(category);
            const pct = Math.min(100, Math.round((s / limit) * 100 || 0));
            return (
              <li key={category} className="budget-item">
                <div className="budget-head">
                  <strong>{category}</strong>
                  <span>{profile.currency}{s.toLocaleString()} / {profile.currency}{limit.toLocaleString()}</span>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${pct}%`}}></div>
                </div>
                {s > limit && <div className="overspend">⚠ Overspent</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
