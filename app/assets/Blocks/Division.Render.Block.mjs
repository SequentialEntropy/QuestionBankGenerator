import Block from "./Block.mjs";

export class Division extends Block {
    shelfContent() { return [
        ["Render"],
        ["Prompt", "÷"],
        ["Render"]
    ]}
    shelfStyles() {
        return [
            "theme__color--render"
        ]
    }
    constructor(data) {
        super(data)
    }
}

export function evaluate(fields) {
    return `\\frac{${fields[0]}}{${fields[1]}}`
}
export const template = {
    "blockType": "Render",
    "operationName": "Division",
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