import Block from "./Block.js";

export default class VariableBlock extends Block {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="Block" draggable="false">
            <div class="Block-shelf Block-variable block__variable">
            </div>
            <button class="Block-delete">
            ×
            </button>
        </div>

        `).children[0];
    }
    constructor(data) {
        super(data);
        this.type = "variable";
    }
    initialiseFields(data) {
        const variableName = data.variableName;
        this.root.querySelector(".Block-variable").textContent = variableName;
    }
}