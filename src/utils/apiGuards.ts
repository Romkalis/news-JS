import type { Source, SourceResponce, Article, ArticleResponce, ArticleSource } from '../types/api.types';

function isRecord(val: unknown): val is Record<string, unknown> {
    return typeof val === 'object' && val !== null;
}

export function isSource(val: unknown): val is Source {
    return isRecord(val) && typeof val.id === 'string' && typeof val.name === 'string';
}

export function isSourcesResponse(val: unknown): val is SourceResponce {
    return isRecord(val) && val.status === 'ok' && Array.isArray(val.sources) && val.sources.every(isSource);
}
export function isSourceResponce(val: unknown): val is SourceResponce {
    return isRecord(val) && val.status === 'ok' && Array.isArray(val.sources) && val.sources.every(isSource);
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

export function isArticlesResponse(value: unknown): value is ArticleResponce {
    return (
        isRecord(value) &&
        value.status === 'ok' &&
        typeof value.totalResults === 'number' &&
        Array.isArray(value.articles) &&
        value.articles.every(isArticle)
    );
}
