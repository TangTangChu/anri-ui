import type { App } from "vue";
import { createImageViewer, imageViewerKey } from "./composables/useImageViewer";

/**
 * Installs the app-level state used by AnriLightbox / useImageViewer.
 * The image viewer is a shared singleton per Vue app (per SSR request).
 */
export const AnriUI = {
    install(app: App): void {
        app.provide(imageViewerKey, createImageViewer());
    },
};
