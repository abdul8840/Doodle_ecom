import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormControlLabel, Checkbox, Container, Typography } from '@mui/material';

const AddressForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      address1: '',
      address2: '',
      email: '',
      mobile: '',
      status: 'Active',
      defaultaddress: false,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Required'),
      lastname: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      pincode: Yup.string().required('Required'),
      address1: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      mobile: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values); // Call the onSubmit prop
      resetForm(); // Reset the form after submission
    },
  });

  return (
    <Container maxWidth="sm" className="mt-10">
      <Typography variant="h4" className="text-center mb-6">Add Address</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="firstname"
          name="firstname"
          label="First Name"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
          className="mb-4"
        />
        <TextField
          fullWidth
          id="lastname"
          name="lastname"
          label="Last Name"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
          className="mb-4"
        />
        <TextField
          fullWidth
          id="country"
          name="country"
          label="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
          className="mb-4"
        />
        <TextField
          fullWidth
          id="state"
          name="state"
          label="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
          className="mb-4"
        />
        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          className="mb-4"
        />
        <TextField
          fullWidth
          id="pincode"
          name="pincode"
          label="Pincode"
          value={formik.values.pincode}
          onChange={formik.handleChange}
          error={formik.touched.pincode && Boolean(formik.errors.pincode)}
          helperText={formik.touched.pincode && formik.errors.pincode}
          className="mb-4"
        />
        <TextField
          fullWidth
          id="address1"
          name="address1"
          label="Address Line 1"
          value={formik.values.address1}
          onChange={formik.handleChange}
          error={formik.touched.address1 && Boolean(formik.errors.address1)}
          helperText={formik.touched.address1 && formik.errors.address1}
          className="mb-4"
        />
        <TextField
          fullWidth
          id="address2"
          name="address2"
          label="Address Line 2"
          value={formik.values.address2}
          onChange={formik.handleChange}
          error={formik.touched.address2 && Boolean(formik.errors.address2)}
          helperText={formik.touched.address2 && formik.errors.address2}
          className="mb-4"
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          className="mb-4"
        />
        <TextField
          fullWidth
          id="mobile"
          name="mobile"
          label="Mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
          className="mb-4"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.defaultaddress}
              onChange={formik.handleChange}
              name="defaultaddress"
              color="primary"
            />
          }
          label="Set as default address"
          className="mb-4"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddressForm;