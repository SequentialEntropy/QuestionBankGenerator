import { Render } from "./Render.Function.mjs";

export class Set extends Render {
    shelfContent() { return [
        ["Prompt", "Set the value of"],
        ["Variable"],
        ["Prompt", "to"],
        ["Operation"]
    ] }
    shelfStyles() {
        return [
            "block__operation"
        ]
    }
    constructor(fieldsData = []) {
        super(fieldsData);
    }
}

export const template = {
    "functionType": "Set",
    "fields": [
        {
            "fieldType": "Variable",
            "value": null
        },
        {
            "fieldType": "Operation",
            "value": null
        }
    ]
}