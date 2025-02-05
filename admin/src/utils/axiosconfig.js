const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

export const getConfig = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return {
    headers: {
      Authorization: user?.token ? `Bearer ${user.token}` : "",
      Accept: "application/json",
    },
  };
};
