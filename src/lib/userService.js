import api from "@/lib/api";

export const userService = {
  
  getUsers: async () => {
    const { data } = await api.get("/users/");
    const listaRaw = Array.isArray(data) ? data : data?.results || [];
    return listaRaw.map((u) => {
      const nombreCompleto =
        u.nombre ||
        u.username ||
        `${u.first_name || ""} ${u.last_name || ""}`.trim() ||
        "Usuario";

      
      const partes = nombreCompleto.split(" ");
      const iniciales =
        partes.length >= 2 && partes[0] && partes[1]
          ? `${partes[0][0]}${partes[1][0]}`.toUpperCase()
          : nombreCompleto[0]
            ? nombreCompleto[0].toUpperCase()
            : "U";

      
      const fechaOriginal = u.fecha || u.date_joined || u.created_at;
      let fechaFormateada = "Sin fecha";
      if (fechaOriginal) {
        try {
          const date = new Date(fechaOriginal);
          if (!isNaN(date.getTime())) {
            fechaFormateada = date.toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
          }
        } catch {}
      }

      return {
        id: u.id || u.email,
        nombre: nombreCompleto,
        iniciales,
        email: u.email || "sin-email@ufps.edu.co",
        fechaIngreso: fechaFormateada,
      };
    });
  },
};
