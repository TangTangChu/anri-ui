<template>
    <main class="mx-auto w-full max-w-3xl space-y-8 px-4 py-10">
        <header>
            <h1 class="text-3xl font-extrabold text-primary">
                anri-ui + Nuxt
            </h1>

        </header>

        <div class="flex flex-wrap items-center gap-3">
            <AnriButton>主要按钮</AnriButton>
            <AnriButton variant="soft">柔和按钮</AnriButton>
            <AnriButton variant="outline" to="/">RouterLink</AnriButton>
            <AnriButton loading>加载中</AnriButton>
        </div>

        <AnriInput
            v-model="query"
            search
            allow-clear
            placeholder="Search something..."
        />

        <AnriAlert type="info">AnriAlert</AnriAlert>

        <AnriPagination :current-page="1" :total-pages="5" />

        <!-- 验证 Nuxt plugin 已注入 image viewer 状态 -->
        <AnriLightbox />
    </main>
</template>

<script setup lang="ts">
const query = ref("");
</script>
