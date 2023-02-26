import TextBlock from "./TextBlock.mjs"

export default class NumberBlock extends TextBlock {
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
                detail: this.shelf.value
            })

            field.dispatchEvent(event);
        })
    }
    initialiseFields(data) {
        const value = data.value;
        if (value !== null) {
            this.shelf.value = value;
        }
    }
}