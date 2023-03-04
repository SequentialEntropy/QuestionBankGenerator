import Block from "./Block.mjs";

export class Subtraction extends Block {
    shelfContent() { return [
        ["Render"],
        ["Prompt", "−"],
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