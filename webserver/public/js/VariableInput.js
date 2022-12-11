import DropDown from "./DropDown.js";
import QuestionAPI from "./QuestionAPI.js";
import { CreateVariableBlock } from "./OperationBlocks/ModifyBlock.js";

export default class VariableInput extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "Choose Variable";

        this.toggle.addEventListener("click", async () => {
            this.list.textContent = "";

            const variables = await QuestionAPI.getVariables();

            variables.forEach(v => {
                this.list.appendChild(VariableInput.variableChoice(v, this.toggle));
            });
        })
    }
    static variableChoice(v, toggle) {
        const choice = document.createElement("button");
        choice.classList.add("dropDown-choice");
        choice.classList.add("block__variable");

        choice.textContent = v;

        choice.addEventListener("click", () => {
            const newBlock = CreateVariableBlock(v);

            const field = choice.closest(".Block-field");
            const event = new CustomEvent("select-variable", {
                detail: newBlock
            });

            field.dispatchEvent(event);
        });

        return choice;
    }
}