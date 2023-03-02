import { Render } from "./Render.Function.mjs";
import { createField } from "../Fields/Field.routes.mjs";

export class Set extends Render {
    createShelf() {
        return this.buildShelf("block__operation", [
            createField("Prompt", "Set the value of"),
            createField("Variable"),
            createField("Prompt", "to"),
            createField("Operation")
        ])
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