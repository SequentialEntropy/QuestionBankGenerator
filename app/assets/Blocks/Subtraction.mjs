import Block from "./Block.mjs";
import { OperationField, Prompt } from "../Fields/Field.mjs";

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