import Addition from "./Addition.mjs";
import Subtraction from "./Subtraction.mjs";
import Multiplication from "./Multiplication.mjs";
import Division from "./Division.mjs";
import VariableBlock from "./VariableBlock.mjs";
import NumberBlock from "./NumberBlock.mjs";
import TextBlock from "./TextBlock.mjs";

const operationTypes = {
    Addition: Addition,
    Subtraction: Subtraction,
    Multiplication: Multiplication,
    Division: Division
}

const blockTypes = {
    Text: createTextBlock,
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

function createTextBlock(data) {
    return new TextBlock(data);
}

function createBlock(data) {
    return blockTypes[data.blockType](data);
}

export { createBlock, operationTypes };