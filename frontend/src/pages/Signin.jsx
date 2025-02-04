import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../features/user/userSlice";
import { toast } from "react-toastify"; // Import toast

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isSuccess && authState.user !== null) {
      toast.success("Login successful!"); // Show success toast
      navigate("/"); // Redirect to home page
    }
    if (authState.isError) {
      toast.error(authState.message || "Invalid email or password"); // Show error toast
    }
  }, [authState, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signinUser(formData)).unwrap(); // Unwrap the promise to handle success/error properly
    } catch (error) {
      toast.error(error?.message || "Login failed"); // Show error toast
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Typography variant="h4" className="text-center mb-4">
        Sign In
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          className="mt-4"
        >
          Sign In
        </Button>
      </form>
      <h2 className="mt-2">
        Don't have an account? <Link to="/sign-up" className="text-blue-500">Sign Up</Link>
      </h2>
    </Container>
  );
};

export default Signin;
