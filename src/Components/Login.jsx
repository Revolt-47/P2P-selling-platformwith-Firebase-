import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Divider,
  Snackbar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";
import { useUserAuth } from "../Context/UserAuthContext";

const Login = () => {
  const { login, googlesignin } = useUserAuth();
  const [error, setError] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitting(true); // Start submitting state
        await login(values.email, values.password);
        setSubmitting(false); // Turn off submitting state after successful login
        navigate("/home");
      } catch (error) {
        setSubmitting(false); // Turn off submitting state if there's an error
        setError(error.message);
      }
    },
  });

  const handleCloseError = () => {
    setError(null);
  };

  const handleGoogleLogin = async () => {
    try {
      setSubmitting(true); // Start submitting state
      await googlesignin();
      setSubmitting(false); // Turn off submitting state after successful Google login
      navigate("/home");
    } catch (error) {
      setSubmitting(false); // Turn off submitting state if there's an error
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 100 }}>
        <Typography variant="h4" gutterBottom>
          High Store - Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            margin="normal"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            margin="normal"
            error={
              formik.touched.password && Boolean(formik.errors.password)
            }
            helperText={
              formik.touched.password && formik.errors.password
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            style={{ marginBottom: 10 }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
        <Divider />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} />
          ) : (
            "Login with Google"
          )}
        </Button>
        <Typography variant="body1" style={{ marginTop: 10 }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
        <Snackbar
          open={error !== null}
          autoHideDuration={6000}
          onClose={handleCloseError}
          message={error}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseError}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Paper>
    </Container>
  );
};

export default Login;
