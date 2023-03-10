import Block from "./Block.mjs";

export class ImplicitMultiplication extends Block {
    shelfContent() { return [
        ["Render"],
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
    return `${fields[0]}${fields[1]}`
}
export const template = {
    "blockType": "Render",
    "operationName": "ImplicitMultiplication",
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