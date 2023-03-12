import Block from "./Block.mjs";

export class Round extends Block {
    shelfContent() { return [
        ["Prompt", "Round"],
        ["Operation"],
        ["Prompt", "to the nearest"],
        ["Operation"]
    ]}
    shelfStyles() {
        return [
            "theme__color--operation"
        ]
    }
    constructor(data) {
        super(data);
    }
}

export function evaluate(fields) {
    return ((fields[0].dividedBy(fields[1])).round()).times(fields[1])
}
export const template = {
    "blockType": "Operation",
    "operationName": "Round",
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