import Block from "./Block.mjs";
import { createField } from "../Fields/Field.routes.mjs";

export class Multiplication extends Block {
    shelfContent() { return [
        createField("Operation"),
        createField("Prompt", "×"),
        createField("Operation")
    ]}
    constructor(data) {
        super(data);
        this.type = "Multiplication";
    }
}

export function execute(fields) {
    return fields[0].value * fields[1].value
}
export const template = {
    "blockType": "Operation",
    "operationName": "Multiplication",
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