export interface Source {
    id: string;
    name: string;
}
export interface SourceResponce {
    status: 'ok';
    sources: Source[];
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}

export interface ArticleResponce {
    status: 'ok';
    totalResults: number;
    articles: Article[];
}
