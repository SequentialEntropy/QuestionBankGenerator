import * as OperationAddition from "./Addition.Operation.Block.mjs";
import * as OperationSubtraction from "./Subtraction.Operation.Block.mjs";
import * as OperationMultiplication from "./Multiplication.Operation.Block.mjs";
import * as OperationDivision from "./Division.Operation.Block.mjs";

import * as RenderAddition from "./Addition.Render.Block.mjs";
import * as RenderSubtraction from "./Subtraction.Render.Block.mjs";
import * as RenderMultiplication from "./Multiplication.Render.Block.mjs";
import * as RenderDivision from "./Division.Render.Block.mjs";

import * as Text from "./Text.Block.mjs";
import * as Number from "./Number.Block.mjs";
import * as Variable from "./Variable.Block.mjs";

import * as Evaluate from "./Evaluate.Block.mjs";

const blockTypes = {
    Text,
    Number,
    Variable,
    Evaluate,
    Operation: {
        Addition: OperationAddition,
        Subtraction: OperationSubtraction,
        Multiplication: OperationMultiplication,
        Division: OperationDivision
    },
    Render: {
        Addition: RenderAddition,
        Subtraction: RenderSubtraction,
        Multiplication: RenderMultiplication,
        Division: RenderDivision
    }
}

function getBlockType(data) {
    switch (data.blockType) {
        case "Operation":
        case "Render":
            return blockTypes[data.blockType][data.operationName]
    }
    return blockTypes[data.blockType]
}

function getBlockClass(data) {
    switch (data.blockType) {
        case "Operation":
        case "Render":
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