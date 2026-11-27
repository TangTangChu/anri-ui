<template>
    <Teleport to="body">
        <div
            class="pointer-events-none fixed inset-x-0 bottom-0 z-[110] flex flex-col items-center gap-2 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        >
            <TransitionGroup
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="translate-y-2 scale-95 opacity-0"
                enter-to-class="translate-y-0 scale-100 opacity-100"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
                move-class="transition-all duration-200 ease-out"
            >
                <div
                    v-for="toast in toasts"
                    :key="toast.id"
                    class="pointer-events-auto flex max-w-[min(100%,24rem)] items-center gap-2.5 rounded-xl bg-surface/95 py-3 pl-4 pr-2 text-sm text-on-background shadow-sm backdrop-blur-md"
                >
                    <component
                        :is="icons[toast.type]"
                        class="h-5 w-5 shrink-0"
                        :class="iconColorClasses[toast.type]"
                        aria-hidden="true"
                    />
                    <span class="min-w-0 break-words">{{ toast.message }}</span>
                    <button
                        type="button"
                        class="-mr-1 ml-1 shrink-0 cursor-pointer rounded-lg p-1.5 text-on-background/40 transition-all duration-200 ease-out hover:bg-on-background/5 hover:text-on-background/70"
                        :aria-label="closeText"
                        @click="dismissToast(toast.id)"
                    >
                        <XMarkIcon class="h-4 w-4" />
                    </button>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Component } from "vue";
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from "@heroicons/vue/24/outline";
import { useAnriLabels } from "../composables/useAnriLabels";
import { useToast } from "../composables/useToast";
import type { AnriToastType } from "../types";

const { toasts, dismissToast } = useToast();

const injectedLabels = useAnriLabels();

const closeText = computed(() => injectedLabels?.value?.close ?? "Close");

const icons: Record<AnriToastType, Component> = {
    info: InformationCircleIcon,
    succ: CheckCircleIcon,
    warn: ExclamationTriangleIcon,
    error: XCircleIcon,
    plain: InformationCircleIcon,
};

/* 消息色沿用 AnriAlert 的语义配色，可通过同名变量覆盖。 */
const iconColorClasses: Record<AnriToastType, string> = {
    info: "text-secondary",
    succ: "toast-icon-succ",
    warn: "toast-icon-warn",
    error: "toast-icon-error",
    plain: "text-on-background/60",
};
</script>

<style scoped>
.toast-icon-succ {
    color: var(--anri-toast-succ, #4cd48a);
}

.toast-icon-warn {
    color: var(--anri-toast-warn, oklch(70.5% 0.213 47.604));
}

.toast-icon-error {
    color: var(--anri-toast-error, #fe728a);
}

.dark .toast-icon-succ {
    color: var(--anri-toast-succ, #4cc785);
}

.dark .toast-icon-warn {
    color: var(--anri-toast-warn, oklch(75% 0.183 55.934));
}

.dark .toast-icon-error {
    color: var(--anri-toast-error, #ea647a);
}
</style>
