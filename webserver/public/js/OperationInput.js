import DropDown from "./DropDown.js";
import QuestionAPI from "./QuestionAPI.js";
import VariableInput from "./VariableInput.js";
import { CreateBlock, operationTypes } from "./OperationBlocks/ModifyBlock.js";

export default class OperationInput extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "Add Block";

        this.toggle.addEventListener("click", async () => {

            this.list.textContent = "";

            this.list.appendChild(OperationInput.numberChoice(this.toggle));

            const variables = await QuestionAPI.getVariables();

            variables.forEach(v => {
                this.list.appendChild(VariableInput.variableChoice(v, this.toggle));
            });

            for (const [key, value] of Object.entries(operationTypes)) {
                this.list.appendChild(OperationInput.operationChoice(key, this.toggle));
            }
        })
    }
    static numberChoice(toggle) {
        const choice = document.createElement("button");
        choice.classList.add("dropDown-choice");

        choice.textContent = "Number";

        choice.addEventListener("click", () => {
            toggle.textContent = "Number";

            const field = choice.closest(".Block-field");
            const event = new Event("select-number");

            field.dispatchEvent(event);
        });

        return choice;
    }
    static operationChoice(operationType, toggle) {
        const choice = document.createElement("button");
        choice.classList.add("dropDown-choice");
        choice.classList.add("block__operation");

        choice.textContent = operationType;

        choice.addEventListener("click", () => {
            toggle.textContent = operationType;

            const newBlock = CreateBlock(operationType);

            const field = choice.closest(".Block-field");
            const event = new CustomEvent("select-operation", {
                detail: newBlock
            });

            field.dispatchEvent(event);
        })

        return choice;
    }
}