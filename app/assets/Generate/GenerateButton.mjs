import { ButtonSection } from "../Sections/Section.mjs";

export default class GenerateButton extends ButtonSection {
    constructor() {
        super();
        this.button.classList.add("theme__color--operation");
        this.button.textContent = "Generate Questions";
    }
}