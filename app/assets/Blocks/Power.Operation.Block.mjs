import Block from "./Block.mjs";

export class Power extends Block {
    shelfContent() { return [
        ["Operation"],
        ["Prompt", "to the power of"],
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
    return fields[0].pow(fields[1])
}
export const template = {
    "blockType": "Operation",
    "operationName": "Power",
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