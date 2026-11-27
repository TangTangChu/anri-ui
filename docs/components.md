# 组件

| 组件 | 说明 |
| --- | --- |
| `AnriButton` | 提供 primary、soft、outline、ghost 四种变体，支持 `to`、`href`、loading 和 icon slot。 |
| `AnriCheckbox` | 受控勾选框，通过 `v-model` 工作，默认 slot 提供标签文案。 |
| `AnriInput` | 提供 default、soft、filled、ghost 四种变体；右侧操作区支持预制 action（`allow-clear` 清空、`allow-search` 搜索，回车同样触发 `search` 事件）与可点击的 `action` 插槽；`action-outside` 插槽在输入框外侧渲染操作，自带进出场位移动画（子元素需携带 key）。 |
| `AnriTextarea` | 与 `AnriInput` 共用四种变体的多行输入框；`rows` 等原生属性可直接透传。 |
| `AnriSelector` | 提供 pill 和 text 两种变体。 |
| `AnriAlert` | 支持 info、succ、warn、error、important、plain 六种类型。 |
| `AnriDialog` | 包含焦点陷阱，并支持 Esc 和点击遮罩关闭；`footer` 插槽的按钮默认右对齐，作用域暴露 `close`。 |
| `AnriDrawer` | 从底部滑入的抽屉，不依赖特定屏幕断点；可用 `panel-class` 覆盖面板样式。 |
| `AnriDropdown` | 支持点击外部关闭、悬停打开，以及 top 和 bottom 两个方向。 |
| `AnriSelect` | 基于 `AnriDropdown` 实现，选项可以携带图片。 |
| `AnriSwitch` | 受控开关，通过 `v-model` 工作，提供 sm、md、lg 三种尺寸。 |
| `AnriRadioGroup` | 单选组，通过 `options` 与 `v-model` 工作，自动生成原生 radio 的分组名。 |
| `AnriPagination` | 提供 default 和 compact 两种布局，窄屏时自动降级为输入框。 |
| `AnriLoadMore` | 显示加载更多按钮，或显示没有更多内容的提示。 |
| `AnriSpinner` | 提供 sm、md、lg、xl 四种尺寸。 |
| `AnriProgress` | 圆角进度条，支持 sm、md、lg 尺寸与 primary、secondary、current 颜色；`indeterminate` 时显示不定态加载动画。 |
| `AnriTooltip` | 基于 floating-ui 实现。 |
| `AnriImage` | 处理加载态、错误态和图片缓存，并可配置是否将 http 升级为 https。 |
| `AnriLightbox` | 依赖 `AnriUI` 注入的图片查看器状态。 |
| `AnriToast` | 依赖 `AnriUI` 注入的消息状态，在页面底部居中堆叠；通过 `useToast` 的 `showToast` 触发，`duration` 传 0 常驻。 |
| `AnriPrevNextNav` | 显示上一篇和下一篇导航。 |
| `AnriThemeToggle` | 受控组件，通过 `is-dark` 和 `toggle` 事件工作。 |
| `AnriLocaleSelect` | 受控组件，通过 `locales` 和 `v-model` 工作。 |
