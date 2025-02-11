import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Tabs,
  Tab,
} from "@mui/material";
import { getUserAddress, updateAAddress } from "../features/address/addressSlice";

const profileSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .required("Email is Required")
    .email("Email Should be valid"),
  mobile: yup
    .string()
    .matches(/^[0-9]+$/, "Mobile number must be digits")
    .required("Mobile No is Required"),
});

const addressSchema = yup.object({
  firstname: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  country: yup.string().required("Required"),
  state: yup.string().required("Required"),
  city: yup.string().required("Required"),
  pincode: yup.string().required("Required"),
  address1: yup.string().required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  mobile: yup
    .string()
    .matches(/^[0-9]+$/, "Mobile number must be digits")
    .required("Required"),
});

const Profile = () => {
  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth.user);
  const { addresses, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.address
  );

  const addressList = addresses?.data || [];

  const [edit, setEdit] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [editAddressId, setEditAddressId] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstname: userState?.firstname || "",
      lastname: userState?.lastname || "",
      email: userState?.email || "",
      mobile: userState?.mobile || "",
    },
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateProfile({ data: values, config2 }));
      setEdit(true);
    },
  });

  const addressFormik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      address1: "",
      address2: "",
      email: "",
      mobile: "",
      status: "Active",
      defaultaddress: false,
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      if (editAddressId) {
        dispatch(updateAAddress({ id: editAddressId, data: values, config2 }));
        setEditAddressId(null);
      }
    },
  });

  useEffect(() => {
    if (tabValue === 1) {
      dispatch(getUserAddress());
    }
  }, [tabValue, dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditProfile = () => {
    setEdit(false);
  };

  const handleCancelProfileEdit = () => {
    formik.resetForm();
    setEdit(true);
  };

  const handleEditAddress = (address) => {
    setEditAddressId(address._id);
    addressFormik.setValues(address);
  };

  const handleCancelAddressEdit = () => {
    addressFormik.resetForm();
    setEditAddressId(null);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
          <Tab label="My Profile" />
          <Tab label="My Address" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 3 }}>
              <Typography variant="h6">Update Profile</Typography>
              <FiEdit onClick={handleEditProfile} style={{ cursor: "pointer" }} />
            </Box>

            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <Box sx={{ my: 2 }}>
                {["firstname", "lastname", "email", "mobile"].map((field) => (
                  <TextField
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    variant="outlined"
                    fullWidth
                    name={field}
                    disabled={edit}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[field] && Boolean(formik.errors[field])}
                    helperText={formik.touched[field] && formik.errors[field]}
                    sx={{ mb: 2 }}
                  />
                ))}
              </Box>

              {!edit && (
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                  <Button type="button" variant="outlined" color="secondary" onClick={handleCancelProfileEdit}>
                    Cancel
                  </Button>
                </Box>
              )}
            </form>
          </Box>
        )}

        {tabValue === 1 && (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Saved Addresses</h2>
            {isLoading && <p>Loading addresses...</p>}
            {isError && <p className="text-red-500">{message || "Failed to load addresses."}</p>}
            {isSuccess && addressList.length > 0 ? (
              addressList.map((item) => (
                <div key={item._id} className="border p-4 mb-2 rounded-lg shadow-md">
                  {editAddressId === item._id ? (
                    <form onSubmit={addressFormik.handleSubmit}>
                      {["firstname", "lastname", "country", "state", "city", "pincode", "address1", "email", "mobile"].map((field) => (
                        <TextField
                          key={field}
                          label={field.charAt(0).toUpperCase() + field.slice(1)}
                          fullWidth
                          name={field}
                          value={addressFormik.values[field]}
                          onChange={addressFormik.handleChange}
                          sx={{ mb: 2 }}
                        />
                      ))}
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                          Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancelAddressEdit}>
                          Cancel
                        </Button>
                      </Box>
                    </form>
                  ) : (
                    <div>
                      <p>{item.firstname} {item.lastname}, {item.address1}, {item.city}, {item.state}, {item.country} - {item.pincode}</p>
                      <FiEdit onClick={() => handleEditAddress(item)} style={{ cursor: "pointer" }} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No addresses found.</p>
            )}
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
