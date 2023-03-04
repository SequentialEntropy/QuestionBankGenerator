import Function from "./Function.mjs";
import QuestionAPI from "../../question/client/question.api.mjs";

export class Text extends Function {
    createShelf() {
        const shelf = document.createElement("span");
        shelf.classList.add("Function-shelf");
        shelf.classList.add("Block-input");
        shelf.classList.add("Function__text");
        shelf.contentEditable = true;
        
        shelf.addEventListener("focus", e => {
            shelf.classList.add("Function__text__focus");

            const height = shelf.clientHeight;

            shelf.style.minHeight = height + "px";

            if (shelf.classList.contains("text__default")) {
                const width = shelf.clientWidth;

                shelf.style.minWidth = width + "px";

                shelf.textContent = "";
                
                shelf.classList.remove("text__default");
            }
        })
        
        shelf.addEventListener("blur", e => {
            shelf.classList.remove("Function__text__focus");
            if (shelf.textContent == "") {
                shelf.textContent = "Text";
                shelf.classList.add("text__default");
            }
            shelf.style.minWidth = "";

            shelf.style.minHeight = "";
        })
        
        shelf.addEventListener("input", e => {
            QuestionAPI.editFunction(this.getPath(), {
                newValue: shelf.textContent
            });
        })
        
        return shelf;
    }
    constructor(fieldsData = null) {
        super(fieldsData);
    }
    initialiseFields(fieldsData) {
        if (fieldsData === null) {
            this.shelf.classList.add("text__default");
            this.shelf.textContent = "Text";
            return;
        }
        this.shelf.textContent = fieldsData;
    }
}

export const template = {
    "functionType": "Text",
    "value": null
}