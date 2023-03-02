import { Render } from "./Render.Function.mjs";
import { createVariableField, createOperationField, createPrompt } from "../Fields/Field.routes.mjs";

export class Set extends Render {
    createShelf() {
        return this.buildShelf("block__operation", [
            createPrompt("Set the value of"),
            createVariableField(),
            createPrompt("to"),
            createOperationField()
        ])
    }
    constructor(fieldsData = []) {
        super(fieldsData);
    }
}