import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    resolve: {
        alias: {
            buffer: "buffer/",
        },
    },
    plugins: [svgr(), react()],
});
