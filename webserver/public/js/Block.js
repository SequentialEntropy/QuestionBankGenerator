import { OperationField, Prompt, Spacer } from "./Field.js";

export default class Block {
    shelfContent() { return [
        new OperationField(),
        new Prompt("?"),
        new OperationField()
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

        this.shelfContent().forEach(e => {
            root.querySelector(".Block-shelf").appendChild(e.root);
        });
        
        return root;
    }
    constructor() {
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

            const event = new Event("delete");

            const parentField = this.root.closest(".Block-field");

            parentField.dispatchEvent(event);
        })
    }
}