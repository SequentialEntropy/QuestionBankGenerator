import Block from "./Block.mjs";

export class Power extends Block {
    shelfContent() { return [
        ["Render"],
        ["Prompt", "to the power of"],
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
    return `{${fields[0]}}^{${fields[1]}}`
}
export const template = {
    "blockType": "Render",
    "operationName": "Power",
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