import Block from "./Block.mjs";

export class Subtraction extends Block {
    shelfContent() { return [
        ["Render"],
        ["Prompt", "−"],
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
    return `${fields[0]} - ${fields[1]}`
}
export const template = {
    "blockType": "Render",
    "operationName": "Subtraction",
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