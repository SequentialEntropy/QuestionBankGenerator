import { VariableField, OperationField, Prompt } from "../Field.js";

class Function {
    buildShelf(className, shelfContent) {
        const shelf = document.createElement("div");
        shelf.classList.add("Function-shelf");
        shelf.classList.add(className);
        shelfContent.forEach(e => {
            shelf.appendChild(e.root);
        });
        return shelf;
    }
    createRoot() {
        const root = document.createElement("div");
        root.classList.add("Function");

        return root;
    }
    createDeleteButton() {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("Block-delete");
        deleteButton.textContent = "×";

        return deleteButton;
    }
    createShelf() {
        return this.shelfBuilder("block__default", []);
    }
    constructor() {
        this.root = this.createRoot();
        this.shelf = this.createShelf();
        this.deleteButton = this.createDeleteButton();

        this.root.appendChild(this.shelf);
        this.root.appendChild(this.deleteButton);
        /*
        <div class="Function">
            <div class="Function-shelf">
            </div>
            <button class="Block-delete">
            ×
            </button>
        </div>
        */
        this.root.addEventListener("mouseover", e => {
            e.stopPropagation();
            this.shelf.classList.add("Function-shelf__hover");
            this.deleteButton.classList.add("Block-delete__show");
        });
        this.root.addEventListener("mouseout", e => {
            e.stopPropagation();
            this.shelf.classList.remove("Function-shelf__hover");
            this.deleteButton.classList.remove("Block-delete__show");
        })

        this.deleteButton.addEventListener("click", e => {
            if (!confirm(`Are you sure you want to delete the selected Function?`)) {
                return;
            }

            const parentField = this.root.closest(".FunctionsShelf");
            const event = new CustomEvent("deleteFunction", {
                detail: this.root
            });

            parentField.dispatchEvent(event);
        })
    }
}

class RenderFunction extends Function {
    createShelf() {
        return this.buildShelf("block__render", [
            new Prompt("Render"),
            new OperationField()
        ]);
    }
    constructor() {
        super();
    }
}

class SetFunction extends RenderFunction {
    createShelf() {
        return this.buildShelf("block__operation", [
            new Prompt("Set the value of"),
            new VariableField(),
            new Prompt("to"),
            new OperationField()
        ])
    }
    constructor() {
        super();
    }
}

export { RenderFunction, SetFunction };