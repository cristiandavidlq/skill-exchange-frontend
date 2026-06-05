import api from "@/lib/api";


const formatearFecha = (fechaOriginal) => {
  if (!fechaOriginal) return "21 de mayo de 2026";
  try {
    const date = new Date(fechaOriginal);
    return isNaN(date.getTime())
      ? fechaOriginal
      : date.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  } catch {
    return "21 de mayo de 2026";
  }
};

export const skillService = {
  

  getSkills: async (criterios = {}) => {
    const { page, ordering, category, search } = criterios;

    
    const params = {
      page,
      ordering,
      ...(category && { category }),
      ...(search && { search }),
    };

    const response = await api.get("/skills/", { params });
    return response.data; 
  },

  

  getSkillById: async (id) => {
    const { data } = await api.get(`/skills/${id}/`);

    
    return {
      id: data.id,
      name: data.name || data.nombre || "Sin nombre",
      category: data.category_name || data.category || "Technical",
      level: data.level || data.nivel || "Beginner",
      description:
        data.description ||
        data.descripcion ||
        "No hay una descripción disponible.",
      createdAt: formatearFecha(data.created_at || data.fecha_creacion),
      updatedAt: formatearFecha(data.updated_at || data.fecha_actualizacion),
    };
  },
};
