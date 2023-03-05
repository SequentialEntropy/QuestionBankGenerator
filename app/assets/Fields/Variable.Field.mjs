import VariableInput from "../DropDowns/VariableInput.mjs";
import { createBlock } from "../Blocks/Block.routes.mjs";
import QuestionAPI from "../../question/client/question.api.mjs";

export const acceptedBlockTypes = [
    "Variable"
]

export class Variable {
    createInput() {
        return new VariableInput();
    }
    constructor() {
        this.fieldType = "Variable";
        this.root = document.createElement("div");
        this.root.classList.add("block__field");
        
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
            this.root.removeChild(this.root.querySelector(".block"));

            this.input.classList.remove("drop-down--hidden");

            const address = this.getPath();

            QuestionAPI.deleteBlock(address);
        })

        this.root.addEventListener("editBlock", e => {
            QuestionAPI.editBlock(this.getPath(), e.detail);
        })
    }
    initialiseField(data) {
        const newBlock = createBlock(data);

        this.input.classList.add("drop-down--hidden");

        this.root.appendChild(newBlock.root);
    }
    getPath() {
        let parentBlock = this.root.closest(".block");
        let currentField = this.root;
        let indexes = [];

        // Field # in Block

        while (parentBlock != null) {
            const shelf = parentBlock.querySelector(".block__shelf");

            const fieldElements = Array.from(shelf.children)
            .filter(fieldElement => {
                return fieldElement.matches(".block__field");
            })    
            
            indexes.unshift(fieldElements.indexOf(currentField));
            
            currentField = parentBlock.closest(".block__field");

            parentBlock = currentField.closest(".block");
        }

        // Field # in Function

        const parentFunction = currentField.closest(".function");

        let shelf = parentFunction.querySelector(".function__shelf");

        const fieldElements = Array.from(shelf.children)
        .filter(fieldElement => {
            return fieldElement.matches(".block__field");
        })
        
        indexes.unshift(fieldElements.indexOf(currentField));

        // Function # in Section

        const currentFunction = parentFunction;

        const parentSection = currentFunction.closest(".section");

        shelf = parentSection.querySelector(".function-menu__shelf");

        const functionElements = Array.from(shelf.children)
        .filter(functionElement => {
            return functionElement.matches(".function");
        })

        const functionIndex = functionElements.indexOf(currentFunction);

        // Section #

        const currentSection = parentSection;

        shelf = currentSection.closest(".section-menu__shelf");

        const sectionElements = Array.from(shelf.children)
        .filter(sectionElement => {
            return sectionElement.matches(".section");
        })

        const sectionIndex = sectionElements.indexOf(currentSection) - 1;

        return {
            sectionIndex: sectionIndex,
            functionIndex: functionIndex,
            path: indexes
        };
    }
}