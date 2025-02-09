// userService.js
import { base_url, config } from "../../utils/config";
import axios from "axios";

const signup = async (userData) => {
  const response = await fetch(`${base_url}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { message: data?.message || "Signup failed", response: data };
  }

  return data;
};

const signin = async (userData) => {
  const response = await fetch(`${base_url}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { message: data?.message || "Login failed", response: data };
  }

  if (data) {
    localStorage.setItem("customer", JSON.stringify(data));
  }

  return data;
};

const updateUser = async (data) => {
  const response = await axios.put(
    `${base_url}/auth/edit-user`,
    data.data,
    data.config2,
    config
  );

  if (response.data) {
    return response.data;
  }
};

const getUserWislist = async () => {
  const response = await axios.get(`${base_url}/auth/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}/auth/cart`, cartData, config);
  if (response.data) {
    return response.data;
  }
};

const getCart = async (data) => {
  const response = await axios.get(`${base_url}/auth/get-cart`, data);
  if (response.data) {
    return response.data;
  }
};

const removeProductFromCart = async (data) => {
  const response = await axios.delete(
    `${base_url}/auth/delete-product-cart/${data.id}`,

    data.config2
  );
  if (response.data) {
    return response.data;
  }
};

const updateProductFromCart = async (cartDetail) => {
  const response = await axios.delete(
    `${base_url}/auth/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const emptyCart = async (data) => {
  const response = await axios.delete(`${base_url}/auth/empty-cart`, data);

  if (response.data) {
    return response.data;
  }
};


export const authService = {
  signup,
  signin,
  updateUser,
  getUserWislist,
  addToCart,
  getCart,
  removeProductFromCart,
  updateProductFromCart,
  emptyCart,
}
