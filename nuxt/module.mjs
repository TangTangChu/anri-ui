import {
    addComponentsDir,
    addImportsDir,
    addPlugin,
    createResolver,
    defineNuxtModule,
} from "@nuxt/kit";

export default defineNuxtModule({
    meta: {
        name: "anri-ui",
        configKey: "anriUi",
    },
    setup(_options, nuxt) {
        const { resolve } = createResolver(import.meta.url);

        // The package is shipped as source, so Nuxt must transpile it.
        nuxt.options.build.transpile.push("anri-ui");

        addComponentsDir({
            path: resolve("../src/components"),
            pathPrefix: false,
        });
        addImportsDir(resolve("../src/composables"));
        addPlugin(resolve("./runtime/plugin"));
    },
});
