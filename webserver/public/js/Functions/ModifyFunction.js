import { RenderFunction, SetFunction } from "./Function.js";

const functionTypes = {
    Render: RenderFunction,
    Set: SetFunction
}

function createFunction(functionType) {
    return new (functionTypes[functionType])();
}

export { createFunction, functionTypes };