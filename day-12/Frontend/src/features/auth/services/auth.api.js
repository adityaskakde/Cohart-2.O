import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({ email, password, username }) {
  try {
    const response = await api.post("/api/auth/register", {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function login({ email, password, username }) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (error) {
    console.error("GetMe error:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
