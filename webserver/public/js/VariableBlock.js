import Block from "./Block.js";

export default class VariableBlock extends Block {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="Block" draggable="false">
            <div class="Block-shelf block__variable">
                <div class="Block-variable">
                </div>
            </div>
            <button class="Block-delete">
            ×
            </button>
        </div>

        `).children[0];
    }
    constructor(variable) {
        super();
        this.type = "variable";
        this.root.querySelector(".Block-variable").textContent = variable;
    }
}