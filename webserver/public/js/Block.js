import VariableInput from "./VariableInput.js";
import OperationInput from "./OperationInput.js";

export default class Block {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="Block block__operation" draggable="false">
            <div class="Block-shelf">
                <div class="Block-field">
                </div>
                <div class="Block-text">
                    ?
                </div>
                <div class="Block-field">
                </div>
            </div>
            <button class="Block-delete">
            Delete
            </button>
        </div>
        `).children[0];
    }
    constructor() {
        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".Block-shelf");
        this.insertFields();
        this.deleteButton = this.root.querySelector(".Block-delete");

        this.root.addEventListener("mouseover", e => {
            e.stopPropagation();
            this.deleteButton.classList.add("Block-delete__show");
        });
        this.root.addEventListener("mouseout", e => {
            e.stopPropagation();
            this.deleteButton.classList.remove("Block-delete__show");
        })
    }
    insertFields() {
        this.shelf.querySelectorAll(".Block-field").forEach(field => {
            field.appendChild((new OperationInput()).root);

            field.addEventListener("select-number", e => {
                field.querySelector(".dropDown").classList.add("hidden");
            })

            field.addEventListener("select-variable", e => {
                field.querySelector(".dropDown").classList.add("hidden");
            })

            field.addEventListener("select-operation", e => {
                field.querySelector(".dropDown").classList.add("hidden");
            })
        })
    }
}