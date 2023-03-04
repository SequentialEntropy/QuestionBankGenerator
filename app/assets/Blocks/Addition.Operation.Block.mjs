import Block from "./Block.mjs";

export class Addition extends Block {
    shelfContent() { return [
        ["Operation"],
        ["Prompt", "+"],
        ["Operation"]
    ]}
    shelfStyles() {
        return [
            "block__operation"
        ]
    }
    constructor(data) {
        super(data);
        this.blockType = "Addition";
    }
}

export function execute(fields) {
    return fields[0].value + fields[1].value
}
export const template = {
    "blockType": "Operation",
    "operationName": "Addition",
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