import React, { useContext, useMemo } from "react";
import { FinanceContext } from "../context/FinanceContext";
import SummaryCard from "../components/SummaryCard";
import AddTransactionForm from "../components/AddTransactionForm";
import ExpenseTable from "../components/ExpenseTable";

export default function Dashboard() {
  const { transactions, profile } = useContext(FinanceContext);

  const summary = useMemo(() => {
    const income = transactions.filter(t => t.type === "Income").reduce((a,b) => a + b.amount, 0);
    const expenses = transactions.filter(t => t.type === "Expense").reduce((a,b) => a + b.amount, 0);
    return { income, expenses, remaining: income - expenses, savings: Math.max(0, income - expenses) };
  }, [transactions]);

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="summary-row">
        <SummaryCard title="Total Income" value={summary.income} currency={profile.currency} />
        <SummaryCard title="Total Expenses" value={summary.expenses} currency={profile.currency} />
        <SummaryCard title="Remaining Budget" value={summary.remaining} currency={profile.currency} />
        <SummaryCard title="Savings" value={summary.savings} currency={profile.currency} />
      </div>

      <section className="panel">
        <h3>Add Transaction</h3>
        <AddTransactionForm />
      </section>

      <section className="panel">
        <h3>All Transactions</h3>
        <ExpenseTable />
      </section>
    </div>
  );
}
