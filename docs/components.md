# 组件

| 组件 | 说明 |
| --- | --- |
| `AnriButton` | 提供 primary、soft、outline、ghost 四种变体，支持 `to`、`href`、loading 和 icon slot。 |
| `AnriInput` | 支持搜索图标、清空按钮，以及 icon 和 suffix slot。 |
| `AnriSelector` | 提供 pill 和 text 两种变体。 |
| `AnriAlert` | 支持 info、succ、warn、error、important、plain 六种类型。 |
| `AnriDialog` | 包含焦点陷阱，并支持 Esc 和点击遮罩关闭。 |
| `AnriDrawer` | 从底部滑入的抽屉，不依赖特定屏幕断点；可用 `panel-class` 覆盖面板样式。 |
| `AnriDropdown` | 支持点击外部关闭、悬停打开，以及 top 和 bottom 两个方向。 |
| `AnriSelect` | 基于 `AnriDropdown` 实现，选项可以携带图片。 |
| `AnriPagination` | 提供 default 和 compact 两种布局，窄屏时自动降级为输入框。 |
| `AnriLoadMore` | 显示加载更多按钮，或显示没有更多内容的提示。 |
| `AnriSpinner` | 提供 sm、md、lg、xl 四种尺寸。 |
| `AnriTooltip` | 基于 floating-ui 实现。 |
| `AnriImage` | 处理加载态、错误态和图片缓存，并可配置是否将 http 升级为 https。 |
| `AnriLightbox` | 依赖 `AnriUI` 注入的图片查看器状态。 |
| `AnriPrevNextNav` | 显示上一篇和下一篇导航。 |
| `AnriThemeToggle` | 受控组件，通过 `is-dark` 和 `toggle` 事件工作。 |
| `AnriLocaleSelect` | 受控组件，通过 `locales` 和 `v-model` 工作。 |

`AnriCharCard` 和 `AnriPageTransition` 属于博客业务组件，不在本包范围内。
