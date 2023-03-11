import Block from "./Block.mjs";

export class Subscript extends Block {
    shelfContent() { return [
        ["Render"],
        ["Prompt", "subscript"],
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
    return `{${fields[0]}}_{${fields[1]}}`
}
export const template = {
    "blockType": "Render",
    "operationName": "Subscript",
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