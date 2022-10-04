import SectionDropZone from "./SectionDropZone.js";

export default class Section {

    createElement() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="Section" draggable="true">
            <div class="Section-area">
                <div class="Section-heading">
                    <div class="Section-title">Step #</div>
                    <button class="Section-delete">Delete</button>
                </div>
                <div class="FunctionsShelf"></div>
            </div>
        </div>
        `).children[0];
    }

    constructor(parent, content="") {
        this.parent = parent;
        this.sectionElement = this.createElement();
        this.titleElement = this.sectionElement.querySelector(".Section-title");
        this.functionsShelfElement = this.sectionElement.querySelector(".FunctionsShelf");
        this.dropZone = SectionDropZone.init();

        this.sectionElement.appendChild(this.dropZone);

        this.content = content;

        this.functionsShelfElement.innerHTML = content;

        const button = this.sectionElement.querySelector(".Section-delete");
            
        button.addEventListener("click", () => {
            this.parent.deleteSection(this.getIndex());
        })
    }

    init() {
        this.updateTitle();
    }

    updateTitle() {
        const index = this.getIndex();
        if (index == 0) {
            this.titleElement.textContent = "Prompt";
        } else {
            this.titleElement.textContent = `Step ${index}`;
        }
    }

    getIndex() {
        return this.parent.sections.indexOf(this);
    }
}