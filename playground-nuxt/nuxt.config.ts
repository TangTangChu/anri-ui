import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: false },
    modules: ["anri-ui/nuxt"],
    css: ["~/assets/css/main.css"],
    vite: {
        plugins: [tailwindcss()],
    },
    app: {
        head: {
            title: "anri-ui Nuxt playground",
            htmlAttrs: { lang: "zh-CN" },
        },
    },
});
