import { base_url, config } from "../../utils/config";
import axios from "axios";

const createAddress = async (addressData) => {
  const response = await axios.post(`${base_url}/auth/create-address`, addressData, config);
  if (response.data) {
    return response.data;
  }
};

const getUserAddress = async () => {
  const response = await axios.get(`${base_url}/auth/user-address/userid`, config);

  if (response.data) {
    return response.data;
  }
};

const updateAddress = async (data) => {
  console.log("Updating address with data:", data);
  try {
    const response = await axios.patch(
      `${base_url}/auth/update-address/${data.id}`,
      {
        firstname: data.firstname,
        lastname: data.lastname,
        country: data.country,
        state: data.state,
        city: data.city,
        pincode: data.pincode,
        address1: data.address1,
        address2: data.address2,
        email: data.email,
        mobile: data.mobile,
        status: data.status,
        defaultaddress: data.defaultaddress,
      },
      config
    );
    console.log("Update address response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
};

export const addressService = {
  createAddress,
  getUserAddress,
  updateAddress,
}