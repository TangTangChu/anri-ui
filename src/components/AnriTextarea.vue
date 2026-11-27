<template>
    <textarea
        :rows="4"
        v-bind="$attrs"
        :value="modelValue"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        class="w-full resize-y rounded-xl border-2 font-bold text-on-background outline-none transition-all duration-200 ease-out placeholder:text-on-background/30"
        :class="[
            sizeClasses[props.size],
            variantClasses[props.variant],
            props.disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-text',
        ]"
        @input="onInput"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @change="onChange"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
    />
</template>

<script setup lang="ts">
type AnriTextareaVariant = "default" | "soft" | "filled" | "ghost";
type AnriTextareaSize = "sm" | "md" | "lg";

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        variant?: AnriTextareaVariant;
        size?: AnriTextareaSize;
        placeholder?: string;
        disabled?: boolean;
    }>(),
    {
        modelValue: "",
        variant: "default",
        size: "md",
        placeholder: "",
        disabled: false,
    },
);

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
    (e: "change", value: string): void;
    (e: "focus", event: FocusEvent): void;
    (e: "blur", event: FocusEvent): void;
}>();

let isComposing = false;

const sizeClasses: Record<AnriTextareaSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
};

const variantClasses: Record<AnriTextareaVariant, string> = {
    default:
        "border-transparent bg-on-background/5 text-on-background hover:bg-on-background/10 focus:bg-on-background/10 focus:outline-none focus:ring-2 focus:ring-on-background/10",
    soft: "border-transparent bg-surface/70 hover:bg-on-background/10 focus:bg-on-background/10 focus:ring-2 focus:ring-on-background/10",
    filled:
        "border-transparent bg-surface-container hover:bg-on-background/10 focus:bg-on-background/10 focus:ring-2 focus:ring-on-background/10",
    ghost: "border-transparent bg-transparent hover:bg-on-background/5 focus:bg-on-background/5 focus:ring-2 focus:ring-on-background/5",
};

const onCompositionStart = () => {
    isComposing = true;
};

const onCompositionEnd = (event: CompositionEvent) => {
    isComposing = false;
    const target = event.target as HTMLTextAreaElement;
    emit("update:modelValue", target.value);
};

const onInput = (event: Event) => {
    if (isComposing) return;
    const target = event.target as HTMLTextAreaElement;
    emit("update:modelValue", target.value);
};

const onChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    emit("change", target.value);
};
</script>
