import Block from "./Block.mjs";
import { OperationField, Prompt } from "../Fields/Field.mjs";

export default class Division extends Block {
    shelfContent() { return [
        new OperationField(),
        new Prompt("÷"),
        new OperationField()
    ]}
    constructor(data) {
        super(data);
        this.type = "Division";
    }
}