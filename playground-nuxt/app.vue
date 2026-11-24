<script setup lang="ts">
import { provideAnriLabels } from "anri-ui";

provideAnriLabels({
    close: "关闭",
    loading: "加载中...",
    pagination: {
        nav: "分页导航",
        prev: "上一页",
        next: "下一页",
        page: (page) => `第 ${page} 页`,
    },
    loadMore: {
        loadMore: "加载更多",
        noMore: "没有更多啦~",
    },
    prevNext: {
        nav: "上下篇导航",
        prev: "上一篇",
        next: "下一篇",
    },
    lightbox: {
        prev: "上一张",
        next: "下一张",
        zoom: "滚轮缩放",
        pan: "滚轮上下滑动",
    },
    switchLanguage: "切换语言",
    toggleTheme: "切换主题",
});
</script>

<template>
    <div class="min-h-screen bg-background text-on-background">
        <NuxtPage />
    </div>
</template>
