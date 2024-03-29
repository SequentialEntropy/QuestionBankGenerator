// All BlockTypes
import * as OperationAddition from "./Addition.Operation.Block.mjs";
import * as OperationSubtraction from "./Subtraction.Operation.Block.mjs";
import * as OperationMultiplication from "./Multiplication.Operation.Block.mjs";
import * as OperationDivision from "./Division.Operation.Block.mjs";
import * as OperationPower from "./Power.Operation.Block.mjs";
import * as OperationSquareRoot from "./SquareRoot.Operation.Block.mjs";
import * as OperationNthRoot from "./NthRoot.Operation.Block.mjs";
import * as OperationPi from "./Pi.Operation.Block.mjs";

import * as RenderAddition from "./Addition.Render.Block.mjs";
import * as RenderSubtraction from "./Subtraction.Render.Block.mjs";
import * as RenderMultiplication from "./Multiplication.Render.Block.mjs";
import * as RenderDivision from "./Division.Render.Block.mjs";
import * as RenderPower from "./Power.Render.Block.mjs";
import * as RenderSquareRoot from "./SquareRoot.Render.Block.mjs";
import * as RenderNthRoot from "./NthRoot.Render.Block.mjs";
import * as RenderPi from "./Pi.Render.Block.mjs";
// Operation-only BlockTypes
import * as OperationRound from "./Round.Operation.Block.mjs";
// Render-only BlockTypes
import * as RenderImplicitMultiplication from "./ImplicitMultiplication.Render.Block.mjs";
import * as RenderParentheses from "./Parentheses.Render.Block.mjs";
import * as RenderEquals from "./Equals.Render.Block.mjs";
import * as RenderSubscript from "./Subscript.Render.Block.mjs";
// Others
import * as Text from "./Text.Block.mjs";
import * as Number from "./Number.Block.mjs";
import * as Variable from "./Variable.Block.mjs";
// Convert Operation to Render
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
        Division: OperationDivision,
        Power: OperationPower,
        SquareRoot: OperationSquareRoot,
        NthRoot: OperationNthRoot,
        Pi: OperationPi,
        Round: OperationRound
    },
    Render: {
        Equals: RenderEquals,
        Addition: RenderAddition,
        Subtraction: RenderSubtraction,
        Multiplication: RenderMultiplication,
        ImplicitMultiplication: RenderImplicitMultiplication,
        Division: RenderDivision,
        Parentheses: RenderParentheses,
        Power: RenderPower,
        Subscript: RenderSubscript,
        SquareRoot: RenderSquareRoot,
        NthRoot: RenderNthRoot,
        Pi: RenderPi
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
// Create new Block by calling eg.
// createBlock({
//     blockType: "Operation",
//     operationName: "Addition"
// })

function getBlockTemplate(data) {
    return getBlockType(data).template
}
// Get Block template by calling eg.
// getBlockTemplate({
//     blockType: "Operation",
//     operationName: "Addition"
// })

function getBlockEvaluate(blockData, fields) {
    return getBlockType(blockData).evaluate(fields)
}
// Evaluate Block by calling eg.
// getBlockEvaluate({
//     blockType: "Operation",
//     operationName: "Addition"
// },
// [
//     1,
//     2
// ])
// returns 1 + 2, hence, 3

export { blockTypes, createBlock, getBlockTemplate, getBlockEvaluate }