import DropDown, { createChoice } from "./DropDown.mjs";
import { blockTypes } from "../Blocks/Block.routes.mjs";

export default class RenderInput extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "Add Render";
        this.toggle.classList.add("dropDown-toggle__default");

        this.list.appendChild(createEvaluateChoice());

        for (const [operationName, _] of Object.entries(blockTypes.Operation)) {
            this.list.appendChild(createRenderChoice(operationName));
        }
    }
}

function createEvaluateChoice() {
    const choice = createChoice("Evaluate");
    choice.classList.add("block__operation");

    choice.addEventListener("click", () => {
        const field = choice.closest(".Block-field");
        const event = new CustomEvent("createBlock", {
            detail: {
                blockType: "Evaluate",
                fields: []
            }
        })

        field.dispatchEvent(event);
    })

    return choice;
}

function createRenderChoice(operationName) {
    const choice = createChoice(`Render ${operationName}`);
    choice.classList.add("block__render");

    choice.addEventListener("click", () => {
        const field = choice.closest(".Block-field");
        const event = new CustomEvent("createBlock", {
            detail: {
                blockType: "Render",
                operationName: operationName,
                fields: []
            }
        })

        field.dispatchEvent(event);
    })

    return choice;
}