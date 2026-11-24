import { createApp } from "vue";
import { AnriUI } from "anri-ui";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

createApp(App).use(router).use(AnriUI).mount("#app");
