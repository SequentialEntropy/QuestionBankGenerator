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
            "theme__color--operation",
        ]
    }
    constructor(fieldsData = []) {
        super(fieldsData);
        this.root.classList.add("function--full-width");
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