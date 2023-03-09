import Block from "./Block.mjs";

export class Addition extends Block {
    shelfContent() { return [
        ["Operation"],
        ["Prompt", "+"],
        ["Operation"]
    ]}
    shelfStyles() {
        return [
            "theme__color--operation"
        ]
    }
    constructor(data) {
        super(data);
        this.blockType = "Addition";
    }
}

export function evaluate(fields) {
    return fields[0].plus(fields[1])
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