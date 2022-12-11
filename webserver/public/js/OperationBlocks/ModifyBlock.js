import Addition from "./Addition.js";
import Subtraction from "./Subtraction.js";
import Multiplication from "./Multiplication.js";
import Division from "./Division.js";
import VariableBlock from "../VariableBlock.js";
import NumberBlock from "../NumberBlock.js";

const operationTypes = {
    Addition: Addition,
    Subtraction: Subtraction,
    Multiplication: Multiplication,
    Division: Division
}

function CreateBlock(operationType) {
    return new (operationTypes[operationType])();
}

function CreateVariableBlock(variable) {
    return new VariableBlock(variable);
}

function CreateNumberBlock() {
    return new NumberBlock();
}

export { CreateNumberBlock, CreateVariableBlock, CreateBlock, operationTypes };