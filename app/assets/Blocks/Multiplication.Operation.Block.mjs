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

export function evaluate(fields) {
    return fields[0].times(fields[1])
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