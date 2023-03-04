import DropDown, { createChoice } from "./DropDown.mjs";
import QuestionAPI from "../../question/client/question.api.mjs";
import { createVariableChoice } from "./VariableInput.mjs";
import { blockTypes } from "../Blocks/Block.routes.mjs";

export default class OperationInput extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "Add Operation";
        this.toggle.classList.add("dropDown-toggle__default");

        this.toggle.addEventListener("click", async () => {

            this.list.textContent = "";

            this.list.appendChild(createNumberChoice());

            const variables = await QuestionAPI.getVariables();

            variables.forEach(v => {
                this.list.appendChild(createVariableChoice(v));
            });

            for (const [operationName, _] of Object.entries(blockTypes.Operation)) {
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
                blockType: "Number",
                value: null
            }
        });

        field.dispatchEvent(event);
    })

    return choice;
}

function createOperationChoice(operationName) {
    const choice = createChoice(`${operationName} Operation`);
    choice.classList.add("block__operation");

    choice.addEventListener("click", () => {
        const field = choice.closest(".Block-field");
        const event = new CustomEvent("createBlock", {
            detail: {
                blockType: "Operation",
                operationName: operationName,
                fields: []
            }
        })

        field.dispatchEvent(event);
    })

    return choice;
}