import { createField } from "../Fields/Field.routes.mjs";

export default class Block {
    shelfContent() { return [
        ["Prompt", "Default Block"]
    ]}
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        const root = range.createContextualFragment(`

        <div class="Block" draggable="false">
            <div class="Block-shelf block__operation">
            </div>
            <button class="Block-delete">
            ×
            </button>
        </div>

        `).children[0];

        this.shelfContent().forEach(fieldData => {
            const newField = createField(...fieldData);
            root.querySelector(".Block-shelf").appendChild(newField.root);
        });
        
        return root;
    }
    constructor(data) {
        this.type = "?";

        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".Block-shelf");
        this.deleteButton = this.root.querySelector(".Block-delete");

        this.root.addEventListener("mouseover", e => {
            e.stopPropagation();
            this.shelf.classList.add("Block-shelf__hover");
            this.deleteButton.classList.add("Block-delete__show");
        });
        this.root.addEventListener("mouseout", e => {
            e.stopPropagation();
            this.shelf.classList.remove("Block-shelf__hover");
            this.deleteButton.classList.remove("Block-delete__show");
        })

        this.deleteButton.addEventListener("click", e => {
            if (!confirm(`Are you sure you want to delete the selected Block?`)) {
                return;
            }

            const event = new Event("deleteBlock");

            const parentField = this.root.closest(".Block-field");

            parentField.dispatchEvent(event);
        })

        this.initialiseFields(data);
    }
    initialiseFields(data) {
        const fieldsData = data.fields;

        const fieldElements = Array.from(this.shelf.children)
        .filter(fieldElement => {
            return fieldElement.matches(".Block-field");
        })

        for (let fieldIndex = 0; fieldIndex < fieldsData.length; fieldIndex++) {

            const fieldData = fieldsData[fieldIndex];

            if (fieldData.value == null) {
                continue;
            }

            const fieldElement = fieldElements[fieldIndex];

            const event = new CustomEvent("loadBlock", {
                detail: fieldData.value
            });

            fieldElement.dispatchEvent(event);
        }
    }
}