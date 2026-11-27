<template>
    <div class="flex flex-col gap-2.5" role="radiogroup" :aria-label="props.label">
        <label
            v-for="option in options"
            :key="option.value"
            class="group inline-flex select-none items-center gap-2 text-sm"
            :class="
                option.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
            "
        >
            <input
                type="radio"
                class="peer sr-only"
                :name="groupName"
                :value="option.value"
                :checked="modelValue === option.value"
                :disabled="option.disabled"
                @change="onChange(option.value)"
            />
            <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-200 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20"
                :class="
                    modelValue === option.value
                        ? 'bg-primary/10 group-hover:bg-primary/15'
                        : 'bg-on-background/10 group-hover:bg-on-background/15'
                "
            >
                <span
                    v-if="modelValue === option.value"
                    class="h-2.5 w-2.5 rounded-full bg-primary"
                />
            </span>
            <span class="min-w-0 text-on-background">{{ option.label }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { useId } from "vue";

interface AnriRadioGroupOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

const props = defineProps<{
    options: AnriRadioGroupOption[];
    label?: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void;
    (e: "change", value: string | number): void;
}>();

const modelValue = defineModel<string | number>();

/* 原生 radio 依赖同名分组实现方向键导航，自动生成避免消费方手填。 */
const groupName = useId();

const onChange = (value: string | number) => {
    modelValue.value = value;
    emit("change", value);
};
</script>
