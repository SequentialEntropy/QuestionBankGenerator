import Block from "./Block.js";

export default class NumberBlock extends Block {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="Block" draggable="false">
            <input class="Block-shelf block__default Block-input" type="number" placeholder="Number"/>
            <button class="Block-delete">
            ×
            </button>
        </div>

        `).children[0];
    }
    constructor(data) {
        super(data);
        this.type = "number";
        this.shelf.addEventListener("dragover", e => {
            e.preventDefault();
        })
    }
    initialiseFields(data) {
        const value = data.value;
        if (value !== null) {
            this.shelf.value = value;
        }
    }
}