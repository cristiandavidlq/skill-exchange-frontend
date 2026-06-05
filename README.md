# skill-exchange-frontend

Interfaz web para **Skills Exchange**, una plataforma donde los usuarios pueden explorar habilidades, gestionar metas de aprendizaje y conectar con otros perfiles. Desarrollada con **Next.js 14** y consumiendo una API REST con autenticación JWT.

**API:** `https://apiskills.danidev.co/api/` · **Swagger:** `https://apiskills.danidev.co/api/docs/`

---

## Requisitos previos

- Node.js ≥ 18
- npm

---

## Instalación

```bash
git clone https://github.com/JDuvanC10/skill-exchange-frontend.git
cd skill-exchange-frontend
npm install
```

Crea el archivo de entorno:

```bash
echo "NEXT_PUBLIC_API_BASE_URL=https://apiskills.danidev.co/api" > .env.local
```

Luego levanta el servidor de desarrollo:

```bash
npm run dev
# http://localhost:3000
```

---

## Vistas disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page de la plataforma |
| `/login` | Autenticación con JWT |
| `/dashboard` | Panel con datos del usuario |
| `/dashboard/skills` | Catálogo con búsqueda, filtros, orden y paginación |
| `/dashboard/skills/[id]` | Vista detallada de una skill |
| `/dashboard/users` | Directorio paginado de usuarios |
| `/dashboard/goals` | Metas con barra de progreso y acción "Alcanzar" |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── (auth)/login/page.jsx           # Login con JWT
│   ├── (dashboard)/dashboard/
│   │   ├── layout.jsx                  # Navbar + protección de ruta
│   │   ├── page.jsx                    # Bienvenida del usuario
│   │   ├── skills/
│   │   │   ├── page.jsx                # Listado con filtros
│   │   │   └── [id]/page.jsx           # Detalle de skill
│   │   ├── users/page.jsx
│   │   └── goals/page.jsx
│   ├── page.jsx                        # Landing (/)
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Navbar.jsx
│   │   ├── HamburgerMenu.jsx
│   │   ├── Pagination.jsx
│   │   ├── LoadingState.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── EmptyState.jsx
│   └── skills/
│       ├── SkillCard.jsx
│       ├── CategoryFilter.jsx
│       └── OrderSelector.jsx
└── lib/
    └── api.js                          # Axios + interceptor JWT
```

---

## Decisiones técnicas

**`lib/api.js` como único punto de entrada a la API**
Toda petición al backend pasa por un módulo centralizado con Axios. El interceptor agrega automáticamente el token JWT desde `localStorage`, evitando repetir esa lógica en cada componente.

**`<Pagination />` como componente genérico**
Recibe `count`, `page`, `pageSize` y `onPageChange`. Se reutiliza sin modificaciones en Skills, Usuarios y Metas.

**Protección de rutas en el layout del dashboard**
`dashboard/layout.jsx` verifica el token antes de renderizar cualquier página protegida y redirige a `/login` si no existe. La lógica de autenticación vive en un único lugar.

**Filtros como query params en la URL**
Los parámetros `category`, `search` y `ordering` se mapean directamente a la query string de la API. Las URLs con filtros activos son compartibles y se pueden recargar sin perder el estado.

**Componentes de estado desacoplados**
`LoadingState`, `ErrorMessage` y `EmptyState` son independientes y se reutilizan en todas las páginas, garantizando consistencia visual sin duplicar código.

---

## Parámetros de filtrado

| Parámetro | Opciones disponibles |
|-----------|----------------------|
| `category` | `technical` · `creative` · `communication` · `leadership` · `business` · `personal_development` · `other` |
| `level` | `beginner` · `intermediate` · `advanced` · `expert` |
| `ordering` | `name` · `-name` · `created_at` · `-created_at` |
| `search` | texto libre |
| `page` | número entero |

Ejemplo: `?category=technical&ordering=-created_at&page=2`

---

## Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) — cliente HTTP con interceptores

---

## Evidencia

- `capturas/postman/` — Endpoints explorados en Bruno / Postman
- `capturas/app/` — Capturas de la app en desktop y mobile

---

**Autor:** Cristian López · [@cristiandavidlq](https://github.com/cristiandavidlq)  
Fork de [andresstbn/skill-exchange-frontend](https://github.com/andresstbn/skill-exchange-frontend)
