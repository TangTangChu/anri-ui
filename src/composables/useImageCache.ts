import { reactive } from "vue";

type ImageState = "loading" | "loaded" | "error";

interface ImageCacheEntry {
    status: ImageState;
    updatedAt: number;
}

/** 条目上限：超出后按“最久未使用”淘汰，避免长会话中注册表持续增长。 */
const MAX_ENTRIES = 400;
/** 错误态有效期：过期后视作未知，允许重新请求，避免一次失败就永久黑图 */
export const IMAGE_ERROR_TTL = 5 * 60 * 1000;

const imageRegistry = reactive<Record<string, ImageCacheEntry>>({});
/** 访问顺序表（最久未使用在最前），非响应式，只服务淘汰逻辑，不参与渲染依赖 */
const accessOrder: string[] = [];

/**
 * 统一 key：解析为绝对地址并升级到 https，
 * 使「原始 props.src（可能为相对路径）」与「DOM 中 img.src（绝对地址）」命中同一条目。
 */
const resolveKey = (src?: string): string => {
    if (!src) return "";
    let url = src;
    if (typeof window !== "undefined") {
        try {
            url = new URL(src, window.location.href).href;
        } catch {
            url = src;
        }
    }
    return url.replace(/^http:\/\//i, "https://");
};

const touch = (key: string) => {
    const index = accessOrder.indexOf(key);
    if (index !== -1) accessOrder.splice(index, 1);
    accessOrder.push(key);
};

const evictIfNeeded = () => {
    while (accessOrder.length > MAX_ENTRIES) {
        const oldest = accessOrder.shift();
        if (oldest) delete imageRegistry[oldest];
    }
};

const forget = (key: string) => {
    delete imageRegistry[key];
    const index = accessOrder.indexOf(key);
    if (index !== -1) accessOrder.splice(index, 1);
};

const isExpired = (entry: ImageCacheEntry) =>
    entry.status === "error" && Date.now() - entry.updatedAt > IMAGE_ERROR_TTL;

export const useImageCache = () => {
    const getStatus = (src?: string): ImageState | undefined => {
        if (typeof window === "undefined") return undefined;
        const key = resolveKey(src);
        if (!key) return undefined;

        const entry = imageRegistry[key];
        if (!entry) return undefined;
        // 过期条目按不存在处理，但不在此处删除；读取状态时可能仍处于响应式依赖收集阶段。
        if (isExpired(entry)) return undefined;

        touch(key);
        return entry.status;
    };

    const setStatus = (src: string, status: ImageState) => {
        if (typeof window === "undefined") return;
        const key = resolveKey(src);
        if (!key) return;

        const current = imageRegistry[key];
        // 同一状态重复上报时不重写，以减少无意义的响应式触发；
        // error 例外，重新失败时需要刷新时间戳，使 TTL 重新计时。
        if (current?.status === status && status !== "error") {
            touch(key);
            return;
        }

        imageRegistry[key] = { status, updatedAt: Date.now() };
        touch(key);
        evictIfNeeded();
    };

    /** 主动丢弃一条记录，下次读取会回到未知状态 */
    const invalidate = (src?: string) => {
        if (typeof window === "undefined") return;
        const key = resolveKey(src);
        if (key) forget(key);
    };

    const isLoaded = (src?: string) => getStatus(src) === "loaded";
    const isLoading = (src?: string) => getStatus(src) === "loading";
    const isError = (src?: string) => getStatus(src) === "error";

    return {
        getStatus,
        setStatus,
        invalidate,
        isLoaded,
        isLoading,
        isError,
    };
};
