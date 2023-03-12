import Block from "./Block.mjs";

export class Number extends Block {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="block" draggable="false">
            <input class="block__shelf theme__color--white block--input" type="number" placeholder="Number"/>
            <button class="block__delete">
            ×
            </button>
        </div>

        `).children[0];
    }
    constructor(data) {
        super(data);
        this.shelf.addEventListener("dragover", e => {
            e.preventDefault();
        })
        this.shelf.addEventListener("blur", e => {
            
            const field = this.root.closest(".block__field");
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