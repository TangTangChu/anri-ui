<template>
    <label
        class="group inline-flex select-none items-center gap-2 text-sm"
        :class="
            props.disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
        "
    >
        <input
            type="checkbox"
            class="peer sr-only"
            :checked="modelValue"
            :disabled="props.disabled"
            @change="onChange"
        />
        <span
            class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors duration-200 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20"
            :class="
                modelValue
                    ? 'bg-primary group-hover:bg-primary/90'
                    : 'bg-on-background/10 group-hover:bg-on-background/15'
            "
        >
            <CheckIcon
                v-if="modelValue"
                class="h-3.5 w-3.5 text-on-primary"
                aria-hidden="true"
            />
        </span>
        <span class="min-w-0 text-on-background"><slot /></span>
    </label>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/solid";

const props = withDefaults(
    defineProps<{
        disabled?: boolean;
    }>(),
    {
        disabled: false,
    },
);

const emit = defineEmits<{
    (e: "change", value: boolean): void;
}>();

const modelValue = defineModel<boolean>({ default: false });

const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    modelValue.value = target.checked;
    emit("change", target.checked);
};
</script>
