import Block from "./Block.mjs";

export class Division extends Block {
    shelfContent() { return [
        ["Operation"],
        ["Prompt", "÷"],
        ["Operation"]
    ]}
    shelfStyles() {
        return [
            "theme__color--operation"
        ]
    }
    constructor(data) {
        super(data);
    }
}

export function evaluate(fields) {
    return fields[0].dividedBy(fields[1])
}
export const template = {
    "blockType": "Operation",
    "operationName": "Division",
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