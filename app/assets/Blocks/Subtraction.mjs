import Block from "./Block.mjs";
import { createOperationField, createPrompt } from "../Fields/Field.routes.mjs";

export class Subtraction extends Block {
    shelfContent() { return [
        createOperationField(),
        createPrompt("−"),
        createOperationField("Operation")
    ]}
    constructor(data) {
        super(data);
        this.type = "Subtraction";
    }
}

export function execute(fields) {
    return fields[0].value - fields[1].value
}
export const template = {
    "blockType": "Operation",
    "operationName": "Subtraction",
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