<template>
    <nav
        v-if="prev || next"
        class="mt-12 pt-8 border-t border-on-surface/5"
        :aria-label="text.nav"
    >
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <RouterLink
                v-if="prev"
                :to="prev.to"
                class="group flex flex-col justify-center gap-2 rounded-xl border border-on-surface/5 p-5 transition-all duration-300 ease-out hover:border-primary/20"
                :aria-label="`${text.prev}: ${prev.title}`"
            >
                <div
                    class="flex items-center gap-1.5 text-xs font-bold tracking-wider text-on-surface/40 uppercase transition-colors group-hover:text-primary/60"
                >
                    <ChevronLeftIcon class="h-4 w-4" aria-hidden="true" />
                    <span>{{ text.prev }}</span>
                </div>
                <div
                    class="line-clamp-2 text-base font-semibold text-on-surface/80 transition-colors group-hover:text-primary"
                >
                    {{ prev.title }}
                </div>
            </RouterLink>

            <RouterLink
                v-if="next"
                :to="next.to"
                class="group flex flex-col justify-center gap-2 rounded-xl border border-on-surface/5 p-5 text-right transition-all duration-300 ease-out hover:border-primary/20"
                :class="!prev ? 'sm:col-start-2' : ''"
                :aria-label="`${text.next}: ${next.title}`"
            >
                <div
                    class="flex items-center justify-end gap-1.5 text-xs font-bold tracking-wider text-on-surface/40 uppercase transition-colors group-hover:text-primary/60"
                >
                    <span>{{ text.next }}</span>
                    <ChevronRightIcon class="h-4 w-4" aria-hidden="true" />
                </div>
                <div
                    class="line-clamp-2 text-base font-semibold text-on-surface/80 transition-colors group-hover:text-primary"
                >
                    {{ next.title }}
                </div>
            </RouterLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import type { AnriPrevNextLabels, AnriPrevNextTarget } from "../types";

const props = defineProps<{
    prev?: AnriPrevNextTarget | null;
    next?: AnriPrevNextTarget | null;
    labels?: AnriPrevNextLabels;
}>();

const text = computed(() => ({
    nav: props.labels?.nav ?? "Article navigation",
    prev: props.labels?.prev ?? "Previous",
    next: props.labels?.next ?? "Next",
}));
</script>
