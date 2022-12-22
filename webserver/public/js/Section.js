import QuestionAPI from "./QuestionAPI.js";
import SectionDropZone from "./SectionDropZone.js";
import DropDown, { createChoice } from "./DropDowns/DropDown.js";
import { createFunction } from "./Functions/ModifyFunction.js";

class Section {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="Section" draggable="true">
            <div class="Section-area">
                <div class="Section-heading">
                    <div class="Section-title">Step #</div>
                    <!--
                    <button class="Section-delete deleteButton">Delete</button>
                    -->
                </div>
                <div class="FunctionsEditor">
                    <div class="FunctionsShelf"></div>
                </div>
            </div>
            <!--
            <div class="SectionDropZone"></div>
            -->
        </div>
        `).children[0];
    }
    constructor(content=[]) {
        this.root = this.createRoot();
        this.title = this.root.querySelector(".Section-title");
        this.shelf = this.root.querySelector(".FunctionsShelf");
        this.root.querySelector(".FunctionsEditor").appendChild((new CreateFunctionButton).root);

        this.shelf.addEventListener("createFunction", e => {
            const functionType = e.detail;

            QuestionAPI.createFunction(this.getIndex() - 1, functionType);

            this.shelf.appendChild(createFunction(functionType).root);
        })

        this.shelf.addEventListener("deleteFunction", e => {
            const selectedFunction = e.detail;

            const functions = Array.from(this.shelf.querySelectorAll(".Function"));

            const functionIndex = functions.indexOf(selectedFunction);

            QuestionAPI.deleteFunction(this.getIndex() - 1, functionIndex);

            this.shelf.removeChild(selectedFunction);
        })

        this.dropZone = SectionDropZone.init();
        this.root.appendChild(this.dropZone);

        content.forEach(e => {
            const newFunction = createFunction(e.functionType);
            this.shelf.appendChild(newFunction.root);
        })
    }
    getIndex() {
        const sectionShelf = this.root.closest(".SectionsShelf");
        const allSections = Array.from(sectionShelf.querySelectorAll(".Section"));
        return allSections.indexOf(this.root);
    }
}    

export class PromptSection extends Section {
    constructor(content=[]) {
        super(content);
        this.title.textContent = "Prompt";
        this.root.draggable = false;
    }
}

export class StepSection extends Section {
    constructor(content=[]) {
        super(content);
        const heading = this.root.querySelector(".Section-heading");
        heading.appendChild(this.createDeleteButton());

        this.root.addEventListener("dragstart", e => {
            const data = {
                type: "Section",
                id: this.getIndex() - 1
            };
            e.dataTransfer.setData("text/plain", JSON.stringify(data));
        })
    }
    createDeleteButton() {
        /*
        <button class="Section-delete deleteButton">Delete</button>
        */
       
       const buttonElement = document.createElement("button");
       buttonElement.classList.add("Section-delete");
       buttonElement.classList.add("deleteButton");
       
       buttonElement.textContent = "Delete";
       
       buttonElement.addEventListener("click", () => {
            if (!confirm(`Are you sure you want to delete Step ${this.getIndex()}?`)) {
                return;
            }
            
            const sectionShelf = this.root.closest(".SectionsShelf");
            const event = new CustomEvent("deleteSection", {
                detail: this.root
            });
            
            sectionShelf.dispatchEvent(event);
        });
        
        return buttonElement;
    }
}

class CreateFunctionButton extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "+ Create Function";
        this.root.classList.add("FunctionsShelf-createFunction");

        const renderChoice = createFunctionChoice("Render");
        this.list.appendChild(renderChoice);

        const setChoice = createFunctionChoice("Set");
        this.list.appendChild(setChoice);
    }
}

function createFunctionChoice(functionType) {
    const choice = createChoice(functionType);
    choice.addEventListener("click", e => {
        const shelf = choice.closest(".FunctionsEditor").querySelector(".FunctionsShelf");
        const event = new CustomEvent("createFunction", {
            detail: functionType
        });
        shelf.dispatchEvent(event);
    })

    return choice;
}