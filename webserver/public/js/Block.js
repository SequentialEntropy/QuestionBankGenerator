import VariableInput from "./VariableInput.js";
import OperationInput from "./OperationInput.js";
import { CreateNumberBlock } from "./OperationBlocks/ModifyBlock.js";

export default class Block {
    shelfContent() { return `

    <div class="Block-field">
    </div>
    <div class="Block-text">
        ?
    </div>
    <div class="Block-field">
    </div>

    ` }
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="Block" draggable="false">
            <div class="Block-shelf block__operation">
                ${this.shelfContent()}
            </div>
            <button class="Block-delete">
            ×
            </button>
        </div>

        `).children[0];
    }
    constructor() {
        this.type = "?";

        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".Block-shelf");
        this.insertFields();
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
    }
    insertFields() {
        this.shelf.querySelectorAll(".Block-field").forEach(field => {
            field.appendChild((new OperationInput()).root);

            field.addEventListener("select-number", e => {
                const newBlock = CreateNumberBlock();

                field.querySelector(".dropDown").classList.add("hidden");

                field.appendChild(newBlock.root);
            })

            field.addEventListener("select-variable", e => {
                const newBlock = e.detail;

                field.querySelector(".dropDown").classList.add("hidden");
            
                field.appendChild(newBlock.root);
            })

            field.addEventListener("select-operation", e => {
                const newBlock = e.detail;

                const blockShelf = field.closest(".Block");

                field.querySelector(".dropDown").classList.add("hidden");

                field.appendChild(newBlock.root);
            })
        })
    }
}