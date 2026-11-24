# 使用说明

## Vue 项目

```ts
import { createApp } from "vue";
import { AnriUI } from "anri-ui";
import "anri-ui/style.css";
import App from "./App.vue";

createApp(App).use(AnriUI).mount("#app");
```

组件按需导入：

```vue
<script setup lang="ts">
import { AnriButton, AnriDialog } from "anri-ui";
</script>

<template>
    <AnriButton>Click</AnriButton>
</template>
```

`AnriUI` 为 `AnriLightbox` 和 `useImageViewer` 注入应用级状态。状态按 Vue 应用隔离；SSR 下按请求隔离。

包安装到 `node_modules` 后，Vite 默认会预构建依赖。需要在配置中排除该包：

```ts
export default defineConfig({
    optimizeDeps: {
        exclude: ["anri-ui"],
    },
    ssr: {
        noExternal: ["anri-ui"],
    },
    resolve: {
        dedupe: ["vue"],
    },
});
```

## Nuxt 项目

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    modules: ["anri-ui/nuxt"],
});
```

module 负责以下配置：

- 将 `anri-ui` 加入 `build.transpile`；
- 将 `src/components` 注册为自动导入组件；
- 将 `src/composables` 注册为自动导入的 composable；
- 注入 `AnriUI` 插件。

样式需要在应用的 CSS 入口中引入：

```css
@import "tailwindcss";
@import "anri-ui/style.css";
```

通过 `nuxt.options.css` 单独注入时，Tailwind 不会处理 `@theme` 和 `@source`。

## Tailwind token 契约

组件使用以下 Tailwind 颜色工具类：

`primary`、`on-primary`、`secondary`、`background`、`on-background`、`surface`、`on-surface`、`surface-container`

使用方需要在 `:root` 和 `.dark` 中定义这些变量：

```css
@import "tailwindcss";
@import "anri-ui/style.css";

:root {
    --primary: #ff8fa3;
    --on-primary: #ffffff;
    --secondary: #74d2fc;
    --background: #ffffff;
    --on-background: #333333;
    --surface: #fcfcfc;
    --on-surface: #333333;
    --surface-container: #f0f0f0;
}

.dark {
    --primary: #d94b68;
    --on-primary: #ffffff;
    --secondary: #3898c6;
    --background: #1c1a1b;
    --on-background: #f4f0f1;
    --surface: #262325;
    --on-surface: #f4f0f1;
    --surface-container: #2f2c2d;
}
```

包内的 `styles/theme.css` 提供 `@theme` 映射和 `@source "../src/components"`，应用只负责提供变量值。

若 Tailwind 未扫描到包内组件，可在应用的 CSS 中补充：

```css
@source "../../node_modules/anri-ui/src/components";
```

## 文案

组件不依赖 vue-i18n。需要显示文案时，通过 `labels` 或单独的 `label` prop 传入：

```vue
<AnriPagination
    :labels="{
        nav: '分页导航',
        prev: '上一页',
        next: '下一页',
        page: (page) => `第 ${page} 页`,
    }"
/>
```
