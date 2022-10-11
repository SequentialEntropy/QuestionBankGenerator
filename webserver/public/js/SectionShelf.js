import QuestionAPI from "./QuestionAPI.js";
import Section from "./Section.js";

export default class SectionShelf {

    createRoot() {
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

    constructor() {
        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".SectionsShelf");
        this.createButton = this.root.querySelector(".SectionsShelf-createSection");
        this.createButton.addEventListener("click", async () => {
            const section = await Section.init({});
        })
        document.body.appendChild(this.root);
    }

    static async init() {

        const init = new SectionShelf();
        
        const promptData = await QuestionAPI.getPrompt();
        const stepsData = await QuestionAPI.getSteps();

        stepsData.forEach(data => {
            init.renderSection(data);
        });

        return init;

    }

    async renderSection(data) {
        const section = await Section.init(this.shelf);
    }
}