import { Addition, execute as additionExecute, template as additionTemplate } from "./Addition.mjs";
import { Subtraction, execute as subtractionExecute, template as subtractionTemplate } from "./Subtraction.mjs";
import { Multiplication, execute as multiplicationExecute, template as multiplicationTemplate } from "./Multiplication.mjs";
import { Division, execute as divisionExecute, template as divisionTemplate } from "./Division.mjs";
// import * as Addition from "./Addition.mjs";
// import * as Subtraction from "./Subtraction.mjs";
// import * as Multiplication from "./Multiplication.mjs";
// import * as Division from "./Division.mjs";
import VariableBlock from "./VariableBlock.mjs";
import NumberBlock from "./NumberBlock.mjs";
import TextBlock from "./TextBlock.mjs";

const blockTypes = {
    Text: TextBlock,
    Number: NumberBlock,
    Variable: VariableBlock,
    Operation: {
        Addition: Addition,
        Subtraction: Subtraction,
        Multiplication: Multiplication,
        Division: Division
    }
}

const blockExecutes = {
    Operation: {
        Addition: additionExecute,
        Subtraction: subtractionExecute,
        Multiplication: multiplicationExecute,
        Division: divisionExecute
    }
}

const blockTemplates = {
    Operation: {
        Addition: additionTemplate,
        Subtraction: subtractionTemplate,
        Multiplication: multiplicationTemplate,
        Division: divisionTemplate
    }
}

function getBlockClass(data) {
    if (data.blockType == "Operation") {
        return blockTypes.Operation[data.operationName];
    }
    return blockTypes[data.blockType];
}

function createBlock(data) {
    return new (getBlockClass(data))(data);
}

export { createBlock, blockTypes, getBlockClass };