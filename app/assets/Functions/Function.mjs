import { createVariableField, createOperationField, createPrompt } from "../Fields/Field.routes.mjs";
import QuestionAPI from "../../question/client/question.api.mjs";

class Function {
    buildShelf(className, shelfContent) {
        const shelf = document.createElement("div");
        shelf.classList.add("Function-shelf");
        shelf.classList.add(className);
        shelfContent.forEach(e => {
            shelf.appendChild(e.root);
        });
        return shelf;
    }
    createRoot() {
        const root = document.createElement("div");
        root.classList.add("Function");

        return root;
    }
    createDeleteButton() {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("Block-delete");
        deleteButton.textContent = "×";

        return deleteButton;
    }
    createShelf() {
        return this.shelfBuilder("block__default", []);
    }
    constructor(fieldsData = []) {
        this.root = this.createRoot();
        this.shelf = this.createShelf();
        this.deleteButton = this.createDeleteButton();

        this.root.appendChild(this.shelf);
        this.root.appendChild(this.deleteButton);
        /*
        <div class="Function">
            <div class="Function-shelf">
            </div>
            <button class="Block-delete">
            ×
            </button>
        </div>
        */
        this.root.addEventListener("mouseover", e => {
            e.stopPropagation();
            this.shelf.classList.add("Function-shelf__hover");
            this.deleteButton.classList.add("Block-delete__show");
        });
        this.root.addEventListener("mouseout", e => {
            e.stopPropagation();
            this.shelf.classList.remove("Function-shelf__hover");
            this.deleteButton.classList.remove("Block-delete__show");
        })

        this.deleteButton.addEventListener("click", e => {
            if (!confirm(`Are you sure you want to delete the selected Function?`)) {
                return;
            }

            const parentField = this.root.closest(".FunctionsShelf");
            const event = new CustomEvent("deleteFunction", {
                detail: this.root
            });

            parentField.dispatchEvent(event);
        })

        this.initialiseFields(fieldsData);
    }
    initialiseFields(fieldsData) {

        const fieldElements = Array.from(this.shelf.children)
        .filter(fieldElement => {
            return fieldElement.matches(".Block-field");
        })

        for (let fieldIndex = 0; fieldIndex < fieldsData.length; fieldIndex++) {

            const fieldData = fieldsData[fieldIndex];

            if (fieldData.value === null) {
                continue;
            }
            
            const fieldElement = fieldElements[fieldIndex];

            const event = new CustomEvent("loadBlock", {
                detail: fieldData.value
            });

            fieldElement.dispatchEvent(event);
        }
    }
    getPath() {
        let shelf;

        const currentFunction = this.root;

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
            functionIndex: functionIndex
        };
    }
}

class RenderFunction extends Function {
    createShelf() {
        return this.buildShelf("block__render", [
            createPrompt("Render"),
            createOperationField()
        ]);
    }
    constructor(fieldsData = []) {
        super(fieldsData);
    }
}

class SetFunction extends RenderFunction {
    createShelf() {
        return this.buildShelf("block__operation", [
            createPrompt("Set the value of"),
            createVariableField(),
            createPrompt("to"),
            createOperationField()
        ])
    }
    constructor(fieldsData = []) {
        super(fieldsData);
    }
}

class TextFunction extends Function {
    createShelf() {
        const shelf = document.createElement("span");
        shelf.classList.add("Function-shelf");
        shelf.classList.add("Block-input");
        shelf.classList.add("Function__text");
        shelf.contentEditable = true;
        
        shelf.addEventListener("focus", e => {
            shelf.classList.add("Function__text__focus");

            const height = shelf.clientHeight;

            shelf.style.minHeight = height + "px";

            if (shelf.classList.contains("Function__text__default")) {
                const width = shelf.clientWidth;

                shelf.style.minWidth = width + "px";

                shelf.textContent = "";
                
                shelf.classList.remove("Function__text__default");
            }
        })
        
        shelf.addEventListener("blur", e => {
            shelf.classList.remove("Function__text__focus");
            if (shelf.textContent == "") {
                shelf.textContent = "Text";
                shelf.classList.add("Function__text__default");
            }
            shelf.style.minWidth = "";

            shelf.style.minHeight = "";
        })
        
        shelf.addEventListener("input", e => {
            QuestionAPI.editFunction(this.getPath(), shelf.textContent);
        })
        
        return shelf;
    }
    constructor(fieldsData = null) {
        super(fieldsData);
    }
    initialiseFields(fieldsData) {
        if (fieldsData === null) {
            this.shelf.classList.add("Function__text__default");
            this.shelf.textContent = "Text";
            return;
        }
        this.shelf.textContent = fieldsData;
    }
}

export { RenderFunction, SetFunction, TextFunction };