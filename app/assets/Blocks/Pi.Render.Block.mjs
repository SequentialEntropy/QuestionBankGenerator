import Block from "./Block.mjs";

export class Pi extends Block {
    shelfStyles() {
        return [
            "block--variable",
            "theme__color--render"
        ]
    }
    constructor(data) {
        super(data);
        this.shelf.textContent = "pi";
    }
}

export function evaluate() {
    return "\\pi"
}
export const template = {
    "blockType": "Render",
    "operationName": "Pi"
}