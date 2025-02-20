import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password.", {
        position: "top-center",
      });
      return;
    }
    
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const { email: regEmail, password: regPassword } = JSON.parse(storedData);
      if (email === regEmail && password === regPassword) {
        toast.success(`Verified! Login successful for ${email}`, {
          position: "top-center",
          autoClose: 1500,
          onClose: () => {
            onLogin({ email, password });
            navigate("/welcome");
          },
        });
      } else {
        toast.error("Invalid email or password. Please register if you haven't.", {
          position: "top-center",
        });
      }
    } else {
      toast.error("No registration data found. Please register first.", {
        position: "top-center",
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f4f4f4">
      <Paper elevation={5} sx={{ padding: 4, width: 350, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2 }}>
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ textDecoration: "none", color: "#1976d2" }}>
            Register here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
