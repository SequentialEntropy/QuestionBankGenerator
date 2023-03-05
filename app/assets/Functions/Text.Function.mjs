import Function from "./Function.mjs";
import QuestionAPI from "../../question/client/question.api.mjs";

export class Text extends Function {
    createShelf() {
        const shelf = document.createElement("span");
        shelf.classList.add("function__shelf");
        shelf.classList.add("block--input");

        shelf.contentEditable = true;
        
        shelf.addEventListener("focus", e => {
            shelf.classList.add("function__shelf--focus");

            const height = shelf.clientHeight;

            shelf.style.minHeight = height + "px";

            if (shelf.classList.contains("override__text--default")) {
                const width = shelf.clientWidth;

                shelf.style.minWidth = width + "px";

                shelf.textContent = "";
                
                shelf.classList.remove("override__text--default");
            }
        })
        
        shelf.addEventListener("blur", e => {
            shelf.classList.remove("function__shelf--focus");
            if (shelf.textContent == "") {
                shelf.textContent = "Text";
                shelf.classList.add("override__text--default");
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
            this.shelf.classList.add("override__text--default");
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