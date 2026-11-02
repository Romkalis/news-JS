import { isSource } from '../../../utils/apiGuards';
import type { Source } from '../../../types/api.types';
import './sources.css';

class Sources {
    draw(data: Source[]): void {
        if (!data.every((el) => isSource(el))) {
            console.warn('Data is not a Source array', data);
            return;
        }
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        const sourcesContainer = document.querySelector('.sources');

        if (!sourceItemTemp || !(sourceItemTemp instanceof HTMLTemplateElement) || !sourcesContainer) {
            console.warn('Source item template not found');
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);

            if (!(sourceClone instanceof DocumentFragment)) {
                throw new Error('Expected a source template fragment');
            }

            const sourceName = sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');

            if (!sourceName || !sourceItem) {
                throw new Error('Source template elements were not found');
            }

            sourceName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        sourcesContainer.append(fragment);
    }
}

export default Sources;
