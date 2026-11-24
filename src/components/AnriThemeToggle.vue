<template>
    <button
        type="button"
        class="theme-toggle-button"
        :title="labelText"
        :aria-label="labelText"
        @click="$emit('toggle')"
    >
        <MoonIcon v-if="isDark" class="h-5 w-5" />
        <SunIcon v-else class="h-5 w-5" />
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { useAnriLabels } from "../composables/useAnriLabels";

const props = defineProps<{
    isDark: boolean;
    label?: string;
}>();

const injectedLabels = useAnriLabels();

const labelText = computed(
    () =>
        props.label ??
        injectedLabels?.value?.toggleTheme ??
        "Toggle theme",
);

defineEmits<{
    (e: "toggle"): void;
}>();
</script>

<style scoped>
@reference "tailwindcss";

.theme-toggle-button {
    @apply flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200;
    @apply text-(--primary) opacity-100;
    @apply hover:bg-(--primary)/5;
}
</style>
