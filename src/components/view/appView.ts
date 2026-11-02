import { isSourceResponce, isArticlesResponse } from '../../utils/apiGuards';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: unknown) {
        if (isArticlesResponse(data)) {
            const values = data?.articles ? data?.articles : [];
            this.news.draw(values);
        }
        console.warn('Data is not an ArticlesResponse', data);
    }

    drawSources(data: unknown): void {
        if (isSourceResponce(data)) {
            const values = data?.sources ? data?.sources : [];
            this.sources.draw(values);
        }
        console.warn('Data is not a SourceResponce', data);
    }
}

export default AppView;
