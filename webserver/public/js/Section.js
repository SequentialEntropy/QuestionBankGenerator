import SectionDropZone from "./SectionDropZone.js";

export default class Section {
    createElement() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="Section">
            <div class="Section-area">
                <div class="Section-title">Step #</div>
                <div class="FunctionsShelf"></div>
            </div>
        </div>
        `).children[0];
    }

    constructor(parent) {
        this.parent = parent;
        this.sectionElement = this.createElement();
        this.titleElement = this.sectionElement.querySelector(".Section-title");
        this.functionsShelfElement = this.sectionElement.querySelector(".FunctionsShelf");
        this.dropZone = SectionDropZone.init();
        this.sectionElement.appendChild(this.dropZone);
    }

    static async init(parent, content="") {
        const newSection = new Section(parent);

        newSection.functionsShelfElement.innerHTML = content;

        return newSection;
    }

    updateTitle() {
        const index = this.parent.sections.indexOf(this);
        if (index == 0) {
            this.titleElement.textContent = "Prompt";
        } else {
            this.titleElement.textContent = `Step ${index}`;
        }
    }
}