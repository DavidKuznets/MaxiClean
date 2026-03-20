import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Дозволяє Vite приймати запити ззовні контейнера (з вашого комп'ютера)
    host: true,
    // Фіксуємо порт, щоб він збігався з тим, що ви прописали в docker-compose
    port: 5173,

    proxy: {
      // Перенаправляємо API запити на сервіс "backend" всередині Docker-мережі
      "/api": {
        target: "http://backend:8000",
        changeOrigin: true,
        secure: false,
      },
      // Медіа-файли (картинки), які роздає Django
      "/media": {
        target: "http://backend:8000",
        changeOrigin: true,
        secure: false,
      },
    },
    // Додаємо налаштування watch, щоб зміни в коді підтягувалися всередині Docker
    watch: {
      usePolling: true,
    },
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // forward API requests to Django backend to avoid CORS during development
//       "/api": {
//         target: "http://localhost:8000",
//         changeOrigin: true,
//         secure: false,
//       },
//       // media files served by Django
//       "/media": {
//         target: "http://localhost:8000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });
