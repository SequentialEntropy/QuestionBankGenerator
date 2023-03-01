import { VariableField, OperationField, Prompt } from "./Field.mjs";

function createVariableField() {
    return new VariableField()
}

function createOperationField() {
    return new OperationField()
}

function createPrompt(text) {
    return new Prompt(text)
}

export { createVariableField, createOperationField, createPrompt };