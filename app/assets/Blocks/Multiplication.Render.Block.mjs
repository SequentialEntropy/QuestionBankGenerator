import Block from "./Block.mjs";

export class Multiplication extends Block {
    shelfContent() { return [
        ["Render"],
        ["Prompt", "×"],
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
    return `${fields[0]} \\times ${fields[1]}`
}
export const template = {
    "blockType": "Render",
    "operationName": "Multiplication",
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