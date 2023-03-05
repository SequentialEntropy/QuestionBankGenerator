import Block from "./Block.mjs";

export class Multiplication extends Block {
    shelfContent() { return [
        ["Operation"],
        ["Prompt", "×"],
        ["Operation"]
    ]}
    shelfStyles() {
        return [
            "theme__color--operation"
        ]
    }
    constructor(data) {
        super(data);
        this.blockType = "Multiplication";
    }
}

export function execute(fields) {
    return fields[0].value * fields[1].value
}
export const template = {
    "blockType": "Operation",
    "operationName": "Multiplication",
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