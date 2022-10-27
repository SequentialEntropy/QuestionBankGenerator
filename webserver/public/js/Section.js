import QuestionAPI from "./QuestionAPI.js";
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
            <!--
            <div class="SectionDropZone"></div>
            -->
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
    static async init(parent, content="", animate=false) {
        const newSection = new Section();

        const parentLength = Array.from(parent.querySelectorAll(".Section")).length;

        if (parentLength == 0) {
            newSection.title.textContent = "Prompt";
            newSection.root.querySelector(".Section-delete").remove();
            newSection.root.draggable = false;
        } else {
            newSection.title.textContent = `Step ${parentLength}`;
            newSection.root.querySelector(".Section-delete").addEventListener("click", async () => {
                if (!confirm(`Are you sure you want to delete Step ${parentLength}?`)) {
                    return;
                }
                await QuestionAPI.deleteStep(newSection.getIndex() - 1);
                newSection.deleteAnimation();
            })
            newSection.root.addEventListener("dragstart", e => {
                const data = {
                    type: "Section",
                    id: newSection.getIndex() - 1
                };
                e.dataTransfer.setData("text/plain", JSON.stringify(data));
            })
        }

        newSection.shelf.innerHTML = JSON.stringify(content, null, 4) || content;

        if (animate) {
            newSection.createAnimation(parent);
        } else {
            parent.appendChild(newSection.root);
        }

        return newSection;
    }

    getIndex() {
        const items = Array.from(this.root.parentElement.querySelectorAll(".Section"));
        return items.indexOf(this.root);
    }

    updateIndexes(start = 1, parent = false) {
        if (parent === false) {
            parent = this.root.parentElement;
        }
        const items = Array.from(parent.querySelectorAll(".Section"));
        let title;
        for (let index = start; index < items.length; index++) {
            title = items[index].querySelector(".Section-title");
            title.textContent = `Step ${index}`;
        }
    }

    createAnimation(parent) {
        const onEnd = function(e) {
            if (
                e.target.classList.contains("Section__transition")
            ) {
                e.target.removeEventListener("transitionend", onEnd);
                e.target.style.removeProperty("height");
                e.target.classList.remove("Section__transition");
            }
        }

        this.root.style.height = "0px";
        parent.appendChild(this.root);
        let height = this.root.scrollHeight;
        this.root.style.height = height + "px";
        this.root.classList.add("Section__transition");
        this.root.addEventListener("transitionend", onEnd);
    }

    deleteAnimation() {
        const height = this.root.scrollHeight;
        const transition = this.root.style.transition;

        this.root.style.transition = '';

        requestAnimationFrame(() => {
            this.root.style.height = height + 'px';
            this.root.style.transition = transition;
            requestAnimationFrame(() => {
                this.root.style.height = 0 + 'px';
            });
        });

        this.root.classList.add("Section__transition");

        const onEnd = (e) => {
            if (
                this.root.classList.contains("Section__transition") &&
                e.propertyName == "height"
            ) {
                const parent = this.root.parentElement;
                const index = this.getIndex();
                this.root.remove();
                this.updateIndexes(index, parent);
            }
        }

        this.root.addEventListener('transitionend', onEnd);
    }
}