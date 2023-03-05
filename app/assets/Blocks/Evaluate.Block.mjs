import Block from "./Block.mjs";

export class Evaluate extends Block {
    shelfContent() { return [
        ["Prompt", "Evaluate"],
        ["Operation"]
    ] }
    shelfStyles() {
        return [
            "theme__color--operation"
        ]
    }
    constructor(data) {
        super(data)
    }
}

export const template = {
    "blockType": "Evaluate",
    "fields": [
        {
            "fieldType": "Operation",
            "value": null
        }
    ]
}