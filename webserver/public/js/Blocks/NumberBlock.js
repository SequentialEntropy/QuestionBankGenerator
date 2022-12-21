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
    constructor() {
        super();
        this.type = "number";
    }
}