import DropDown, { createChoice } from "./DropDown.mjs";
import QuestionAPI from "../../question/client/question.api.mjs";

export default class VariableInput extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "Choose Variable";
        this.toggle.classList.add("drop-down__toggle--default");

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
        const event = new CustomEvent("createBlock", {
            detail: {
                blockType: "Variable",
                variableName: variableName
            }
        });

        field.dispatchEvent(event);
    })
    
    return choice;
}