<template>
    <div
        class="relative overflow-hidden rounded-[inherit]"
        :class="[
            wrapperClass,
            wFull && hFull ? 'w-full h-full' : 'inline-block',
        ]"
    >
        <div
            v-if="isLoading"
            class="absolute inset-0 flex items-center justify-center bg-on-background/5 rounded-[inherit]"
            :class="{ 'min-h-32': !hFull }"
        >
            <AnriSpinner :size="spinnerSize" />
        </div>
        <div
            v-else-if="isError"
            class="absolute inset-0 flex items-center justify-center bg-on-background/5 text-on-background/20 rounded-[inherit]"
            :class="{ 'min-h-32': !hFull }"
        >
            <PhotoIcon :class="errorIconSize" />
        </div>
        <img
            v-bind="$attrs"
            ref="imgRef"
            :key="retryKey"
            :src="safeSrc"
            class="transition-opacity duration-200 ease-out rounded-[inherit]"
            :class="[
                imgClass,
                {
                    'opacity-0': !revealed,
                    'opacity-100': revealed,
                    'w-full h-full': wFull && hFull,
                },
            ]"
            @load="onLoad"
            @error="onError"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { PhotoIcon } from "@heroicons/vue/24/outline";
import AnriSpinner from "./AnriSpinner.vue";
import { IMAGE_ERROR_TTL, useImageCache } from "../composables/useImageCache";

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        src?: string;
        spinnerSize?: "sm" | "md" | "lg" | "xl";
        wrapperClass?: string;
        imgClass?: string;
        wFull?: boolean;
        hFull?: boolean;
        forceHttps?: boolean;
    }>(),
    {
        spinnerSize: "md",
        wFull: true,
        hFull: true,
        forceHttps: true,
    },
);

const safeSrc = computed(() => {
    const url = props.src;
    if (!url) return "";
    if (props.forceHttps && url.startsWith("http://")) {
        return url.replace("http://", "https://");
    }
    return url;
});

const { getStatus, setStatus } = useImageCache();

const imgRef = ref<HTMLImageElement | null>(null);
const isLoading = ref(true);
const isError = ref(false);
// 渐入效果只依据当前 img 元素的 load 事件；缓存命中时同样执行渐入。
const revealed = ref(false);

// 错误态在缓存中会过期；过期后重建 img 元素，以便重新发起请求。
const MAX_RETRIES = 3;
const retryKey = ref(0);
let retryCount = 0;
let retryTimer: ReturnType<typeof setTimeout> | null = null;

const clearRetry = (resetCount = false) => {
    if (retryTimer) {
        clearTimeout(retryTimer);
        retryTimer = null;
    }
    if (resetCount) retryCount = 0;
};

const scheduleRetry = () => {
    if (typeof window === "undefined" || retryTimer) return;
    if (retryCount >= MAX_RETRIES) return;

    retryTimer = setTimeout(() => {
        retryTimer = null;
        if (!isError.value) return;
        // 只有缓存里的错误记录确实过期了才重来，否则等下一次状态变化
        if (getStatus(safeSrc.value) !== undefined) return;
        retryCount += 1;
        isError.value = false;
        isLoading.value = true;
        revealed.value = false;
        retryKey.value += 1;
    }, IMAGE_ERROR_TTL);
};

// 将缓存状态同步到本地视图状态；错误态同时安排一次过期重试。
const applyStatus = () => {
    const url = safeSrc.value;
    if (!url) {
        isLoading.value = false;
        isError.value = false;
        clearRetry(true);
        return;
    }

    const status = getStatus(url);
    if (status === "loaded") {
        isLoading.value = false;
        isError.value = false;
        clearRetry(true);
    } else if (status === "error") {
        isLoading.value = false;
        isError.value = true;
        scheduleRetry();
    } else {
        isLoading.value = true;
        isError.value = false;
    }
};

applyStatus();

const errorIconSize = computed(() => {
    switch (props.spinnerSize) {
        case "sm":
            return "h-5 w-5";
        case "md":
            return "h-8 w-8";
        case "lg":
            return "h-12 w-12";
        case "xl":
            return "h-16 w-16";
        default:
            return "h-8 w-8";
    }
});

const onLoad = () => {
    if (safeSrc.value) {
        setStatus(safeSrc.value, "loaded");
    }
    clearRetry(true);
    isLoading.value = false;
    isError.value = false;
    revealed.value = true;
};

const onError = () => {
    if (safeSrc.value) {
        setStatus(safeSrc.value, "error");
    }
    isLoading.value = false;
    isError.value = true;
    revealed.value = false;
    scheduleRetry();
};

// SSR 水合时，load 事件可能在监听器挂载前触发，因此使用 complete 补偿。
onMounted(() => {
    const img = imgRef.value;
    if (img && img.complete && img.naturalWidth > 0) {
        onLoad();
    }
});

onBeforeUnmount(() => {
    clearRetry();
});

watch(
    () => safeSrc.value,
    () => {
        revealed.value = false;
        // 换了图源，旧的重试机会不沿用
        clearRetry(true);
        applyStatus();
    },
);

watch(
    () => (safeSrc.value ? getStatus(safeSrc.value) : undefined),
    (newStatus) => {
        // 条目被淘汰或错误态过期后返回 undefined，此时保持现有视图，
        // 不把已经显示出来的图退回到加载态
        if (!newStatus) return;
        applyStatus();
    },
);
</script>
