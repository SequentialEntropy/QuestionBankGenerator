import Function from "./Function.mjs";
import { createField } from "../Fields/Field.routes.mjs";

export class Render extends Function {
    createShelf() {
        return this.buildShelf("block__render", [
            createField("Prompt", "Render"),
            createField("Operation")
        ]);
    }
    constructor(fieldsData = []) {
        super(fieldsData);
    }
}

export const template = {
    "functionType": "Render",
    "fields": [
        {
            "fieldType": "Operation",
            "value": null
        }
    ]
}