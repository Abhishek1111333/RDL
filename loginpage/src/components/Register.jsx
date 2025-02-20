import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [place, setPlace] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !place) {
      toast.error("Please fill in all fields.", { position: "top-center" });
      return;
    }
    
    const registrationData = { email, password, place };
    localStorage.setItem("registrationData", JSON.stringify(registrationData));
    toast.success(`Registration successful!\nEmail: ${email}\nPlace: ${place}`, {
      position: "top-center",
      autoClose: 1500,
      onClose: () => navigate("/login"),
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f4f4f4">
      <Paper elevation={5} sx={{ padding: 4, width: 350, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
          Register
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
          <TextField
            fullWidth
            label="Place"
            variant="outlined"
            margin="normal"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2 }}>
            Register
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
