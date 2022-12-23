import Block from "./Block.js";
import { OperationField, Prompt } from "../Field.js";

export default class Subtraction extends Block {
    shelfContent() { return [
        new OperationField(),
        new Prompt("−"),
        new OperationField()
    ]}
    constructor(data) {
        super(data);
        this.type = "Subtraction";
    }
}