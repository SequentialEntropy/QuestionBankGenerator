import Addition from "./Addition.js";
import Subtraction from "./Subtraction.js";
import Multiplication from "./Multiplication.js";
import Division from "./Division.js";
import VariableBlock from "../VariableBlock.js";

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

export { CreateVariableBlock, CreateBlock, operationTypes };