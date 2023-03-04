import Block from "./Block.mjs";

export class Multiplication extends Block {
    shelfContent() { return [
        ["Render"],
        ["Prompt", "×"],
        ["Render"]
    ]}
    shelfStyles() {
        return [
            "block__render"
        ]
    }
    constructor(data) {
        super(data)
    }
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