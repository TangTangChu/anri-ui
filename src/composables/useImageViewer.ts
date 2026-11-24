import { inject, ref } from "vue";
import type { InjectionKey, Ref } from "vue";

export interface ImageViewerState {
    isOpen: Ref<boolean>;
    currentIndex: Ref<number>;
    images: Ref<string[]>;
    openViewer: (index: number, currentImages: string[]) => void;
    closeViewer: () => void;
    nextImage: () => void;
    prevImage: () => void;
}

export const imageViewerKey: InjectionKey<ImageViewerState> = Symbol(
    "anri:image-viewer",
);

export const createImageViewer = (): ImageViewerState => {
    const isOpen = ref(false);
    const currentIndex = ref(0);
    const images = ref<string[]>([]);

    const openViewer = (index: number, currentImages: string[]) => {
        images.value = currentImages;
        currentIndex.value = index;
        isOpen.value = true;
    };

    const closeViewer = () => {
        isOpen.value = false;
    };

    const nextImage = () => {
        if (currentIndex.value < images.value.length - 1) {
            currentIndex.value += 1;
        }
    };

    const prevImage = () => {
        if (currentIndex.value > 0) {
            currentIndex.value -= 1;
        }
    };

    return {
        isOpen,
        currentIndex,
        images,
        openViewer,
        closeViewer,
        nextImage,
        prevImage,
    };
};

export const useImageViewer = (): ImageViewerState => {
    const viewer = inject(imageViewerKey);
    if (!viewer) {
        throw new Error(
            "[anri-ui] Image viewer is not installed. Call app.use(AnriUI) first.",
        );
    }
    return viewer;
};
