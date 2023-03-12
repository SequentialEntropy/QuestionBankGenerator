import Block from "./Block.mjs";

export class Subtraction extends Block {
    shelfContent() { return [ // Override shelfContent to determine the contents of the "Subtraction" block
        ["Operation"],
        ["Prompt", "−"],
        ["Operation"]
    ]}
    shelfStyles() { // Override CSS default color styles to match block colour
        return [
            "theme__color--operation"
        ]
    }
    constructor(data) {
        super(data); // Inherit "Block" superclass fields and methods
    }
}

export function evaluate(fields) {
    return fields[0].minus(fields[1])
}
export const template = {
    "blockType": "Operation",
    "operationName": "Subtraction",
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