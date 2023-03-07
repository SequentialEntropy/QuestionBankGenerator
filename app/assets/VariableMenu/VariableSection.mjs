import QuestionAPI from "../../question/client/question.api.mjs";

export class VariableSection {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="section theme__background--drop-down">
            <div class="section__area theme__color--variable">
                <div class="section__heading">
                    <div class="section__title">Variables</div>
                </div>
                <div class="function-menu">
                    <div class="function-menu__shelf"></div>
                    <div class="function-menu__create-variable"></div>
                </div>
            </div>
            <!--
            Dummy section-drop-zone as divider
            -->
            <div class="section-drop-zone"></div>
        </div>
        `).children[0];
    }
    constructor(variables=[]) {
        this.root = this.createRoot();
        this.area = this.root.querySelector(".section__area");
        this.title = this.root.querySelector(".section__title");
        this.shelf = this.root.querySelector(".function-menu__shelf");
        this.root.querySelector(".function-menu__create-variable").appendChild((new CreateVariableButton).root);

        this.shelf.addEventListener("createVariable", async e => {
            const variableName = e.detail.variableName;

            const variables = QuestionAPI.getVariables();

            if ((await variables).includes(variableName)) {
                alert(`A variable named "${variableName}" already exists!`);
                return
            }

            this.shelf.appendChild((new Variable(variableName)).root);

            QuestionAPI.createVariable(variableName);
        })

        this.shelf.addEventListener("deleteVariable", async e => {
            const variableName = e.detail.variableName;

            QuestionAPI.deleteVariable(variableName);
        })

        variables.forEach(variableName => {
            this.shelf.appendChild((new Variable(variableName)).root);
        })
    }
}

class Variable {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="function" draggable="false">
            <div class="function__shelf theme__color--variable">
                <div class="block__prompt">
                </div>
            </div>
            <button class="block__delete">
            ×
            </button>
        </div>

        `).children[0];
    }
    constructor(variableName) {
        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".function__shelf");
        this.variable = this.root.querySelector(".block__prompt");
        this.deleteButton = this.root.querySelector(".block__delete");

        this.variable.textContent = variableName;

        this.root.addEventListener("mouseover", e => {
            e.stopPropagation();
            this.shelf.classList.add("function__shelf--hover");
            this.deleteButton.classList.add("block__delete--show");
        })
        this.root.addEventListener("mouseout", e => {
            e.stopPropagation();
            this.shelf.classList.remove("function__shelf--hover");
            this.deleteButton.classList.remove("block__delete--show");
        })

        this.deleteButton.addEventListener("click", e => {
            if (!confirm(`Are you sure you want to delete the variable named "${this.variable.textContent}"?`)) {
                return;
            }

            const shelf = this.root.closest(".function-menu__shelf");

            const event = new CustomEvent("deleteVariable", {
                detail: {
                    variableName: this.variable.textContent
                }
            });

            shelf.dispatchEvent(event);

            shelf.removeChild(this.root);
        })
    }
}

class CreateVariableButton {
    constructor() {
        this.root = document.createElement("div");
        this.root.contentEditable = true;

        this.root.textContent = "+ Create Variable";
        this.root.classList.add("function-menu__input");
        this.root.classList.add("theme__outline--dashed");
        this.root.classList.add("theme__color--default");
        
        this.root.addEventListener("mouseover", e => {
            this.root.classList.add("function-menu__input--hover");
        })
        
        this.root.addEventListener("mouseout", e => {
            this.root.classList.remove("function-menu__input--hover");
        })
        
        this.root.addEventListener("focus", e => {
            const height = this.root.clientHeight;

            this.root.style.minHeight = height + "px";

            this.root.classList.remove("theme__color--default");
            this.root.classList.add("theme__color--variable");
            this.root.classList.add("function-menu__input--focus");

            this.root.textContent = "";
        })
        
        this.root.addEventListener("blur", e => {

            this.root.style.minHeight = "";

            this.root.classList.add("theme__color--default");
            this.root.classList.remove("theme__color--variable");
            this.root.classList.remove("function-menu__input--focus");

            if (this.root.textContent != "") {
                const shelf = this.root.closest(".function-menu").querySelector(".function-menu__shelf");

                const event = new CustomEvent("createVariable", {
                    detail: {
                        variableName: this.root.textContent
                    }
                })

                shelf.dispatchEvent(event);
            }

            this.root.textContent = "+ Create Variable";
        })
    }
}