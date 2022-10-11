export default class SectionDropZone {
    static init() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
        <div class="SectionDropZone">
        </div>
        `).children[0];

		dropZone.addEventListener("dragover", e => {
			e.preventDefault();
			dropZone.classList.add("SectionDropZone__active");
		});

		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("SectionDropZone__active");
		});

        dropZone.addEventListener("drop", () => {
			dropZone.classList.remove("SectionDropZone__active");
		});

        return dropZone;
    }
}