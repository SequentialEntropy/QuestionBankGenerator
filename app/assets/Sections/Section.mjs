import QuestionAPI from "../../question/client/question.api.mjs";
import SectionDropZone from "./SectionDropZone.mjs";
import DropDown, { createChoice } from "../DropDowns/DropDown.mjs";
import { createFunction } from "../Functions/Function.routes.mjs";

class Section {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="section">
            <div class="section__area theme__color--default">
                <div class="section__heading">
                    <div class="section__title">Step #</div>
                    <!--
                    <button class="section__delete deleteButton">Delete</button>
                    -->
                </div>
                <div class="function-menu">
                    <div class="function-menu__shelf"></div>
                </div>
            </div>
            <!--
            <div class="section-drop-zone"></div>
            -->
        </div>
        `).children[0];
    }
    constructor(content=[]) {
        this.root = this.createRoot();
        this.area = this.root.querySelector(".section__area");
        this.title = this.root.querySelector(".section__title");
        this.shelf = this.root.querySelector(".function-menu__shelf");
        this.root.querySelector(".function-menu").appendChild((new CreateFunctionButton).root);

        this.shelf.addEventListener("createFunction", e => {
            const functionType = e.detail;

            QuestionAPI.createFunction(this.getIndex() - 1, {
                functionType
            });

            this.shelf.appendChild(createFunction(functionType).root);
        })

        this.shelf.addEventListener("deleteFunction", e => {
            const selectedFunction = e.detail;

            const functions = Array.from(this.shelf.querySelectorAll(".function"));

            const functionIndex = functions.indexOf(selectedFunction);

            QuestionAPI.deleteFunction(this.getIndex() - 1, functionIndex);

            this.shelf.removeChild(selectedFunction);
        })

        this.dropZone = SectionDropZone.init();
        this.root.appendChild(this.dropZone);

        content.forEach(e => {
            let functionData;
            if (e.functionType != "Text") {
                functionData = e.fields;
            } else {
                functionData = e.value;
            }
            const newFunction = createFunction(e.functionType, functionData);
            this.shelf.appendChild(newFunction.root);
        })
    }
    getIndex() {
        const sectionShelf = this.root.closest(".section-menu__shelf");
        const allSections = Array.from(sectionShelf.querySelectorAll(".section"));
        return allSections.indexOf(this.root);
    }
}    

export class PromptSection extends Section {
    constructor(content=[]) {
        super(content);
        this.title.textContent = "Prompt";
    }
}

export class StepSection extends Section {
    constructor(content=[]) {
        super(content);
        this.area.draggable = true;

        const heading = this.root.querySelector(".section__heading");
        heading.appendChild(this.createDeleteButton());

        this.area.addEventListener("dragstart", e => {
            const data = {
                type: "Section",
                id: this.getIndex() - 1
            };
            e.dataTransfer.setData("text/plain", JSON.stringify(data));
        })
    }
    createDeleteButton() {
        /*
        <button class="section__delete deleteButton">Delete</button>
        */
       
       const buttonElement = document.createElement("button");
       buttonElement.classList.add("section__delete");
       buttonElement.classList.add("deleteButton");
       
       buttonElement.textContent = "Delete";
       
       buttonElement.addEventListener("click", () => {
            if (!confirm(`Are you sure you want to delete Step ${this.getIndex()}?`)) {
                return;
            }
            
            const sectionShelf = this.root.closest(".section-menu__shelf");
            const event = new CustomEvent("deleteSection", {
                detail: this.root
            });
            
            sectionShelf.dispatchEvent(event);
        });
        
        return buttonElement;
    }
}

export class ButtonSection {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="section">
            <div class="section__area theme__color--default">
                <button class="section__button">+ Create Step</button>
            </div>
        </div>
        `).children[0];
    }
    constructor() {
        this.root = this.createRoot();
    }
}

class CreateFunctionButton extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "+ Create Function";
        this.root.classList.add("function-menu__create-function");
        this.toggle.classList.add("theme__outline--dashed");

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

function createFunctionChoice(functionType) {
    const choice = createChoice(functionType);
    choice.addEventListener("click", e => {
        const shelf = choice.closest(".function-menu").querySelector(".function-menu__shelf");
        const event = new CustomEvent("createFunction", {
            detail: functionType
        });
        shelf.dispatchEvent(event);
    })

    return choice;
}