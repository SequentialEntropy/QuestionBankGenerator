import Block from "./Block.mjs";
import Decimal from "../../libs/decimal.mjs";

export class NthRoot extends Block {
    shelfContent() { return [
        ["Operation"],
        ["Prompt", "to the root of"],
        ["Operation"]
    ]}
    shelfStyles() {
        return [
            "theme__color--operation"
        ]
    }
    constructor(data) {
        super(data);
        this.blockType = "NthRoot";
    }
}

export function evaluate(fields) {
    return fields[0].pow(new Decimal(1).div(fields[1]))
}
export const template = {
    "blockType": "Operation",
    "operationName": "NthRoot",
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