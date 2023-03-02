import { Variable } from "./Variable.Field.mjs";
import OperationInput from "../DropDowns/OperationInput.mjs";

export const acceptedBlockTypes = [
    "Number",
    "Variable",
    "Operation"
]

export class Operation extends Variable {
    createInput() {
        return new OperationInput();
    }
    constructor() {
        super();
        this.fieldType = "Operation"
    }
}