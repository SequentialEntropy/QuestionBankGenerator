import Block from "./Block.mjs";

export class Parentheses extends Block {
    shelfContent() { return [
        ["Prompt", "("],
        ["Render"],
        ["Prompt", ")"]
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
    return `(${fields[0]})`
}
export const template = {
    "blockType": "Render",
    "operationName": "Parentheses",
    "fields": [
        {
            "fieldType": "Render",
            "value": null
        }
    ]
}