import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FinanceContext = createContext();

const sampleTransactions = [
  { id: 1, type: "Income", amount: 50000, category: "Salary", date: "2025-09-01", description: "Monthly salary" },
  { id: 2, type: "Expense", amount: 4500, category: "Groceries", date: "2025-09-05", description: "Walmart" },
  { id: 3, type: "Expense", amount: 1200, category: "Transport", date: "2025-09-07", description: "Fuel" },
];

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || sampleTransactions;
  });

  const [budgets, setBudgets] = useState(() => {
    return JSON.parse(localStorage.getItem("budgets")) || { Groceries: 10000, Transport: 3000 };
  });

  const [profile, setProfile] = useState(() => {
    return JSON.parse(localStorage.getItem("profile")) || { name: "Harsh", email: "you@example.com", currency: "₹" };
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const addTransaction = (tx) => {
    setTransactions((prev) => {
      const next = [...prev, tx];
      // check overspend and toast if needed
      if (tx.type === "Expense" && budgets[tx.category]) {
        const spent = next.filter(t => t.type === "Expense" && t.category === tx.category).reduce((a,b) => a + b.amount, 0);
        if (spent > budgets[tx.category]) {
          toast.warn(`Budget exceeded for ${tx.category}`);
        }
      }
      return next;
    });
    toast.success("Transaction added");
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.info("Transaction deleted");
  };

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    toast.success("Profile updated");
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        budgets,
        setBudgets,
        profile,
        updateProfile,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
