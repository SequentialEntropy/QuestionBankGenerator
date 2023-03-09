import Block from "./Block.mjs";

export class Subtraction extends Block {
    shelfContent() { return [
        ["Operation"],
        ["Prompt", "−"],
        ["Operation"]
    ]}
    shelfStyles() {
        return [
            "theme__color--operation"
        ]
    }
    constructor(data) {
        super(data);
        this.blockType = "Subtraction";
    }
}

export function evaluate(fields) {
    return fields[0].value - fields[1].value
}
export const template = {
    "blockType": "Operation",
    "operationName": "Subtraction",
    "fields": [
        {
            "fieldType": "Operation",
            "value": null
        },
        {
            "fieldType": "Operation",
            "value": null
        }
    ]
}