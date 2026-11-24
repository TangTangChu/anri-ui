export interface AnriSelectOption {
    value: string | number;
    label: string;
    hint?: string;
    image?: string;
}

export interface AnriPrevNextTarget {
    to: string;
    title: string;
}

export interface AnriPaginationLabels {
    nav?: string;
    prev?: string;
    next?: string;
    page?: (page: number) => string;
}

export interface AnriLoadMoreLabels {
    loading?: string;
    loadMore?: string;
    noMore?: string;
}

export interface AnriPrevNextLabels {
    nav?: string;
    prev?: string;
    next?: string;
}

export interface AnriLocaleOption {
    code: string;
    name: string;
}

export interface AnriLightboxLabels {
    close?: string;
    prev?: string;
    next?: string;
    zoom?: string;
    pan?: string;
}

export interface AnriDialogLabels {
    close?: string;
}
