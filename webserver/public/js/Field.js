import VariableInput from "./DropDowns/VariableInput.js";
import OperationInput from "./DropDowns/OperationInput.js";
import { createBlock } from "./Blocks/ModifyBlock.js";
import QuestionAPI from "./QuestionAPI.js";

class VariableField {
    createInput() {
        return new VariableInput();
    }
    constructor() {
        this.root = document.createElement("div");
        this.root.classList.add("Block-field");
        
        this.input = this.createInput().root;
        this.root.appendChild(this.input);

        this.root.addEventListener("loadBlock", e => {
            this.initialiseField(e.detail);
        })
        
        this.root.addEventListener("createBlock", e => {
            this.initialiseField(e.detail);

            const address = this.getPath();

            QuestionAPI.createBlock(address, e.detail);
        })

        this.root.addEventListener("deleteBlock", e => {
            this.root.removeChild(this.root.querySelector(".Block"));

            this.input.classList.remove("hidden");

            const address = this.getPath();

            QuestionAPI.deleteBlock(address);
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
    getPath() {
        let parentBlock = this.root.closest(".Block");
        let currentField = this.root;
        let indexes = [];

        // Field # in Block

        while (parentBlock != null) {
            const shelf = parentBlock.querySelector(".Block-shelf");

            const fieldElements = Array.from(shelf.children)
            .filter(fieldElement => {
                return fieldElement.matches(".Block-field");
            })    
            
            indexes.unshift(fieldElements.indexOf(currentField));
            
            currentField = parentBlock.closest(".Block-field");

            parentBlock = currentField.closest(".Block");
        }

        // Field # in Function

        const parentFunction = currentField.closest(".Function");

        let shelf = parentFunction.querySelector(".Function-shelf");

        const fieldElements = Array.from(shelf.children)
        .filter(fieldElement => {
            return fieldElement.matches(".Block-field");
        })
        
        indexes.unshift(fieldElements.indexOf(currentField));

        // Function # in Sections

        const currentFunction = parentFunction;

        const parentSection = currentFunction.closest(".Section");

        shelf = parentSection.querySelector(".FunctionsShelf");

        const functionElements = Array.from(shelf.children)
        .filter(functionElement => {
            return functionElement.matches(".Function");
        })

        const functionIndex = functionElements.indexOf(currentFunction);

        // Section #

        const currentSection = parentSection;

        shelf = currentSection.closest(".SectionsShelf");

        const sectionElements = Array.from(shelf.children)
        .filter(sectionElement => {
            return sectionElement.matches(".Section");
        })

        const sectionIndex = sectionElements.indexOf(currentSection) - 1;

        return {
            sectionIndex: sectionIndex,
            functionIndex: functionIndex,
            path: indexes
        };
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