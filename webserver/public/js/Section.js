import SectionDropZone from "./SectionDropZone.js";

export default class Section {
    createRoot() {
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
    constructor() {
        this.root = this.createRoot();
        this.section = this.root.querySelector(".Section-area");
        this.title = this.root.querySelector(".Section-title");
        this.shelf = this.root.querySelector(".FunctionsShelf");

        this.dropZone = SectionDropZone.init();
        this.root.appendChild(this.dropZone);
    }
    static async init(parent, content="") {
        const newSection = new Section();
        parent.appendChild(newSection.root);
        console.log(newSection.getIndex());
        if (newSection.getIndex() == 0) {
            newSection.title.textContent = "Prompt";
            newSection.root.querySelector(".Section-delete").remove();
            newSection.root.draggable = false;
        } else {
            newSection.title.textContent = `Step ${newSection.getIndex()}`;
        }
        newSection.shelf.innerHTML = content;
        return newSection;
    }

    getIndex() {
        const items = Array.from(this.root.parentElement.querySelectorAll(".Section"));
        return items.indexOf(this.root);
    }
}

function createAnimation(section) {
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
            section.root.classList.remove("Section__transition");
        }
    }

    section.sectionElement.addEventListener('transitionend', onEnd);
}

function deleteAnimation(section, callback = () => {}) {
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
            section.root.remove();
            callback();
        }
    }

    section.sectionElement.addEventListener('transitionend', onEnd);
}