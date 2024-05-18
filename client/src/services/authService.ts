import axios from "./axios";

export const loginRequest = async ({ email, password }: any) => {
  const data = { email, password };
  return await axios.post(`/login`, data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const signupRequest = async ({ email, password }: any) => {
  const data = { email, password };
  return await axios.post("/signup", data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const refreshRequest = async () => {
  return await axios.get("/refresh", {
    withCredentials: true,
  });
};

export const logoutRequest = async () => {
  return await axios.get("/logout", {
    withCredentials: true,
  });
};
