import * as OperationAddition from "./Addition.Operation.Block.mjs";
import * as OperationSubtraction from "./Subtraction.Operation.Block.mjs";
import * as OperationMultiplication from "./Multiplication.Operation.Block.mjs";
import * as OperationDivision from "./Division.Operation.Block.mjs";

import * as Text from "./Text.Block.mjs";
import * as Number from "./Number.Block.mjs";
import * as Variable from "./Variable.Block.mjs";

const blockTypes = {
    Text,
    Number,
    Variable,
    Operation: {
        Addition: OperationAddition,
        Subtraction: OperationSubtraction,
        Multiplication: OperationMultiplication,
        Division: OperationDivision
    },
}

function getBlockType(data) {
    switch (data.blockType) {
        case "Operation":
            return blockTypes[data.blockType][data.operationName]
    }
    return blockTypes[data.blockType]
}

function getBlockClass(data) {
    switch (data.blockType) {
        case "Operation":
            return blockTypes[data.blockType][data.operationName][data.operationName]
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