import * as Variable from "./Variable.Field.mjs";
import * as Operation from "./Operation.Field.mjs";
import * as Render from "./Render.Field.mjs";
import * as Prompt from "./Prompt.Field.mjs";

const fieldTypes = {
    Variable,
    Operation,
    Render,
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

function getFieldAcceptedBlockTypes(fieldType) {
    return getFieldType(fieldType).acceptedBlockTypes
}

export { createField, getFieldAcceptedBlockTypes };