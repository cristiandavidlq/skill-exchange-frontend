import api from "@/lib/api";

export const authService = {
  /**
   * @param {string} email
   * @param {string} password
   */
  login: async (email, password) => {
    const response = await api.post("/token", { email, password });
    return response.data;
  },

  /**
   *todo Refresca el token de acceso
   * @param {string} refresh_token
   */
  refreshToken: async (refresh_token) => {
    const response = await api.post("/token/refresh", {
      refresh: refresh_token,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};
