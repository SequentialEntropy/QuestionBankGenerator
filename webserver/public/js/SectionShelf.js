import QuestionAPI from "./QuestionAPI.js";
import { PromptSection, StepSection } from "./Section.js";

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

    constructor(promptData, stepsData) {
        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".SectionsShelf");
        this.createSectionButton = this.root.querySelector(".SectionsShelf-createSection");

        // Create Step
        this.createSectionButton.addEventListener("click", e => {
            this.createStep();
        })

        // Delete Step
        this.shelf.addEventListener("deleteSection", e => {
            const selectedSection = e.detail;
            this.deleteStep(selectedSection);
        })

        const promptElement = new PromptSection(promptData);
        this.shelf.appendChild(promptElement.root);

        for (let index = 0; index < stepsData.length; index++) {
            const stepElement = new StepSection(stepsData[index]);

            stepElement.title.textContent = `Step ${index + 1}`;

            this.shelf.appendChild(stepElement.root);
        }
    }

    createStep(content=[]) {
        QuestionAPI.createStep();

        const newSection = new StepSection(content);

        // Update Step #

        const sections = Array.from(this.shelf.querySelectorAll(".Section"));

        const sectionIndex = sections.length;

        newSection.title.textContent = `Step ${sectionIndex}`;

        const selectedSection = newSection.root;

        // Create Animation

        selectedSection.style.height = "0px";

        this.shelf.appendChild(selectedSection);

        let height = selectedSection.scrollHeight;
        selectedSection.style.height = height + "px";
        selectedSection.classList.add("Section__transition");
        
        // After Create Animation

        const onCreateAnimationEnd = function(e) {
            if (
                e.target.classList.contains("Section__transition")
            ) {
                e.target.removeEventListener("transitionend", onCreateAnimationEnd);
                e.target.style.removeProperty("height");
                e.target.classList.remove("Section__transition");
            }
        }

        selectedSection.addEventListener("transitionend", onCreateAnimationEnd);
    }

    deleteStep(selectedSection) {
        const sections = Array.from(this.shelf.querySelectorAll(".Section"));

        const sectionIndex = sections.indexOf(selectedSection);

        QuestionAPI.deleteStep(sectionIndex - 1);
        
        // Delete Animation

        const height = selectedSection.scrollHeight;
        const transition = selectedSection.style.transition;

        selectedSection.style.transition = "";

        requestAnimationFrame(() => {
            selectedSection.style.height = height + "px";
            selectedSection.style.transition = transition;

            requestAnimationFrame(() => {
                selectedSection.style.height = 0 + "px";
            });
        });

        selectedSection.classList.add("Section__transition");

        // After Delete Animation

        const onDeleteAnimationEnd = e => {
            if (
                selectedSection.classList.contains("Section__transition") &&
                e.propertyName == "height"
            ) {
                this.shelf.removeChild(selectedSection);

                // Update Step #

                for (let index = sectionIndex; index < sections.length; index++) {
                    const title = sections[index].querySelector(".Section-title");
                    title.textContent = `Step ${index - 1}`;
                }
            }
        }

        selectedSection.addEventListener("transitionend", onDeleteAnimationEnd);
    }
}