import Function from "./Function.mjs";

export class Render extends Function {
    shelfContent() { return [
        ["Prompt", "Render"],
        ["Render"]
    ]}
    shelfStyles() {
        return [
            "function__render"
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