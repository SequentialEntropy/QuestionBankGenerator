import Block from "../Block.js";

export default class Subtraction extends Block {
    shelfContent() { return `

    <div class="Block-field">
    </div>
    <div class="Block-prompt">
        −
    </div>
    <div class="Block-field">
    </div>

    ` }
    constructor() {
        super();
        this.type = "Subtraction";
    }
}