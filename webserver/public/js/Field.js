import VariableInput from "./DropDowns/VariableInput.js";
import OperationInput from "./DropDowns/OperationInput.js";
import { createBlock } from "./Blocks/ModifyBlock.js";

class VariableField {
    createInput() {
        return new VariableInput();
    }
    constructor() {
        this.root = document.createElement("div");
        this.root.classList.add("Block-field");
        
        this.input = this.createInput().root;
        this.root.appendChild(this.input);

        this.root.addEventListener("createBlock", e => {
            this.initialiseField(e.detail);
        })

        this.root.addEventListener("deleteBlock", e => {
            this.root.removeChild(this.root.querySelector(".Block"));

            this.input.classList.remove("hidden");
        })
    }
    initialiseField(data) {
        if (!this.getAvailableBlockTypes().includes(data.blockType)) {
            return;
        }

        const newBlock = createBlock(data);

        this.input.classList.add("hidden");

        this.root.appendChild(newBlock.root);
    }
    getAvailableBlockTypes() {
        return [
            "Variable"
        ];
    }
}

class OperationField extends VariableField {
    createInput() {
        return new OperationInput();
    }
    constructor() {
        super();
    }
    getAvailableBlockTypes() {
        return [
            "Number",
            "Variable",
            "Operation"
        ]
    }
}

class Prompt {
    constructor(text) {
        this.root = document.createElement("div");
        this.root.classList.add("Block-prompt");
        this.root.textContent = text;
    }
}

export { VariableField, OperationField, Prompt };