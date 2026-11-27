# AGENTS.md

anri-ui 是一套 Vue 3 组件库，提供以 Anri 为前缀的通用 UI 组件，并通过 Nuxt 模块提供适配层。

## 1. 项目环境

- 技术栈：TypeScript + Vue 3（`<script setup>` 单文件组件）+ Tailwind CSS 4。组件库以源码形式发布，`package.json` 的 exports 直接指向 `src/index.ts`，本仓库不产出构建产物，构建验证由两个 playground 承担。
- 构建入口：`src/index.ts`（公共导出）、`src/install.ts`（AnriUI 插件）、`styles/theme.css`（主题契约，`@theme` + `@source`）。
- 目标平台：现代浏览器；同时服务 Vue 3.5+ 应用与 Nuxt 4 应用。
- 必需工具：Node >= 24，pnpm@11（`packageManager` 字段已锁定版本）。
- 统一启用：tsconfig 开启 `strict`；oxlint 覆盖 `src` 与 `nuxt`；vue-tsc 负责全量类型检查。

新增组件时：

- 新文件放入 `src/components`，命名遵循 Anri 前缀加 PascalCase（如 `AnriButton.vue`）；
- 公共导出补入 `src/index.ts`，公共类型补入 `src/types.ts`，不要在组件文件里私藏导出；
- 依赖其他组件时遵循既有依赖方向：组件可以引用 composables 与更基础的组件（如 AnriButton 内嵌 AnriSpinner），不要形成循环引用；
- 不要重复声明公共构建属性；消费侧（playground 与外部应用）必须引入 `anri-ui/style.css`，并通过 Vite 配置排除 `anri-ui` 的预构建，不要自行复刻一份主题。

## 2. 目录结构

| 路径 | 职责 |
| --- | --- |
| `src/components/` | Anri* 组件本体 |
| `src/composables/` | useClickAway、useImageCache、useImageViewer、useAnriLabels 等组合式函数 |
| `src/install.ts` | AnriUI 插件，注入应用级状态（Lightbox 与图片查看器），SSR 下按请求隔离 |
| `src/index.ts` | 公共导出入口 |
| `src/types.ts` | 公共类型定义 |
| `nuxt/` | Nuxt 模块（module.mjs）与运行时插件（runtime/plugin.ts） |
| `styles/theme.css` | 主题契约：语义色 token 的 Tailwind 映射与 @source 扫描声明 |
| `playground/` | Vue + Vite 示例站，用于本地目检 |
| `playground-nuxt/` | Nuxt 示例站，用于验证适配层 |
| `docs/` | 使用说明、组件清单、开发说明 |

分层规则：

- 与单一组件强绑定的逻辑留在组件内部；两个以上组件共用的能力才下沉到 `src/composables`，避免出现复制粘贴的工具函数；
- composables 只承载无渲染逻辑（事件监听、缓存、依赖注入），模板片段不应编写在 composable 中。

### 2.1 组件目录要求

- Anri* 是纯 UI 层：组件内部禁止出现业务判断、业务接口调用与预置的业务文案；
- 组件内置文案（关闭、上一页、暂无更多等）必须经由 `useAnriLabels` 提供，解析顺序为 props 优先、注入配置其次、最后回退到内置默认值，禁止写死不可配置的字符串；
- 图标统一使用 `@heroicons/vue`，禁止引入其他图标体系；
- 存在外部状态联动能力的组件保持受控设计，参考 AnriThemeToggle 通过 `is-dark` 属性与 `toggle` 事件协作的方式。

## 3. 代码规范

- 遵循 Vue 3 官方风格指南，全部使用 Composition API 与 `<script setup lang="ts">`；
- 代码风格以仓库现状为准：4 空格缩进、双引号、语句结尾分号；prettier 已列入 devDependencies，提交前可执行格式化；
- lint 与类型检查以 oxlint 和 vue-tsc 的输出为准，新增代码不允许带入新的告警；
- 组件的变体样式用 Record 常量映射组织（参考 AnriButton 的 `variantClasses`），不要在模板里堆叠三元表达式拼接 class；
- 禁止防御性编程：不要为了稳妥而编写默认吞错与静默失败的分支，错误必须显式暴露；禁止未被验证的投机性抽象字段，“以后也许会用到”的 props 与类型一律不写。

## 4. UX 设计规范

设计基调为可爱、简约、克制，具体落实为以下硬性规则：

色彩：

- 只允许使用 `styles/theme.css` 定义的语义 token（primary、on-primary、surface、background 等）及其透明度叠加（如 `bg-primary/10`、`text-on-background/60`）；
- 禁止 `text-gray-500` 这类非语义灰阶，禁止体系外色值、外显渐变与发光效果；
- 色值由消费方在 `:root` 与 `.dark` 中定义，组件库只拥有 Tailwind 映射；新增 token 时必须同步更新 `styles/theme.css` 头部的契约注释。

边框与焦点（本项目重点约束）：

- 尽可能少用 border 设计；需要描边观感的交互反馈（聚焦、键盘焦点环、选中态高亮）一律使用 ring 实现，标准写法为 `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20`；
- ring 的透明度档位与聚焦时的底色保持一致：底色为 `/5` 时 ring 同为 `/5`，底色为 `/10` 时 ring 同为 `/10`，避免描边比色底更深的失衡观感；
- 现存组件中遗留的 border 用法（如 outline 变体）在迭代时顺势收敛，不要新增依赖 border 的样式。

形状与层次：

- 容器默认使用 `rounded-xl` 或 `rounded-2xl`；`rounded-full` 仅限头像、指示圆点、进度条等天然圆形元素；
- 不使用盒子阴影做层级装饰，层级关系依靠色块堆叠与透明度叠加表达。

动效：

- 所有颜色切换统一通过 `transition-colors`（或 `transition-all`）`duration-200 ease-out` 控制；
- 悬浮反馈只允许轻微的背景色过渡与文字提亮（如 `hover:bg-primary/5`、`group-hover:text-primary`），禁止悬浮上浮（translate-y）、放大（scale）与弹跳（bounce）；
- 弹层入退场使用非对称时序：入场为 `duration-200 ease-out` 配合 `scale-95 opacity-0` 过渡到 `scale-100 opacity-100`，退场压缩为 `duration-150 ease-in`。

其他：

- 禁止使用 emoji。

## 5. 测试

本仓库当前没有单元测试框架，质量验证依赖类型检查、lint 与 playground 目检。后续若引入测试，测试文件按模块划分放入规定目录，并且不写重复测试、仅验证第三方库行为的测试、不可达功能的测试或无断言的占位测试。

## 6. 验证

在仓库根目录执行：

```bash
pnpm lint          # oxlint 静态检查
pnpm typecheck     # vue-tsc 全量类型检查
pnpm dev:vue       # 启动 Vue playground 目检
pnpm dev:nuxt      # 启动 Nuxt playground 目检
pnpm build:vue     # 构建 Vue playground，照常执行
pnpm build:nuxt    # 构建 Nuxt playground，Windows 日常不执行，见下方说明
```

日常迭代以 lint、typecheck 与 playground 目检为准，Vue 侧照常执行 `pnpm build:vue` 完成构建验证。构建上的例外只有 Nuxt：Windows 环境下不要把 `pnpm build:nuxt` 当作常规冒烟手段，因为 Nuxt 全量构建开销较大；只有改动涉及 Nuxt 模块或发布前，才单独执行它。

## 7. 文档与交付

- README.md 只保留安装入口级别的说明；组件行为与 props 变更必须同步更新 docs/components.md，用法与集成方式变更更新 docs/usage.md，目录与脚本变更更新 docs/development.md；
- 文档使用简体中文，示例代码保证可直接运行；
- 使用者通过 GitHub 引用（`github:TangTangChu/anri-ui#main`）安装，因此 main 分支必须保持可用状态：合入前 lint 与 typecheck 必须通过，发布性改动需同步更新 `package.json` 的 version；
- git 提交遵循 Conventional Commits，格式为 `type: summary` 或 `type(scope): summary`（如 `feat(button): add loading state`），一次提交只承载一件事，按功能分批提交。
