## Despliegue en producción

1. Genera la build del frontend:
	```bash
	npm run build
	```
	Esto creará una carpeta `dist/` con los archivos estáticos.

2. Puedes servir la carpeta `dist/` con cualquier servidor estático (por ejemplo, Nginx, Apache o el propio backend si lo adaptas).

3. Asegúrate de configurar las variables de entorno de producción en el backend (`.env`).

4. Si usas un dominio, actualiza la configuración de CORS en `backend/index.js` para permitir tu dominio en vez de `localhost`.

5. Para bases de datos en la nube, actualiza los datos de conexión en `.env`.

---
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
