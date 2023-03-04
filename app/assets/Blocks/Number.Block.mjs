import Block from "./Block.mjs";

export class Number extends Block {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="Block" draggable="false">
            <input class="Block-shelf block__default Block-input Block-input__number" type="number" placeholder="Number"/>
            <button class="Block-delete">
            ×
            </button>
        </div>

        `).children[0];
    }
    constructor(data) {
        super(data);
        this.type = "Number";
        this.shelf.addEventListener("dragover", e => {
            e.preventDefault();
        })
        this.shelf.addEventListener("input", e => {
            
            const field = this.root.closest(".Block-field");
            const event = new CustomEvent("editBlock", {
                detail: {
                    newValue: this.shelf.value
                }
            })

            field.dispatchEvent(event);
        })
    }
    initialiseFields(data) {
        const value = data.value;

        if (value !== null) {
            this.shelf.value = value;
            return
        }
    }
}

export const template = {
    "blockType": "Number",
    "value": null
}