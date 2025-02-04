import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Signup = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic
    console.log(formData);
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
