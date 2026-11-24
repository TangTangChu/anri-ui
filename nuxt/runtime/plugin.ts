import { defineNuxtPlugin } from "#app";
import { AnriUI } from "../../src/install";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(AnriUI);
});
