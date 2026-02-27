import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // List of specific hostnames allowed
    allowedHosts: [
      "engelki.taild523d0.ts.net", // Allows the domain and all subdomains
    ],
    // Optional: set the host to 0.0.0.0 to listen on all network interfaces
    // this allows access from other devices on the network
    host: "0.0.0.0",
  },
});
