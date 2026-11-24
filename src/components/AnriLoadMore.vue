<template>
    <div class="flex justify-center my-8">
        <AnriButton
            v-if="hasMore"
            variant="ghost"
            size="md"
            :loading="loading"
            class="px-6 rounded-xl"
            @click="$emit('load-more')"
        >
            {{ loading ? text.loading : text.loadMore }}
        </AnriButton>
        <span v-else class="text-on-background/40 text-sm">
            {{ text.noMore }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AnriButton from "./AnriButton.vue";
import { useAnriLabels } from "../composables/useAnriLabels";
import type { AnriLoadMoreLabels } from "../types";

const props = defineProps<{
    hasMore: boolean;
    loading: boolean;
    labels?: AnriLoadMoreLabels;
}>();

defineEmits<{
    (e: "load-more"): void;
}>();

const injectedLabels = useAnriLabels();

const text = computed(() => {
    const labels = {
        ...injectedLabels?.value?.loadMore,
        ...props.labels,
    };
    return {
        loading:
            props.labels?.loading ??
            injectedLabels?.value?.loading ??
            "Loading...",
        loadMore: labels.loadMore ?? "Load more",
        noMore: labels.noMore ?? "No more",
    };
});
</script>
