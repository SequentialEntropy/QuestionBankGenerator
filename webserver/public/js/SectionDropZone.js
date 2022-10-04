export default class SectionDropZone {
    static init() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
        <div class="SectionDropZone">
        </div>
        `).children[0];

        return dropZone;
    }
}