import { VariableField, OperationField, Prompt, Break, Spacer } from "./Field.js";

class RenderFunction {
    builder(className, shelf) {
        const root = document.createElement("div");
        root.classList.add("Function");
        root.classList.add(className);
        shelf.forEach(e => {
            root.appendChild(e.root);
        })
        return root;
    }
    createRoot() {
        return this.builder("block__render", [
            new Prompt("Render"),
            // new Break(),
            new OperationField()
        ]);
    }
    constructor() {
        this.root = this.createRoot();
    }
}

class SetFunction extends RenderFunction {
    createRoot() {
        return this.builder("block__operation", [
            new Prompt("Set the value of"),
            // new Spacer(),
            new VariableField(),
            // new Spacer(),
            new Prompt("to"),
            // new Spacer(),
            new OperationField()
        ])
    }
    constructor() {
        super();
    }
}

export { RenderFunction, SetFunction };