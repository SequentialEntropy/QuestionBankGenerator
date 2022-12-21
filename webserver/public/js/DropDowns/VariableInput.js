import DropDown, { createChoice } from "./DropDown.js";
import QuestionAPI from "../QuestionAPI.js";

export default class VariableInput extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "Choose Variable";
        this.toggle.classList.add("dropDown-toggle__default");

        this.toggle.addEventListener("click", async () => {
            this.list.textContent = "";

            const variables = await QuestionAPI.getVariables();

            variables.forEach(v => {
                this.list.appendChild(createVariableChoice(v, this.toggle));
            });
        })
    }
}

export function createVariableChoice(variableName) {
    const choice = createChoice(variableName);
    choice.classList.add("block__variable");
    choice.addEventListener("click", () => {
        const field = choice.closest(".Block-field");
        const event = new CustomEvent("select-variable", {
            detail: variableName
        });

        field.dispatchEvent(event);
    })
    
    return choice;
}