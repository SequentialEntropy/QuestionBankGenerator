import Addition from "./Addition.js";
import Subtraction from "./Subtraction.js";
import Multiplication from "./Multiplication.js";
import Division from "./Division.js";

const operationTypes = {
    Addition: Addition,
    Subtraction: Subtraction,
    Multiplication: Multiplication,
    Division: Division
}

function CreateBlock(operationType) {
    return new (operationTypes[operationType])();
}

export { CreateBlock, operationTypes };