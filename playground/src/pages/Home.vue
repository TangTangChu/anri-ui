<script setup lang="ts">
import { ref } from "vue";
import {
    AnriAlert,
    AnriButton,
    AnriCheckbox,
    AnriDialog,
    AnriDrawer,
    AnriDropdown,
    AnriImage,
    AnriInput,
    AnriLightbox,
    AnriLoadMore,
    AnriLocaleSelect,
    AnriPagination,
    AnriPrevNextNav,
    AnriProgress,
    AnriRadioGroup,
    AnriSelect,
    AnriSelector,
    AnriSpinner,
    AnriSwitch,
    AnriTextarea,
    AnriThemeToggle,
    AnriToast,
    AnriTooltip,
    useImageViewer,
    useToast,
} from "anri-ui";

const query = ref("");
const bio = ref("");
const category = ref("all");
const selectValue = ref("zh");
const page = ref(2);
const showDialog = ref(false);
const showDrawer = ref(false);
const dropdownOpen = ref(false);
const isDark = ref(false);
const locale = ref("zh");
const loading = ref(false);
const hasMore = ref(true);
const switchOn = ref(true);
const switchOff = ref(false);
const progressValue = ref(60);
const checkboxOn = ref(true);
const checkboxOff = ref(false);
const radioValue = ref("tech");

const radioOptions = [
    { label: "技术", value: "tech" },
    { label: "生活", value: "life" },
    { label: "加密内容", value: "secret", disabled: true },
];

const { openViewer } = useImageViewer();
const { showToast } = useToast();

const imageUrl = "https://img.tantanchugasuki.cn/i/r/avatar";

const categories = [
    { label: "全部", value: "all" },
    { label: "技术", value: "tech" },
    { label: "生活", value: "life" },
];

const selectOptions = [
    { value: "zh", label: "简体中文" },
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
];

const locales = [
    { code: "zh", name: "简体中文" },
    { code: "en", name: "English" },
    { code: "ja", name: "日本語" },
];

const toggleTheme = (): void => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark", isDark.value);
};

const toggleMore = (): void => {
    loading.value = true;
    window.setTimeout(() => {
        loading.value = false;
        hasMore.value = false;
    }, 600);
};
</script>

<template>
    <div class="mx-auto w-full max-w-4xl space-y-10">
        <header class="text-center">
            <h1 class="text-4xl font-extrabold tracking-tight text-primary">
                Anri UI Playground
            </h1>
            <p class="mt-3 text-on-background/60">
                Vue 3 与 Tailwind CSS 4 示例。
            </p>
            <div class="mt-5 flex items-center justify-center gap-2">
                <AnriLocaleSelect v-model="locale" :locales="locales" />
                <AnriThemeToggle :is-dark="isDark" @toggle="toggleTheme" />
            </div>
        </header>

        <section>
            <h2 class="text-2xl font-bold text-on-background">Buttons</h2>
            <div class="mt-4 flex flex-wrap items-center gap-3">
                <AnriButton>主要按钮</AnriButton>
                <AnriButton variant="soft">柔和按钮</AnriButton>
                <AnriButton variant="outline">描边按钮</AnriButton>
                <AnriButton variant="ghost">幽灵按钮</AnriButton>
                <AnriButton loading>加载中</AnriButton>
                <AnriButton disabled>已禁用</AnriButton>
                <AnriButton to="/a">RouterLink</AnriButton>
                <AnriButton href="https://github.com" target="_blank">
                    外部链接
                </AnriButton>
            </div>
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">
                Input / Textarea
            </h2>
            <div class="mt-4 space-y-3">
                <AnriInput
                    v-model="query"
                    search
                    allow-clear
                    placeholder="default 变体,搜索内容..."
                />
                <AnriInput
                    v-model="query"
                    variant="soft"
                    search
                    allow-clear
                    placeholder="soft 变体,搜索内容..."
                />
                <AnriInput
                    v-model="query"
                    variant="filled"
                    search
                    allow-clear
                    placeholder="filled 变体,搜索内容..."
                />
                <AnriInput
                    v-model="query"
                    variant="ghost"
                    search
                    allow-clear
                    placeholder="ghost 变体,搜索内容..."
                />
                <AnriInput placeholder="禁用状态" disabled />
                <AnriTextarea
                    v-model="bio"
                    placeholder="default 变体,介绍一下自己..."
                />
                <AnriTextarea
                    v-model="bio"
                    variant="filled"
                    placeholder="filled 变体,介绍一下自己..."
                />
                <AnriTextarea placeholder="禁用状态" disabled />
            </div>
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">Selector</h2>
            <div class="mt-4 space-y-3">
                <AnriSelector v-model="category" :options="categories" />
                <AnriSelector
                    v-model="category"
                    variant="text"
                    :options="categories"
                />
            </div>
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">
                Switch / Checkbox / Radio
            </h2>
            <div class="mt-4 space-y-4">
                <div class="flex flex-wrap items-center gap-6">
                    <AnriSwitch v-model="switchOn" />
                    <AnriSwitch v-model="switchOff" size="lg" />
                    <AnriSwitch :model-value="false" disabled />
                </div>
                <div class="flex flex-wrap items-center gap-6">
                    <AnriCheckbox v-model="checkboxOn">同意许可协议</AnriCheckbox>
                    <AnriCheckbox v-model="checkboxOff">订阅更新</AnriCheckbox>
                    <AnriCheckbox :model-value="false" disabled>
                        已停用
                    </AnriCheckbox>
                </div>
                <AnriRadioGroup
                    v-model="radioValue"
                    :options="radioOptions"
                    label="内容分类"
                />
            </div>
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">Progress</h2>
            <div class="mt-4 space-y-3">
                <AnriProgress :value="progressValue" />
                <AnriProgress indeterminate label="加载中" />
                <AnriProgress
                    :value="progressValue"
                    color="secondary"
                    size="sm"
                />
                <AnriProgress
                    :value="progressValue"
                    color="current"
                    size="lg"
                    label="加载进度"
                />
            </div>
            <div class="mt-4 flex gap-3">
                <AnriButton
                    variant="ghost"
                    size="sm"
                    @click="progressValue = Math.max(0, progressValue - 10)"
                >
                    -10
                </AnriButton>
                <AnriButton
                    variant="ghost"
                    size="sm"
                    @click="progressValue = Math.min(100, progressValue + 10)"
                >
                    +10
                </AnriButton>
            </div>
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">Alerts</h2>
            <div class="mt-4 space-y-3">
                <AnriAlert type="info">信息提示</AnriAlert>
                <AnriAlert type="succ">成功提示</AnriAlert>
                <AnriAlert type="warn">警告提示</AnriAlert>
                <AnriAlert type="error">错误提示</AnriAlert>
                <AnriAlert type="important" title="IMPORTANT">
                    重要提示
                </AnriAlert>
            </div>
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">Feedback</h2>
            <div class="mt-4 flex flex-wrap items-center gap-6">
                <AnriSpinner />
                <AnriSpinner size="sm" color="secondary" />
                <AnriSpinner size="lg" color="current" />
                <AnriTooltip content="浮动提示">
                    <AnriButton variant="ghost">悬停查看</AnriButton>
                </AnriTooltip>
            </div>
            <div class="mt-4 flex flex-wrap gap-3">
                <AnriButton
                    variant="soft"
                    @click="showToast('info', '这是一条信息提示')"
                >
                    信息 Toast
                </AnriButton>
                <AnriButton
                    variant="soft"
                    @click="showToast('succ', '保存成功')"
                >
                    成功 Toast
                </AnriButton>
                <AnriButton
                    variant="soft"
                    @click="showToast('warn', '内容较长时消息会自动换行显示')"
                >
                    警告 Toast
                </AnriButton>
                <AnriButton
                    variant="soft"
                    @click="showToast('error', '出错了，这条消息需要手动关闭', 0)"
                >
                    常驻错误 Toast
                </AnriButton>
            </div>
            <AnriToast />
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">
                Dropdown / Select
            </h2>
            <div class="mt-4 flex flex-wrap items-center gap-4">
                <AnriDropdown v-model="dropdownOpen">
                    <template #trigger="{ toggle }">
                        <AnriButton variant="outline" @click="toggle">
                            Dropdown
                        </AnriButton>
                    </template>
                    <template #menu="{ close }">
                        <button
                            class="rounded-lg px-3 py-2 text-left text-sm hover:bg-on-background/5"
                            @click="close"
                        >
                            选项一
                        </button>
                        <button
                            class="rounded-lg px-3 py-2 text-left text-sm hover:bg-on-background/5"
                            @click="close"
                        >
                            选项二
                        </button>
                    </template>
                </AnriDropdown>

                <AnriSelect
                    :model-value="selectValue"
                    :options="selectOptions"
                    @update:model-value="selectValue = String($event)"
                >
                    <template #trigger="{ toggle }">
                        <AnriButton variant="soft" @click="toggle">
                            {{ selectValue }}
                        </AnriButton>
                    </template>
                </AnriSelect>
            </div>
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">Overlays</h2>
            <div class="mt-4 flex flex-wrap gap-3">
                <AnriButton @click="showDialog = true">打开对话框</AnriButton>
                <AnriButton variant="soft" @click="showDrawer = true">
                    打开抽屉
                </AnriButton>
            </div>

            <AnriDialog v-model="showDialog" max-width="lg">
                <div class="px-6 pt-6">
                    <h3 class="text-xl font-bold">对话框</h3>
                    <p class="mt-2 text-on-background/60">
                        组件包含焦点陷阱，并支持 Esc 和点击遮罩关闭。
                    </p>
                </div>
                <template #footer="{ close }">
                    <AnriButton variant="soft" @click="close">
                        取消
                    </AnriButton>
                    <AnriButton @click="close">确认</AnriButton>
                </template>
            </AnriDialog>

            <AnriDrawer v-model:show="showDrawer" title="Drawer">
                <div class="space-y-3">
                    <p class="text-sm text-on-background/60">
                        从底部滑入的抽屉，不依赖特定屏幕断点。
                    </p>
                    <AnriButton block @click="showDrawer = false">
                        关闭
                    </AnriButton>
                </div>
            </AnriDrawer>
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">
                Pagination / Load more
            </h2>
            <div class="mt-4 space-y-3">
                <AnriPagination
                    :current-page="page"
                    :total-pages="8"
                    @page-change="page = $event"
                />
                <AnriLoadMore
                    :has-more="hasMore"
                    :loading="loading"
                    @load-more="toggleMore"
                />
            </div>
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">
                Image / Lightbox
            </h2>
            <div class="mt-4 flex flex-wrap items-center gap-4">
                <div class="h-24 w-24 overflow-hidden rounded-xl">
                    <AnriImage :src="imageUrl" alt="avatar" />
                </div>
                <AnriButton @click="openViewer(0, [imageUrl])">
                    打开图片查看器
                </AnriButton>
            </div>
            <AnriLightbox />
        </section>

        <section>
            <h2 class="text-2xl font-bold text-on-background">Prev / Next</h2>
            <div class="mt-4">
                <AnriPrevNextNav
                    :prev="{ to: '/a', title: 'Page A' }"
                    :next="{ to: '/b', title: 'Page B' }"
                />
            </div>
        </section>
    </div>
</template>
