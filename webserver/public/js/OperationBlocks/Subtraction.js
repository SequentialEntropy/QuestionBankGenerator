import Block from "../Block.js";

export default class Subtraction extends Block {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="Block block__operation" draggable="false">
            <div class="Block-shelf">
                <div class="Block-field">
                </div>
                <div class="Block-text">
                    -
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
        super();
        this.type = "Subtraction";
    }
}