import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44358", // Replace with the actual URL of your API
});

export default api;
