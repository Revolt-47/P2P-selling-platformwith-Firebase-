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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";
import { useUserAuth } from "../Context/UserAuthContext";

const Login = () => {
  const { login, googlesignin } = useUserAuth();
  const [error,seterror] = useState(null);
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
        await login(values.email, values.password);
        navigate("/home");
      } catch (error) {
        seterror(error.message)
      }
    },
  });

  const handleCloseError = () => {
    seterror(null);
  };

  const handleGoogleLogin = async () => {
    try {
      await googlesignin();
      navigate("/home");
    } catch (error) {
      seterror(error.message)
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={formik.isSubmitting}
            style={{ marginBottom: 10 }}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Divider />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Logging in with Google..." : "Login with Google"}
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
