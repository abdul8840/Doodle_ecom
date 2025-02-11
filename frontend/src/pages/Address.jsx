import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createAddress, resetState } from "../features/address/addressSlice";
import AddressForm from "../components/Address/AddressForm";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newAddress = useSelector((state) => state.address);
  const { isSuccess, isError, createdAddress } = newAddress;

  useEffect(() => {
    if (isSuccess && createdAddress) {
      toast.success("Address Added Successfully!");
      navigate("/my-profile"); // Redirect to the correct page
      dispatch(resetState()); // Reset state after redirection
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, createdAddress, dispatch, navigate]);

  const handleSubmit = (addressData) => {
    dispatch(createAddress(addressData));
  };

  return (
    <div>
      <AddressForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Address;