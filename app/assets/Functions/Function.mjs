import { createField } from "../Fields/Field.routes.mjs";

export default class Function {
    shelfContent() { return [
        ["Prompt", "Default Function"]
    ] }
    shelfStyles() {
        return [
            "block__default"
        ]
    }
    createRoot() {
        const root = document.createElement("div");
        root.classList.add("function");

        return root;
    }
    createDeleteButton() {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("Block-delete");
        deleteButton.textContent = "×";

        return deleteButton;
    }
    createShelf() {
        const shelf = document.createElement("div");
        shelf.classList.add("function__shelf");
        
        this.shelfStyles().forEach(className => {
            shelf.classList.add(className)
        })

        this.shelfContent().forEach(fieldData => {
            const newField = createField(...fieldData);
            shelf.appendChild(newField.root);
        });

        return shelf;
    }
    constructor(fieldsData = []) {
        this.root = this.createRoot();
        this.shelf = this.createShelf();
        this.deleteButton = this.createDeleteButton();

        this.root.appendChild(this.shelf);
        this.root.appendChild(this.deleteButton);
        /*
        <div class="function">
            <div class="function__shelf">
            </div>
            <button class="Block-delete">
            ×
            </button>
        </div>
        */
        this.root.addEventListener("mouseover", e => {
            e.stopPropagation();
            this.shelf.classList.add("function__shelf--hover");
            this.deleteButton.classList.add("Block-delete__show");
        });
        this.root.addEventListener("mouseout", e => {
            e.stopPropagation();
            this.shelf.classList.remove("function__shelf--hover");
            this.deleteButton.classList.remove("Block-delete__show");
        })

        this.deleteButton.addEventListener("click", e => {
            if (!confirm(`Are you sure you want to delete the selected Function?`)) {
                return;
            }

            const parentField = this.root.closest(".function-menu__shelf");
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
            functionIndex: functionIndex
        };
    }
}