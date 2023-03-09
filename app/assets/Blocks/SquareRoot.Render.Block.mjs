import Block from "./Block.mjs";

export class SquareRoot extends Block {
    shelfContent() { return [
        ["Prompt", "Square root"],
        ["Render"]
    ]}
    shelfStyles() {
        return [
            "theme__color--render"
        ]
    }
    constructor(data) {
        super(data);
    }
}

export function evaluate(fields) {
    return `\\sqrt{${fields[0]}}`
}
export const template = {
    "blockType": "Render",
    "operationName": "SquareRoot",
    "fields": [
        {
            "fieldType": "Render",
            "value": null
        }
    ]
}