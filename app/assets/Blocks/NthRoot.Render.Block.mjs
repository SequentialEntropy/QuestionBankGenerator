import Block from "./Block.mjs";

export class NthRoot extends Block {
    shelfContent() { return [
        ["Render"],
        ["Prompt", "to the root of"],
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
    return `\\sqrt[${fields[1]}]{${fields[0]}}`
}
export const template = {
    "blockType": "Render",
    "operationName": "NthRoot",
    "fields": [
        {
            "fieldType": "Render",
            "value": null
        },
        {
            "fieldType": "Render",
            "value": null
        }
    ]
}