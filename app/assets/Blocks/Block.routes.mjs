import * as Addition from "./Addition.mjs";
import * as Subtraction from "./Subtraction.mjs";
import * as Multiplication from "./Multiplication.mjs";
import * as Division from "./Division.mjs";

import * as Text from "./TextBlock.mjs";
import * as Number from "./NumberBlock.mjs";
import * as Variable from "./VariableBlock.mjs";

const blockTypes = {
    Text,
    Number,
    Variable,
    Operation: {
        Addition,
        Subtraction,
        Multiplication,
        Division
    }
}

function getBlockType(data) {
    if (data.blockType == "Operation") {
        return blockTypes.Operation[data.operationName]
    }
    return blockTypes[data.blockType]
}

function getBlockClass(data) {
    if (data.blockType == "Operation") {
        return blockTypes.Operation[data.operationName][data.operationName]
    }
    return blockTypes[data.blockType][data.blockType]
}

function createBlock(data) {
    return new (getBlockClass(data))(data)
}

function getBlockTemplate(data) {
    return getBlockType(data).template
}

function getBlockExecute(data) {
    return getBlockType(data).execute
}

export { blockTypes, createBlock, getBlockClass, getBlockTemplate, getBlockExecute }