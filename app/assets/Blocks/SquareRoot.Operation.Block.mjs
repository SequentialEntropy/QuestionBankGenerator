import Block from "./Block.mjs";

export class SquareRoot extends Block {
    shelfContent() { return [
        ["Prompt", "Square root"],
        ["Operation"]
    ]}
    shelfStyles() {
        return [
            "theme__color--operation"
        ]
    }
    constructor(data) {
        super(data);
        this.blockType = "SquareRoot";
    }
}

export function evaluate(fields) {
    return fields[0].sqrt()
}
export const template = {
    "blockType": "Operation",
    "operationName": "SquareRoot",
    "fields": [
        {
            "fieldType": "Operation",
            "value": null
        }
    ]
}