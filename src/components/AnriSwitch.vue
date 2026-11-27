<template>
    <button
        type="button"
        role="switch"
        :aria-checked="modelValue"
        :disabled="props.disabled"
        class="inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        :class="[
            sizeClasses[props.size],
            modelValue
                ? 'bg-primary hover:bg-primary/90'
                : 'bg-on-background/15 hover:bg-on-background/25',
            props.disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer',
        ]"
        @click="toggle"
    >
        <span
            class="rounded-full bg-surface transition-all duration-200 ease-out"
            :class="[knobSizeClasses[props.size], modelValue ? knobOnClasses[props.size] : '']"
        />
    </button>
</template>

<script setup lang="ts">
type AnriSwitchSize = "sm" | "md" | "lg";

const props = withDefaults(
    defineProps<{
        disabled?: boolean;
        size?: AnriSwitchSize;
    }>(),
    {
        disabled: false,
        size: "md",
    },
);

const emit = defineEmits<{
    (e: "change", value: boolean): void;
}>();

const modelValue = defineModel<boolean>({ default: false });

const sizeClasses: Record<AnriSwitchSize, string> = {
    sm: "h-5 w-9",
    md: "h-6 w-11",
    lg: "h-7 w-12",
};

const knobSizeClasses: Record<AnriSwitchSize, string> = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
};

const knobOnClasses: Record<AnriSwitchSize, string> = {
    sm: "translate-x-4",
    md: "translate-x-5",
    lg: "translate-x-5",
};

const toggle = () => {
    modelValue.value = !modelValue.value;
    emit("change", modelValue.value);
};
</script>
