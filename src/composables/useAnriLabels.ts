import { computed, inject, provide, toValue } from "vue";
import type { ComputedRef, InjectionKey } from "vue";
import type { AnriLabels, AnriLabelsSource } from "../types";

export const anriLabelsKey: InjectionKey<ComputedRef<AnriLabels>> = Symbol(
    "anri:labels",
);

/**
 * Provides app-level labels. Must be called in a component setup context.
 * Components resolve props first, then this config, then their built-in defaults.
 */
export const provideAnriLabels = (
    source: AnriLabelsSource,
): ComputedRef<AnriLabels> => {
    const labels = computed(() => toValue(source));
    provide(anriLabelsKey, labels);
    return labels;
};

export const useAnriLabels = (): ComputedRef<AnriLabels> | undefined =>
    inject(anriLabelsKey, undefined);
