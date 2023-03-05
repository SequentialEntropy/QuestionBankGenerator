import Block from "./Block.mjs";

export class Variable extends Block {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="block" draggable="false">
            <div class="block__shelf block--variable theme__color--variable">
            </div>
            <button class="block__delete">
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
        this.root.querySelector(".block__shelf").textContent = variableName;
    }
}

export const template = {
    "blockType": "Variable",
    "variableName": null
}