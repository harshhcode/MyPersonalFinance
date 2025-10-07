import React from "react";

export default function Footer() {
  return (
    <footer className="app-footer">
      <small>© {new Date().getFullYear()} FinanceTrackerApp</small>
    </footer>
  );
}
