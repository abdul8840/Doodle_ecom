import React, { useEffect } from "react";
import { TextField, Button, CircularProgress, Box, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state.auth);
  const { user, isError, isSuccess, isLoading, message } = authState;

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [user, isError, isSuccess, isLoading]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Paper elevation={3} className="p-8 w-96">
        <Typography variant="h5" className="text-center text-gray-700 mb-2">
          Sign In
        </Typography>
        <Typography variant="body2" className="text-center text-gray-500 mb-6">
          Login to your account to continue.
        </Typography>

        {message?.message === "Rejected" && (
          <Typography className="text-red-500 text-center mb-4">You are not an Admin</Typography>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {/* Submit Button */}
          <Box className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{ backgroundColor: "#ffd333", color: "#000", fontWeight: "bold" }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default Signin;
