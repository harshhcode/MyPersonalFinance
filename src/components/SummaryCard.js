import React from "react";

export default function SummaryCard({ title, value, currency = "₹" }) {
  return (
    <div className="summary-card">
      <div className="summary-title">{title}</div>
      <div className="summary-value">{currency}{value.toLocaleString()}</div>
    </div>
  );
}
