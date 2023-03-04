import { Subtraction as OperationSubtraction } from "./Subtraction.Operation.Block.mjs"

export class Subtraction extends OperationSubtraction {
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
    "operationName": "Subtraction",
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