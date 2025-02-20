import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Store from "./Store";
import Employee from "./Employee";
import Customer from "./Customer";
import Login from "./login";  // Import Login component


function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/store" element={<Store />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/customer" element={<Customer />} />

        {/* Default to Store if route doesn't match */}
        <Route path="/" element={<Login />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
