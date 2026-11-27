<template>
    <div class="flex w-full items-center gap-2">
        <div class="relative w-full group">
            <div
                v-if="hasIcon || props.search"
                class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-on-background/40 transition-colors duration-200 group-focus-within:text-on-background/70"
            >
                <MagnifyingGlassIcon v-if="props.search" class="w-5 h-5" />
                <slot v-else name="icon" />
            </div>

            <input
                v-bind="$attrs"
                :type="props.type"
                :value="modelValue"
                :disabled="props.disabled"
                :placeholder="props.placeholder"
                class="w-full transition-all duration-200 ease-out outline-none rounded-xl border-2 font-bold text-on-background placeholder:text-on-background/30"
                :class="[
                    sizeClasses[props.size],
                    variantClasses[props.variant],
                    hasIcon || props.search ? 'pl-11' : 'pl-4',
                    props.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-text',
                ]"
                @input="onInput"
                @compositionstart="onCompositionStart"
                @compositionend="onCompositionEnd"
                @change="onChange"
                @keydown="onKeydown"
                @focus="$emit('focus', $event)"
                @blur="$emit('blur', $event)"
            />

            <!--
                输入框内侧操作区：action 插槽 + 预制 action（clear、search，
                search 固定最右）。clear 出现/消失时以宽度过渡推挤相邻按钮。
            -->
            <div
                v-if="hasActions"
                class="absolute inset-y-0 right-0 flex items-center gap-0.5 pr-2"
            >
                <slot name="action" />
                <Transition
                    enter-active-class="transition-all duration-200 ease-out"
                    enter-from-class="max-w-0 opacity-0"
                    enter-to-class="max-w-6 opacity-100"
                    leave-active-class="transition-all duration-150 ease-in"
                    leave-from-class="max-w-6 opacity-100"
                    leave-to-class="max-w-0 opacity-0"
                >
                    <button
                        v-if="showClear"
                        type="button"
                        class="w-6 shrink-0 overflow-hidden p-1 rounded-lg text-on-background/40 hover:bg-on-background/10 hover:text-on-background/70 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                        :aria-label="clearText"
                        :title="clearText"
                        @click="clear"
                    >
                        <XMarkIcon class="w-4 h-4" />
                    </button>
                </Transition>
                <button
                    v-if="props.allowSearch"
                    type="button"
                    class="p-1 rounded-lg text-on-background/40 hover:bg-primary/5 hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    :aria-label="searchLabelText"
                    :title="searchLabelText"
                    @click="emitSearch"
                >
                    <MagnifyingGlassIcon class="w-4 h-4" />
                </button>
            </div>
            <div
                v-else-if="$slots.suffix"
                class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-on-background/40"
            >
                <slot name="suffix" />
            </div>
        </div>

        <!--
            输入框外侧操作区：进出场为右侧滑入/滑出，兄弟元素通过
            move-class 平滑让位；子元素需携带 key。
        -->
        <TransitionGroup
            v-if="hasOutsideAction"
            tag="div"
            class="relative flex shrink-0 items-center self-stretch"
            enter-active-class="transition-all! duration-200 ease-out"
            enter-from-class="translate-x-2 opacity-0"
            enter-to-class="translate-x-0 opacity-100"
            leave-active-class="transition-all! duration-150 ease-in absolute right-0"
            leave-from-class="translate-x-0 opacity-100"
            leave-to-class="translate-x-2 opacity-0"
            move-class="transition-transform duration-200 ease-out"
        >
            <slot name="action-outside" />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useAnriLabels } from "../composables/useAnriLabels";

type AnriInputVariant = "default" | "soft" | "filled" | "ghost";
type AnriInputSize = "sm" | "md" | "lg";

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        modelValue?: string | number;
        type?: string;
        variant?: AnriInputVariant;
        size?: AnriInputSize;
        placeholder?: string;
        disabled?: boolean;
        search?: boolean;
        allowClear?: boolean;
        allowSearch?: boolean;
        clearLabel?: string;
        searchLabel?: string;
    }>(),
    {
        modelValue: "",
        type: "text",
        variant: "default",
        size: "md",
        placeholder: "",
        disabled: false,
        search: false,
        allowClear: false,
        allowSearch: false,
    },
);

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
    (e: "change", value: string): void;
    (e: "search", value: string): void;
    (e: "focus", event: FocusEvent): void;
    (e: "blur", event: FocusEvent): void;
    (e: "clear"): void;
}>();

const slots = useSlots();
const injectedLabels = useAnriLabels();

const hasIcon = computed(() => !!slots.icon);
const hasActionSlot = computed(() => !!slots.action);
const hasOutsideAction = computed(() => !!slots["action-outside"]);
const showClear = computed(
    () => props.allowClear && String(props.modelValue) !== "",
);
const hasActions = computed(
    () => hasActionSlot.value || showClear.value || props.allowSearch,
);

const clearText = computed(
    () => props.clearLabel ?? injectedLabels?.value?.clear ?? "Clear",
);

const searchLabelText = computed(
    () => props.searchLabel ?? injectedLabels?.value?.search ?? "Search",
);

let isComposing = false;

const sizeClasses: Record<AnriInputSize, string> = {
    sm: "min-h-9 px-3 py-1.5 text-sm",
    md: "min-h-11 px-4 py-2 text-sm",
    lg: "min-h-12 px-5 py-2.5 text-base",
};

const variantClasses: Record<AnriInputVariant, string> = {
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
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
};

const onInput = (event: Event) => {
    if (isComposing) return;
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
};

const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("change", target.value);
};

// 回车触发搜索；输入法组词过程中的回车不触发。
const onKeydown = (event: KeyboardEvent) => {
    if (!props.allowSearch || event.isComposing) return;
    if (event.key === "Enter") {
        emitSearch();
    }
};

const emitSearch = () => {
    emit("search", String(props.modelValue));
};

const clear = () => {
    emit("update:modelValue", "");
    emit("change", "");
    emit("clear");
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
}
</style>
