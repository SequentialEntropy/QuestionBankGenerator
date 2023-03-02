import { Text } from "./Text.Function.mjs"
import { Render } from "./Render.Function.mjs";
import { Set } from "./Set.Function.mjs";

const functionTypes = {
    Render,
    Set,
    Text
}

function createFunction(functionType, fieldsData) {
    return new (functionTypes[functionType])(fieldsData);
}

export { createFunction, functionTypes };