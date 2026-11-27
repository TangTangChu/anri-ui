import type { App } from "vue";
import { createImageViewer, imageViewerKey } from "./composables/useImageViewer";
import { createToastState, toastKey } from "./composables/useToast";

/**
 * Installs the app-level state used by AnriLightbox / useImageViewer and
 * AnriToast / useToast. Both are shared singletons per Vue app (per SSR request).
 */
export const AnriUI = {
    install(app: App): void {
        app.provide(imageViewerKey, createImageViewer());
        app.provide(toastKey, createToastState());
    },
};
