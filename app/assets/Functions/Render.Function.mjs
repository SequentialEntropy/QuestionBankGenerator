import Function from "./Function.mjs";

export class Render extends Function {
    shelfContent() { return [
        ["Prompt", "Render"],
        ["Render"]
    ]}
    shelfStyles() {
        return [
            "theme__color--default",
            "theme__outline--default"
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
            "fieldType": "Render",
            "value": null
        }
    ]
}