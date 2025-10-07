import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Router>
      <Header />
      <nav className="main-nav">
        <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink>
        <NavLink to="/budgets" className={({isActive}) => isActive ? "active" : ""}>Budgets</NavLink>
        <NavLink to="/profile" className={({isActive}) => isActive ? "active" : ""}>Profile</NavLink>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}
