import axios from "axios";

export const api = axios.create({
  baseURL: "https://apiskills.danidev.co/api", //todo url de la API
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {    
    const token = localStorage.getItem("access_token");

    console.log("¿Qué token encontró localStorage?:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn(
        "⚠️ No hay ningún token en localStorage bajo 'access_token'",
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


export const cargarDatos = async (endpoint = "/skills/", params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("Error en la petición API:", error);
    throw error;
  }
};

export default api;
