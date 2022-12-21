import Block from "./Block.js";
import { OperationField, Prompt } from "../Field.js";

export default class Division extends Block {
    shelfContent() { return [
        new OperationField(),
        new Prompt("÷"),
        new OperationField()
    ]}
    constructor() {
        super();
        this.type = "Division";
    }
}