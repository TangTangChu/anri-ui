<template>
    <AnriSelect
        :model-value="modelValue"
        :options="localeOptions"
        width-class="w-32"
        align="right"
        @update:model-value="switchLocale"
    >
        <template #trigger="{ toggle, isOpen }">
            <button
                class="p-2 rounded-lg text-on-background/70 hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-center gap-1"
                :class="{ 'bg-primary/5 text-primary': isOpen }"
                :title="labelText"
                :aria-label="labelText"
                @click="toggle"
            >
                <LanguageIcon class="w-5 h-5" />
                <span v-if="showText" class="text-sm font-medium">{{
                    currentLocaleName
                }}</span>
            </button>
        </template>
    </AnriSelect>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { LanguageIcon } from "@heroicons/vue/24/outline";
import AnriSelect from "./AnriSelect.vue";
import { useAnriLabels } from "../composables/useAnriLabels";
import type { AnriLocaleOption } from "../types";

const props = withDefaults(
    defineProps<{
        locales: AnriLocaleOption[];
        modelValue: string;
        showText?: boolean;
        label?: string;
    }>(),
    {
        showText: false,
    },
);

const injectedLabels = useAnriLabels();

const labelText = computed(
    () =>
        props.label ??
        injectedLabels?.value?.switchLanguage ??
        "Switch language",
);

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const localeOptions = computed(() =>
    props.locales.map(({ code, name }) => ({
        value: code,
        label: name,
    })),
);

const currentLocaleName = computed(
    () => props.locales.find((item) => item.code === props.modelValue)?.name ?? "",
);

const switchLocale = (code: string | number): void => {
    emit("update:modelValue", String(code));
};
</script>
