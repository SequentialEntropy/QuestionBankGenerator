import Addition from "./Addition.js";
import Subtraction from "./Subtraction.js";
import Multiplication from "./Multiplication.js";
import Division from "./Division.js";
import VariableBlock from "./VariableBlock.js";
import NumberBlock from "./NumberBlock.js";

const operationTypes = {
    Addition: Addition,
    Subtraction: Subtraction,
    Multiplication: Multiplication,
    Division: Division
}

const blockTypes = {
    Number: createNumberBlock,
    Variable: createVariableBlock,
    Operation: createOperationBlock
}

function createOperationBlock(data) {
    return new (operationTypes[data.operationName])(data);
}

function createVariableBlock(data) {
    return new VariableBlock(data);
}

function createNumberBlock(data) {
    return new NumberBlock(data);
}

function createBlock(data) {
    return blockTypes[data.blockType](data);
}

export { createBlock, operationTypes };