import Section from "./Section.js";

export default class SectionsShelf {

    createElement() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="SectionsEditor">
            <div class="SectionsShelf"></div>
            <div class="SectionsShelf-addArea Section-area">
                <button class="SectionsShelf-createSection">+ Create Step</button>
            </div>
        </div>
        `).children[0];
    }

    constructor(questionId) {
        this.questionId = questionId;

        this.shelfEditorElement = this.createElement();
        this.shelfElement = this.shelfEditorElement.querySelector(".SectionsShelf");
        this.sections = [];
        this.createSectionElement = this.shelfEditorElement.querySelector(".SectionsShelf-createSection");

        this.createSectionElement.addEventListener("click", async () => {
            this.renderSection();

            fetch(`/question/api/${await questionId}/createStep`);
        })

        document.body.appendChild(this.shelfEditorElement);
    }

    async init() {

        const prompt = (await fetch(`/question/api/${this.questionId}/getPrompt`)).json();
        const steps = (await fetch(`/question/api/${this.questionId}/getSteps`)).json();

        const promptSection = this.renderSection(await prompt);
        promptSection.sectionElement.draggable = false;
        promptSection.sectionElement.querySelector(".Section-delete").remove();

        for (let step = 0; step < (await steps).length; step++) {
            this.renderSection((await steps)[step]);
        }

        return this;
    }

    updateSectionTitles(start = 1) {
        for (let index = start; index < this.sections.length; index++) {
            this.sections[index].updateTitle();
        }
    }

    renderSection(content = {}) {
        let newSection = new Section(this, content);
        this.sections.push(newSection);
        newSection.init();
        this.shelfElement.appendChild(newSection.sectionElement);
        return newSection;
    }

    deleteSection(index) {
        this.sections[index].sectionElement.remove();
        this.sections.splice(index, 1);
        this.updateSectionTitles(index);

        fetch(`/question/api/${this.questionId}/deleteStep/${index - 1}`);
    }
}