export class VariableSection {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="section theme__background--drop-down">
            <div class="section__area theme__color--variable">
                <div class="section__heading">
                    <div class="section__title">Variables</div>
                    <!--
                    <button class="section__delete deleteButton">Delete</button>
                    -->
                </div>
                <div class="function-menu">
                    <div class="function-menu__shelf"></div>
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
        // this.root.querySelector(".function-menu").appendChild((new CreateFunctionButton).root);

        // this.shelf.addEventListener("createFunction", e => {
        //     const functionType = e.detail;

        //     QuestionAPI.createFunction(this.getIndex() - 1, {
        //         functionType
        //     });

        //     this.shelf.appendChild(createFunction(functionType).root);
        // })

        // this.shelf.addEventListener("deleteFunction", e => {
        //     const selectedFunction = e.detail;

        //     const functions = Array.from(this.shelf.querySelectorAll(".function"));

        //     const functionIndex = functions.indexOf(selectedFunction);

        //     QuestionAPI.deleteFunction(this.getIndex() - 1, functionIndex);

        //     this.shelf.removeChild(selectedFunction);
        // })

        // content.forEach(e => {
        //     let functionData;
        //     if (e.functionType != "Text") {
        //         functionData = e.fields;
        //     } else {
        //         functionData = e.value;
        //     }
        //     const newFunction = createFunction(e.functionType, functionData);
        //     this.shelf.appendChild(newFunction.root);
        // })
    }
}

class CreateVariable {
    constructor() {
        this.toggle.textContent = "+ Create Function";
        this.root.classList.add("function-menu__create-function");

        const textChoice = createFunctionChoice("Text");
        textChoice.classList.add("theme__color--white");
        this.list.appendChild(textChoice);
        
        const renderChoice = createFunctionChoice("Render");
        renderChoice.classList.add("theme__color--render");
        this.list.appendChild(renderChoice);
        
        const setChoice = createFunctionChoice("Set");
        setChoice.classList.add("theme__color--operation");
        this.list.appendChild(setChoice);
    }
}