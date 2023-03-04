import { Multiplication as OperationMultiplication } from "./Multiplication.Operation.Block.mjs"

export class Multiplication extends OperationMultiplication {
    shelfStyles() {
        return [
            "block__render"
        ]
    }
    constructor(data) {
        super(data)
    }
}

export const template = {
    "blockType": "Render",
    "operationName": "Multiplication",
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