import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Paper,
  Typography,
  TextField,
  Snackbar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUserAuth } from "../Context/UserAuthContext";
import { useFormik } from "formik";
import * as yup from "yup";

const Signup = () => {
  const { signUp } = useUserAuth();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true); // Start loading state
        await signUp(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        );
        setLoading(false); // Turn off loading state after successful signup
        navigate("/");
      } catch (err) {
        setLoading(false); // Turn off loading state if there's an error
        setError(err.message);
      }
    },
  });

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: 20, margin: "100px auto", maxWidth: 400 }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: "center" }}
      >
        Sign Up to High Store
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ marginBottom: 2 }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <TextField
              label="First Name"
              fullWidth
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName &&
                Boolean(formik.errors.firstName)
              }
              helperText={
                formik.touched.firstName &&
                formik.errors.firstName
              }
            />
            <TextField
              label="Last Name"
              fullWidth
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.lastName &&
                Boolean(formik.errors.lastName)
              }
              helperText={
                formik.touched.lastName &&
                formik.errors.lastName
              }
            />
          </div>
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            error={
              formik.touched.password && Boolean(formik.errors.password)
            }
            helperText={
              formik.touched.password && formik.errors.password
            }
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword
            }
          />
        </Stack>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            "Sign Up"
          )}{" "}
          {/* Display the loader if loading */}
        </Button>
      </form>
      <Typography
        variant="body1"
        style={{ marginTop: 10 }}
      >
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </Typography>
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={error}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
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
  );
};

export default Signup;
