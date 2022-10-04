import Section from "./Section.js";

export default class SectionsShelf {
    createElement() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="SectionsEditor">
            <div class="SectionsShelf"></div>
            <div class="SectionsShelf-addArea Section-area">
                <button class="SectionsShelf-add">+ Add Step</button>
            </div>
        </div>
        `).children[0];
    }

    constructor(questionId) {
        this.shelfEditorElement = this.createElement();
        this.shelfElement = this.shelfEditorElement.querySelector(".SectionsShelf");
        this.sections = [];
        this.addElement = this.shelfEditorElement.querySelector(".SectionsShelf-add");

        document.body.appendChild(this.shelfEditorElement);
    }

    static async init(questionId) {
        console.log("Init Called, " + questionId);
        const newShelf = new SectionsShelf(await questionId);

        const prompt = (await fetch(`/question/api/${await questionId}/getPrompt`)).json();
        const steps = (await fetch(`/question/api/${await questionId}/getSteps`)).json();

        let newSection = await Section.init(newShelf, await prompt);
        newShelf.sections.push(newSection);
        newSection.updateTitle();
        newShelf.shelfElement.appendChild(newSection.sectionElement);

        for (let step = 0; step < (await steps).length; step++) {

            let newSection = await Section.init(newShelf, (await steps)[step]);
            newShelf.sections.push(newSection);
            newSection.updateTitle();
            newShelf.shelfElement.appendChild(newSection.sectionElement);
        }

        return newShelf;
    }
}