import Block from "./Block.mjs";
import Decimal from "../../libs/decimal.mjs";

export class Pi extends Block {
    shelfStyles() {
        return [
            "block--variable",
            "theme__color--operation"
        ]
    }
    constructor(data) {
        super(data);
        this.shelf.textContent = "pi";
    }
}

export function evaluate() {
    return Decimal.acos(-1)
}
export const template = {
    "blockType": "Operation",
    "operationName": "Pi",
}