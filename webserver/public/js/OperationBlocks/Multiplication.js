import Block from "../Block.js";
import { OperationField, Prompt } from "../Field.js";

export default class Multiplication extends Block {
    shelfContent() { return [
        new OperationField(),
        new Prompt("×"),
        new OperationField()
    ]}
    constructor() {
        super();
        this.type = "Multiplication";
    }
}