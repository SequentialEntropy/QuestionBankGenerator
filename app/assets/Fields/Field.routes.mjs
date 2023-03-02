import * as Variable from "./Variable.Field.mjs";
import * as Operation from "./Operation.Field.mjs";
import * as Prompt from "./Prompt.Field.mjs";

const fieldTypes = {
    Variable,
    Operation,
    Prompt
}

function getFieldType(fieldType) {
    return fieldTypes[fieldType]
}

function getFieldClass(fieldType) {
    return getFieldType(fieldType)[fieldType]
}

function createField(fieldType, data) {
    return new (getFieldClass(fieldType))(data)
}

export { createField };