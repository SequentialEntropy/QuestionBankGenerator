import { Variable } from "./Variable.Field.mjs";
import RenderInput from "../DropDowns/RenderInput.mjs";

export const acceptedBlockTypes = [
    "Render"
]

export class Render extends Variable {
    createInput() {
        return new RenderInput();
    }
    constructor() {
        super();
        this.fieldType = "Render"
    }
}