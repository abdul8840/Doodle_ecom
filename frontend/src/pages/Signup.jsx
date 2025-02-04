import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/user/userSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await dispatch(signupUser(formData)); // Unwrap to get the payload
      
      toast.success("User Created Successfully"); // Show success toast
      setFormData({ firstname: "", lastname: "", email: "", mobile: "", password: "" }); // Reset form
      navigate("/sign-in"); // Redirect after success
    } catch (error) {
      toast.error(error?.message || "Signup failed"); // Show error message
    }
  };
  

  return (
    <Container maxWidth="sm" className="mt-10">
      <Typography variant="h4" className="text-center mb-4">Sign Up</Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
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
          label="Mobile"
          variant="outlined"
          fullWidth
          name="mobile"
          value={formData.mobile}
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
          Sign Up
        </Button>
      </form>
      <h2 className="">Have an account? <Link to='/sign-in' className="text-blue-500">Signin</Link> </h2>
    </Container>
  );
};

export default Signup;
