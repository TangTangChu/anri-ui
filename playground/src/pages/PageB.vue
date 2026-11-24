<template>
    <div class="space-y-4">
        <h1 class="text-2xl font-extrabold text-primary">Page B</h1>
        <p class="text-on-background/60">
            用于 AnriButton 与 AnriPrevNextNav 的路由目标。
        </p>
        <AnriButton to="/">返回首页</AnriButton>
    </div>
</template>

<script setup lang="ts">
import { AnriButton } from "anri-ui";
</script>
