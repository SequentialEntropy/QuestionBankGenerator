import Block from "./Block.mjs";
import { createField } from "../Fields/Field.routes.mjs";

export class Division extends Block {
    shelfContent() { return [
        createField("Operation"),
        createField("Prompt", "÷"),
        createField("Operation")
    ]}
    constructor(data) {
        super(data);
        this.type = "Division";
    }
}

export function execute(fields) {
    return fields[0].value / fields[1].value
}
export const template = {
    "blockType": "Operation",
    "operationName": "Division",
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