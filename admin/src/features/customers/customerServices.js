import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config, getConfig } from "../../utils/axiosconfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}auth/all-users`, config);

  return response.data;
};

const deleteUsers = async (userId) => {
  const response = await axios.delete(`${base_url}auth/delete-user/${userId}`, config);
  return response.data;
};

const makeAdmin = async (userId) => {
  const response = await axios.put(`${base_url}auth/make-admin/${userId}`, config);
  return response.data;
};

const customerService = {
  getUsers,
  deleteUsers,
  makeAdmin,
};

export default customerService;
