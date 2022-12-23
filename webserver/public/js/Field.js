import VariableInput from "./DropDowns/VariableInput.js";
import OperationInput from "./DropDowns/OperationInput.js";
import { CreateNumberBlock, CreateVariableBlock, CreateOperationBlock } from "./Blocks/ModifyBlock.js";

class VariableField {
    createInput() {
        return new VariableInput();
    }
    constructor() {
        this.root = document.createElement("div");
        this.root.classList.add("Block-field");
        
        this.input = this.createInput().root;
        this.root.appendChild(this.input);

        this.root.addEventListener("select-number", e => {
            const value = e.detail;

            const newBlock = CreateNumberBlock(value);

            this.input.classList.add("hidden");

            this.root.appendChild(newBlock.root);
        })

        this.root.addEventListener("select-variable", e => {
            const variableName = e.detail;
            const newBlock = CreateVariableBlock(variableName);

            this.input.classList.add("hidden");
        
            this.root.appendChild(newBlock.root);
        })

        this.root.addEventListener("select-operation", e => {
            const operationType = e.detail;

            const newBlock = CreateOperationBlock(operationType);

            this.input.classList.add("hidden");

            this.root.appendChild(newBlock.root);
        })

        this.root.addEventListener("delete", e => {
            this.root.removeChild(this.root.querySelector(".Block"));

            this.input.classList.remove("hidden");
        })
    }
}

class OperationField extends VariableField {
    createInput() {
        return new OperationInput();
    }
    constructor() {
        super();
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