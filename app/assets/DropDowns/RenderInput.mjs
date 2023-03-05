import DropDown, { createChoice } from "./DropDown.mjs";
import { blockTypes } from "../Blocks/Block.routes.mjs";

export default class RenderInput extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "Add Render";
        this.toggle.classList.add("drop-down__toggle--default");

        this.list.appendChild(createTextChoice());

        this.list.appendChild(createEvaluateChoice());

        for (const [operationName, _] of Object.entries(blockTypes.Operation)) {
            this.list.appendChild(createRenderChoice(operationName));
        }
    }
}

function createTextChoice() {
    const choice = createChoice("Text");
    choice.classList.add("theme__color--white");

    choice.addEventListener("click", () => {
        const field = choice.closest(".block__field");
        const event = new CustomEvent("createBlock", {
            detail: {
                blockType: "Text",
                value: null
            }
        });

        field.dispatchEvent(event);
    })

    return choice;
}

function createEvaluateChoice() {
    const choice = createChoice("Evaluate");
    choice.classList.add("theme__color--operation");

    choice.addEventListener("click", () => {
        const field = choice.closest(".block__field");
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
    choice.classList.add("theme__color--render");

    choice.addEventListener("click", () => {
        const field = choice.closest(".block__field");
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