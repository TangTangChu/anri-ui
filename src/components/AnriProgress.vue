<template>
    <div
        class="w-full overflow-hidden rounded-full bg-on-background/10"
        :class="sizeClasses[props.size]"
        role="progressbar"
        :aria-valuenow="props.indeterminate ? undefined : percent"
        aria-valuemin="0"
        :aria-valuemax="props.indeterminate ? undefined : props.max"
        :aria-label="props.label"
    >
        <div
            class="h-full rounded-full"
            :class="[
                colorClasses[props.color],
                props.indeterminate
                    ? 'w-2/5 anri-progress-indeterminate'
                    : 'transition-all duration-200 ease-out',
            ]"
            :style="props.indeterminate ? undefined : { width: `${percent}%` }"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type AnriProgressSize = "sm" | "md" | "lg";
type AnriProgressColor = "primary" | "secondary" | "current";

const props = withDefaults(
    defineProps<{
        value?: number;
        max?: number;
        size?: AnriProgressSize;
        color?: AnriProgressColor;
        label?: string;
        indeterminate?: boolean;
    }>(),
    {
        max: 100,
        size: "md",
        color: "primary",
        indeterminate: false,
    },
);

const sizeClasses: Record<AnriProgressSize, string> = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
};

const colorClasses: Record<AnriProgressColor, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    current: "bg-current",
};

const percent = computed(() => {
    if (props.value === undefined || props.max <= 0) return 0;
    const ratio = (props.value / props.max) * 100;
    return Math.min(100, Math.max(0, ratio));
});
</script>

<style scoped>
/* 不定态：固定宽度色块沿轨道循环滑动，prefers-reduced-motion 时退为慢速线性。 */
.anri-progress-indeterminate {
    animation: anri-progress-slide 1.4s ease-in-out infinite;
}

@keyframes anri-progress-slide {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(250%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .anri-progress-indeterminate {
        animation-duration: 3s;
        animation-timing-function: linear;
    }
}
</style>
