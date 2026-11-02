import { isSourcesResponse, isArticlesResponse } from '../../utils/apiGuards';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: unknown): void {
        if (isArticlesResponse(data)) {
            const values = data?.articles ? data?.articles : [];
            this.news.draw(values);
            return;
        }
        console.warn('Data is not an ArticlesResponse', data);
    }

    drawSources(data: unknown): void {
        if (isSourcesResponse(data)) {
            const values = data?.sources ? data?.sources : [];
            this.sources.draw(values);
            return;
        }
        console.warn('Data is not a SourcesResponse', data);
    }
}

export default AppView;
