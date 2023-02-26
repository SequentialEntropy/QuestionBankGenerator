import { RenderFunction, SetFunction, TextFunction } from "./Function.mjs";

const functionTypes = {
    Render: RenderFunction,
    Set: SetFunction,
    Text: TextFunction
}

function createFunction(functionType, fieldsData) {
    return new (functionTypes[functionType])(fieldsData);
}

export { createFunction, functionTypes };