import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // à adapter si ton backend est ailleurs
});

export default api;
