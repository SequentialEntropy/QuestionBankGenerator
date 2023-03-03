import * as Addition from "./Addition.Block.mjs";
import * as Subtraction from "./Subtraction.Block.mjs";
import * as Multiplication from "./Multiplication.Block.mjs";
import * as Division from "./Division.Block.mjs";

import * as Text from "./Text.Block.mjs";
import * as Number from "./Number.Block.mjs";
import * as Variable from "./Variable.Block.mjs";

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

export { blockTypes, createBlock, getBlockTemplate, getBlockExecute }