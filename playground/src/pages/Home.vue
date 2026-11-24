<script setup lang="ts">
import { ref } from "vue";
import {
    AnriAlert,
    AnriButton,
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
    AnriSelect,
    AnriSelector,
    AnriSpinner,
    AnriThemeToggle,
    AnriTooltip,
    useImageViewer,
} from "anri-ui";

const query = ref("");
const category = ref("all");
const selected = ref("one");
const selectValue = ref("zh");
const page = ref(2);
const showDialog = ref(false);
const showDrawer = ref(false);
const dropdownOpen = ref(false);
const isDark = ref(false);
const locale = ref("zh");
const loading = ref(false);
const hasMore = ref(true);

const { openViewer } = useImageViewer();

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
    <div class="space-y-10">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-extrabold text-primary">
                    Anri UI Playground
                </h1>
                <p class="mt-1 text-sm text-on-background/60">
                    Vue 3 与 Tailwind CSS 4 示例。
                </p>
            </div>
            <div class="flex items-center gap-2">
                <AnriLocaleSelect v-model="locale" :locales="locales" />
                <AnriThemeToggle :is-dark="isDark" @toggle="toggleTheme" />
            </div>
        </header>

        <section>
            <h2 class="mb-3 text-lg font-bold">Buttons</h2>
            <div class="flex flex-wrap items-center gap-3">
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
            <h2 class="mb-3 text-lg font-bold">Input / Selector</h2>
            <div class="max-w-md space-y-3">
                <AnriInput
                    v-model="query"
                    search
                    allow-clear
                    placeholder="搜索内容..."
                />
                <AnriInput placeholder="禁用状态" disabled />
            </div>
            <div class="mt-4">
                <AnriSelector v-model="category" :options="categories" />
            </div>
        </section>

        <section>
            <h2 class="mb-3 text-lg font-bold">Alerts</h2>
            <div class="space-y-3">
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
            <h2 class="mb-3 text-lg font-bold">Overlays</h2>
            <div class="flex flex-wrap gap-3">
                <AnriButton @click="showDialog = true">打开对话框</AnriButton>
                <AnriButton variant="soft" @click="showDrawer = true">
                    打开抽屉
                </AnriButton>
            </div>

            <AnriDialog v-model="showDialog" max-width="lg">
                <div class="p-8">
                    <h3 class="text-xl font-bold">对话框</h3>
                    <p class="mt-2 text-on-background/60">
                        组件包含焦点陷阱，并支持 Esc 和点击遮罩关闭。
                    </p>
                    <AnriButton class="mt-6" @click="showDialog = false">
                        关闭
                    </AnriButton>
                </div>
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
            <h2 class="mb-3 text-lg font-bold">Dropdown / Select</h2>
            <div class="flex flex-wrap items-center gap-4">
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
            <h2 class="mb-3 text-lg font-bold">Pagination / Load more</h2>
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
        </section>

        <section>
            <h2 class="mb-3 text-lg font-bold">Feedback</h2>
            <div class="flex flex-wrap items-center gap-6">
                <AnriSpinner />
                <AnriSpinner size="sm" color="secondary" />
                <AnriSpinner size="lg" color="current" />
                <AnriTooltip content="浮动提示">
                    <AnriButton variant="ghost">悬停查看</AnriButton>
                </AnriTooltip>
            </div>
        </section>

        <section>
            <h2 class="mb-3 text-lg font-bold">Image / Lightbox</h2>
            <div class="flex flex-wrap items-center gap-4">
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
            <h2 class="mb-3 text-lg font-bold">Prev / Next</h2>
            <AnriPrevNextNav
                :prev="{ to: '/a', title: 'Page A' }"
                :next="{ to: '/b', title: 'Page B' }"
            />
        </section>
    </div>
</template>
