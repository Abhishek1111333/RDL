import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";

function App() {
  const location = useLocation();
  
  // Persistent authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // On app load, check localStorage for auth state and user data.
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("userData");
    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Called by Login on successful login.
  const handleLogin = (loginData) => {
    setUser(loginData);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userData", JSON.stringify(loginData));
  };

  // Logout clears auth state.
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
  };

  // Render Navbar and Footer only on /welcome route if authenticated.
  const showNavFooter = location.pathname === "/welcome" && isAuthenticated;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ToastContainer />
      {showNavFooter && <Navbar onLogout={handleLogout} />}
      <Box flexGrow={1}>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/welcome" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/welcome" /> : <Register />}
          />
          <Route
            path="/welcome"
            element={isAuthenticated ? <Welcome email={user.email} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Box>
      {showNavFooter && <Footer />}
    </Box>
  );
}

export default App;
