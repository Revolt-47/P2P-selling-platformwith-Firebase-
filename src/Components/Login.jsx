import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useUserAuth } from "../Context/UserAuthContext";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace this with your Google OAuth client ID
const REDIRECT_URI = "http://localhost:3000/login"; // Replace this with your backend redirect URI

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const {login,googlesignin} = useUserAuth();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoggingIn(true);
      login(email,password)
      navigate("/home")
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoggingIn(false);
      alert(error)
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await googlesignin(); // Correct function name
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 100 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to My Login App
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoggingIn}
            style={{ marginBottom: 10 }}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Divider />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in with Google..." : "Login with Google"}
        </Button>
        <Typography variant="body1" style={{ marginTop: 10 }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
