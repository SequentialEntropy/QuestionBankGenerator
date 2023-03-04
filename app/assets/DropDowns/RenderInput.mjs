import DropDown, { createChoice } from "./DropDown.mjs";
// import QuestionAPI from "../../question/client/question.api.mjs";
// import { createVariableChoice } from "./VariableInput.mjs";
import { blockTypes } from "../Blocks/Block.routes.mjs";

export default class RenderInput extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "Add Render";
        this.toggle.classList.add("dropDown-toggle__default");

        for (const [operationName, _] of Object.entries(blockTypes.Operation)) {
            this.list.appendChild(createRenderChoice(operationName));
        }

        // this.toggle.addEventListener("click", async () => {

        //     this.list.textContent = "";

        //     this.list.appendChild(createNumberChoice());

        //     const variables = await QuestionAPI.getVariables();

        //     variables.forEach(v => {
        //         this.list.appendChild(createVariableChoice(v));
        //     });

        //     for (const [operationName, _] of Object.entries(blockTypes.Operation)) {
        //         this.list.appendChild(createOperationChoice(operationName));
        //     }
        // })
    }
}

function createRenderChoice(operationName) {
    const choice = createChoice(operationName);
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