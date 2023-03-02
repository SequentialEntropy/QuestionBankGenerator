import Function from "./Function.mjs";
import { createOperationField, createPrompt } from "../Fields/Field.routes.mjs";

export class Render extends Function {
    createShelf() {
        return this.buildShelf("block__render", [
            createPrompt("Render"),
            createOperationField()
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