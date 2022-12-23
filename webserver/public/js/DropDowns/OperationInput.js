import DropDown, { createChoice } from "./DropDown.js";
import QuestionAPI from "../QuestionAPI.js";
import { createVariableChoice } from "./VariableInput.js";
import { operationTypes } from "../Blocks/ModifyBlock.js";

export default class OperationInput extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "Add Block";
        this.toggle.classList.add("dropDown-toggle__default");

        this.toggle.addEventListener("click", async () => {

            this.list.textContent = "";

            this.list.appendChild(createNumberChoice());

            const variables = await QuestionAPI.getVariables();

            variables.forEach(v => {
                this.list.appendChild(createVariableChoice(v));
            });

            for (const [operationName, _] of Object.entries(operationTypes)) {
                this.list.appendChild(createOperationChoice(operationName));
            }
        })
    }
}

function createNumberChoice() {
    const choice = createChoice("Number");
    choice.classList.add("block__default");

    choice.addEventListener("click", () => {
        const field = choice.closest(".Block-field");
        const event = new CustomEvent("createBlock", {
            detail: {
                blockType: "Number"
            }
        });

        field.dispatchEvent(event);
    })

    return choice;
}

function createOperationChoice(operationName) {
    const choice = createChoice(operationName);
    choice.classList.add("block__operation");

    choice.addEventListener("click", () => {
        const field = choice.closest(".Block-field");
        const event = new CustomEvent("createBlock", {
            detail: {
                blockType: "Operation",
                operationName: operationName
            }
        })

        field.dispatchEvent(event);
    })

    return choice;
}