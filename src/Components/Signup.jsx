import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Button, Stack, Paper, Typography, TextField, Alert } from "@mui/material";
import { useUserAuth } from "../Context/UserAuthContext";

const Signup = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, margin: "100px auto", maxWidth: 400 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ marginBottom: 2 }}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
      <Typography variant="body1" style={{ marginTop: 10 }}>
        Already have an account? <Link to="/">Login</Link>
      </Typography>
    </Paper>
  );
};

export default Signup;
