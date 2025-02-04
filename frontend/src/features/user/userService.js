// userService.js
import { base_url, config } from "../../utils/config";

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


export const authService = {
  signup,
  signin,
}
