import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signin logic
    console.log(formData);
  };

  return (
    <Container maxWidth="sm" className="mt-10">
      <Typography variant="h4" className="text-center mb-4">Sign In</Typography>
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
      <h2 className="">Don't have an account? <Link to='/sign-up' className="text-blue-500">Signin</Link> </h2>
    </Container>
  );
};

export default Signin;
