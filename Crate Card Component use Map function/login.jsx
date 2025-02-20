import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock authentication (you can replace this with real logic)
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/store");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box sx={{ width: "300px", mx: "auto", mt: 5, padding: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom align="center">Login</Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button fullWidth variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
}

export default Login;
