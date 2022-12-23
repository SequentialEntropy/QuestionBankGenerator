import Block from "./Block.js";
import { OperationField, Prompt } from "../Field.js";

export default class Addition extends Block {
    shelfContent() { return [
        new OperationField(),
        new Prompt("+"),
        new OperationField()
    ]}
    constructor(data) {
        super(data);
        this.type = "Addition";
    }
}