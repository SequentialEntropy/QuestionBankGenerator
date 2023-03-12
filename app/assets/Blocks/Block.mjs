import { createField } from "../Fields/Field.routes.mjs";

export default class Block {
    shelfContent() { return [ // Template that determines the contents of the block
        ["Prompt", "Default Block"]
    ]}
    shelfStyles() { // Array of classnames for CSS
        return [
            "theme__color--default"
        ];
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
        `).children[0]; // HTML template

        this.shelfContent().forEach(fieldData => {
            const newField = createField(...fieldData); // Creates the actual fields from the template defined in line 4 shelfContent
            root.querySelector(".block__shelf").appendChild(newField.root);
        });
        this.shelfStyles().forEach(className => { // Applies classes defined in line 7 shelfStyles, determines colour of block
            root.querySelector(".block__shelf").classList.add(className);
        })
        
        return root;
    }
    constructor(data) {
        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".block__shelf");
        this.deleteButton = this.root.querySelector(".block__delete");

        this.root.addEventListener("mouseover", e => { // Add outline & show delete badge
            e.stopPropagation();
            this.shelf.classList.add("block__shelf--hover");
            this.deleteButton.classList.add("block__delete--show");
        });
        this.root.addEventListener("mouseout", e => { // Remove outline & hide delete badge
            e.stopPropagation();
            this.shelf.classList.remove("block__shelf--hover");
            this.deleteButton.classList.remove("block__delete--show");
        })

        this.deleteButton.addEventListener("click", e => {
            if (!confirm(`Are you sure you want to delete the selected Block?`)) { // Confirm before deleting
                return;
            }

            const event = new Event("deleteBlock");

            const parentField = this.root.closest(".block__field");

            parentField.dispatchEvent(event); // Tell parent field to delete this block
        })

        this.initialiseFields(data); // Dynamically populate fields
    }
    initialiseFields(data) {
        const fieldsData = data.fields;

        if (fieldsData === undefined) { // Some blocks don't have any fields - eg. pi
            return;
        }

        const fieldElements = Array.from(this.shelf.children) // Only parse fields
        .filter(fieldElement => {
            return fieldElement.matches(".block__field");
        });

        for (let fieldIndex = 0; fieldIndex < fieldsData.length; fieldIndex++) { // Loop through child fields
            const fieldData = fieldsData[fieldIndex];

            if (fieldData.value == null) { // Skip blank field
                continue;
            }
            
            const event = new CustomEvent("loadBlock", { // Populate child field
                detail: fieldData.value
            });
            
            const fieldElement = fieldElements[fieldIndex];
            fieldElement.dispatchEvent(event);
        }
    }
}