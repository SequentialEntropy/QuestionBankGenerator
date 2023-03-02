import Function from "./Function.mjs";

export class Render extends Function {
    shelfContent() { return [
        ["Prompt", "Render"],
        ["Operation"]
    ]}
    shelfStyles() {
        return [
            "block__render"
        ]
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