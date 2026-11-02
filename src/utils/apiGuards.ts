import type { Source, SourcesResponse, Article, ArticlesResponse, ArticleSource } from '../types/api.types';

function isRecord(val: unknown): val is Record<string, unknown> {
    return typeof val === 'object' && val !== null;
}

function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
    return Array.isArray(value) && value.every((item: unknown) => guard(item));
}

export function isSource(val: unknown): val is Source {
    return isRecord(val) && typeof val.id === 'string' && typeof val.name === 'string';
}

export function isSourcesResponse(val: unknown): val is SourcesResponse {
    return isRecord(val) && val.status === 'ok' && isArrayOf(val.sources, isSource);
}

function isArticleSource(val: unknown): val is ArticleSource {
    return isRecord(val) && (val.id === null || typeof val.id === 'string') && typeof val.name === 'string';
}

function isNullableString(val: unknown): val is string | null {
    return val === null || typeof val === 'string';
}
export function isArticle(data: unknown): data is Article {
    return (
        isRecord(data) &&
        isArticleSource(data.source) &&
        isNullableString(data.author) &&
        typeof data.title === 'string' &&
        isNullableString(data.description) &&
        typeof data.url === 'string' &&
        isNullableString(data.urlToImage) &&
        typeof data.publishedAt === 'string'
    );
}

export function isArticlesResponse(value: unknown): value is ArticlesResponse {
    return (
        isRecord(value) &&
        value.status === 'ok' &&
        typeof value.totalResults === 'number' &&
        isArrayOf(value.articles, isArticle)
    );
}
