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
import type { AnriLoadMoreLabels } from "../types";

const props = defineProps<{
    hasMore: boolean;
    loading: boolean;
    labels?: AnriLoadMoreLabels;
}>();

defineEmits<{
    (e: "load-more"): void;
}>();

const text = computed(() => ({
    loading: props.labels?.loading ?? "Loading...",
    loadMore: props.labels?.loadMore ?? "Load more",
    noMore: props.labels?.noMore ?? "No more",
}));
</script>
