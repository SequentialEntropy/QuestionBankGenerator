import { RenderFunction, SetFunction } from "./Function.js";

const functionTypes = {
    Render: RenderFunction,
    Set: SetFunction
}

function createFunction(functionType, fieldsData = []) {
    return new (functionTypes[functionType])(fieldsData);
}

export { createFunction, functionTypes };