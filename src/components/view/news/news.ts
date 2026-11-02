import type { Article } from '../../../types/api.types';
import './news.css';

class News {
    draw(data: Article[]): void {
        const news = data.slice(0, 10);
        const fragment = document.createDocumentFragment();

        const newsItemTemp = document.querySelector('#newsItemTemp');
        const newsContainer = document.querySelector('.news');

        if (!(newsItemTemp instanceof HTMLTemplateElement) || !newsContainer) {
            throw new Error('News template or container was not found');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true);

            if (!(newsClone instanceof DocumentFragment)) {
                throw new Error('Expected a news template fragment');
            }

            const newsItem = newsClone.querySelector('.news__item');
            const photo = newsClone.querySelector('.news__meta-photo');
            const author = newsClone.querySelector('.news__meta-author');
            const date = newsClone.querySelector('.news__meta-date');
            const title = newsClone.querySelector('.news__description-title');
            const source = newsClone.querySelector('.news__description-source');
            const content = newsClone.querySelector('.news__description-content');
            const readMore = newsClone.querySelector('.news__read-more a');

            if (
                !newsItem ||
                !(photo instanceof HTMLElement) ||
                !author ||
                !date ||
                !title ||
                !source ||
                !content ||
                !readMore
            ) {
                throw new Error('News template elements were not found');
            }

            if (idx % 2) newsItem.classList.add('alt');

            photo.style.backgroundImage = `url(${item.urlToImage || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22500%22%3E%3Cpath fill=%22%23243244%22 d=%22M0 0h800v500H0z%22/%3E%3C/svg%3E'})`;
            author.textContent = item.author || item.source.name;
            date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            title.textContent = item.title;
            source.textContent = item.source.name;
            content.textContent = item.description;
            readMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
