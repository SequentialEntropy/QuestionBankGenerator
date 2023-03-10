import { createField } from "../Fields/Field.routes.mjs";

export default class Block {
    shelfContent() { return [
        ["Prompt", "Default Block"]
    ]}
    shelfStyles() {
        return [
            "theme__color--default"
        ]
    }
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        const root = range.createContextualFragment(`

        <div class="block" draggable="false">
            <div class="block__shelf">
            </div>
            <button class="block__delete">
            ×
            </button>
        </div>

        `).children[0];

        this.shelfContent().forEach(fieldData => {
            const newField = createField(...fieldData);
            root.querySelector(".block__shelf").appendChild(newField.root);
        });

        this.shelfStyles().forEach(className => {
            root.querySelector(".block__shelf").classList.add(className);
        })
        
        return root;
    }
    constructor(data) {
        this.type = "?";

        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".block__shelf");
        this.deleteButton = this.root.querySelector(".block__delete");

        this.root.addEventListener("mouseover", e => {
            e.stopPropagation();
            this.shelf.classList.add("block__shelf--hover");
            this.deleteButton.classList.add("block__delete--show");
        });
        this.root.addEventListener("mouseout", e => {
            e.stopPropagation();
            this.shelf.classList.remove("block__shelf--hover");
            this.deleteButton.classList.remove("block__delete--show");
        })

        this.deleteButton.addEventListener("click", e => {
            if (!confirm(`Are you sure you want to delete the selected Block?`)) {
                return;
            }

            const event = new Event("deleteBlock");

            const parentField = this.root.closest(".block__field");

            parentField.dispatchEvent(event);
        })

        this.initialiseFields(data);
    }
    initialiseFields(data) {
        const fieldsData = data.fields;

        if (fieldsData === undefined) {
            return
        }

        const fieldElements = Array.from(this.shelf.children)
        .filter(fieldElement => {
            return fieldElement.matches(".block__field");
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