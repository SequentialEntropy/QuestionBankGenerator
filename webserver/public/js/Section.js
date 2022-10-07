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

        createSection(this);

        const button = this.sectionElement.querySelector(".Section-delete");

        button.addEventListener("click", () => {
            deleteSection(this);
        })

        button.addEventListener("transitionend", e => {
            e.stopPropagation();
        })
    }

    init() {
        this.updateTitle();
        createSection(this);
    }

    create() {
        createSection(this);
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

function createSection(section) {
    const height = section.sectionElement.scrollHeight;

    section.sectionElement.style.height = height + 'px';

    section.sectionElement.classList.add("Section__transition");

    const onEnd = function(e) {
        if (
            section.sectionElement.classList.contains("Section__transition")
        ) {
            section.sectionElement.removeEventListener('transitionend', onEnd);
            console.log("Removing Property");
            section.sectionElement.style.removeProperty("height");
        }
    }

    section.sectionElement.addEventListener('transitionend', onEnd);
}

function deleteSection(section) {
    const height = section.sectionElement.scrollHeight;
    const transition = section.sectionElement.style.transition;

    section.sectionElement.style.transition = '';
    requestAnimationFrame(function() {
        section.sectionElement.style.height = height + 'px';
        section.sectionElement.style.transition = transition;
    
        requestAnimationFrame(function() {
            section.sectionElement.style.height = 0 + 'px';
        });
    });

    section.sectionElement.classList.add("Section__transition");

    const onEnd = (e) => {
        if (
            section.sectionElement.classList.contains("Section__transition")
        ) {
            section.parent.deleteSection(section.getIndex());
        }
    }

    section.sectionElement.addEventListener('transitionend', onEnd);
}