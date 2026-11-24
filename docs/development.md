# 开发说明

## 目录

```text
src/
  components/       Vue SFC
  composables/      useClickAway / useImageCache / useImageViewer
  install.ts        AnriUI 插件
  index.ts          公共导出
  types.ts          公共类型
nuxt/
  module.mjs        Nuxt module
  runtime/plugin.ts Nuxt 插件
styles/
  theme.css         @theme + @source
playground/         Vue + Vite 示例
playground-nuxt/    Nuxt 示例
```

## 脚本

```bash
pnpm install
pnpm dev:vue
pnpm dev:nuxt
pnpm typecheck
pnpm lint
pnpm build:vue
pnpm build:nuxt
```
