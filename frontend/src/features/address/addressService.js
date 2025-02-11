import { base_url, config } from "../../utils/config";
import axios from "axios";

const createAddress = async (addressData) => {
  const response = await axios.post(`${base_url}/auth/create-address`, addressData, config);
  if (response.data) {
    return response.data;
  }
};

export const addressService = {
  createAddress,
}