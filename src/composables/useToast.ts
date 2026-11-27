import { inject, ref } from "vue";
import type { InjectionKey, Ref } from "vue";
import type { AnriToastItem, AnriToastType } from "../types";

export interface AnriToastState {
    toasts: Ref<readonly AnriToastItem[]>;
    /** duration 传 0 时消息常驻，需手动关闭。 */
    showToast: (
        type: AnriToastType,
        message: string,
        duration?: number,
    ) => void;
    dismissToast: (id: number) => void;
}

export const toastKey: InjectionKey<AnriToastState> = Symbol("anri:toast");

let nextToastId = 0;

/**
 * Creates the app-level toast state.
 * Shared singleton per Vue app (per SSR request).
 */
export const createToastState = (): AnriToastState => {
    const toasts = ref<AnriToastItem[]>([]);
    const timers = new Map<number, ReturnType<typeof setTimeout>>();

    const dismissToast = (id: number): void => {
        const timer = timers.get(id);
        if (timer !== undefined) {
            clearTimeout(timer);
            timers.delete(id);
        }
        toasts.value = toasts.value.filter((toast) => toast.id !== id);
    };

    const showToast = (
        type: AnriToastType,
        message: string,
        duration = 3000,
    ): void => {
        const id = ++nextToastId;
        toasts.value = [...toasts.value, { id, type, message }];
        if (duration > 0) {
            timers.set(id, setTimeout(() => dismissToast(id), duration));
        }
    };

    return { toasts, showToast, dismissToast };
};

export const useToast = (): AnriToastState => {
    const toast = inject(toastKey);
    if (!toast) {
        throw new Error(
            "[anri-ui] Toast is not installed. Call app.use(AnriUI) first.",
        );
    }
    return toast;
};
