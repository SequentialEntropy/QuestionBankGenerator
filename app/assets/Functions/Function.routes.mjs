import * as Text from "./Text.Function.mjs"
import * as Render from "./Render.Function.mjs";
import * as Set from "./Set.Function.mjs";

const functionTypes = {
    Render,
    Set,
    Text
}

function getFunctionType(functionType) {
    return functionTypes[functionType]
}

function getFunctionClass(functionType) {
    return getFunctionType(functionType)[functionType]
}

function createFunction(functionType, fieldsData) {
    return new (getFunctionClass(functionType))(fieldsData);
}

function getFunctionTemplate(functionType) {
    return getFunctionType(functionType).template
}

export { functionTypes, createFunction, getFunctionTemplate };