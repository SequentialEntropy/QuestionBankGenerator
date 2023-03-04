import Block from "./Block.mjs";

export class Text extends Block {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="Block" draggable="false">
            <div class="Block-shelf block__default Block-input" contenteditable></div>
            <button class="Block-delete">
            ×
            </button>
        </div>

        `).children[0];
    }
    constructor(data) {
        super(data);
        this.type = "Text";
        this.shelf.addEventListener("dragover", e => {
            e.preventDefault();
        })
        this.shelf.addEventListener("input", e => {

            const field = this.root.closest(".Block-field");
            const event = new CustomEvent("editBlock", {
                detail: {
                    newValue: this.shelf.textContent
                }
            })

            field.dispatchEvent(event);
        })

        this.shelf.addEventListener("focus", e => {

            const height = this.shelf.clientHeight;

            this.shelf.style.minHeight = height + "px";

            if (this.shelf.classList.contains("text__default")) {
                const width = this.shelf.clientWidth;

                this.shelf.style.minWidth = width + "px";

                this.shelf.textContent = "";
                
                this.shelf.classList.remove("text__default");
            }

        })

        this.shelf.addEventListener("blur", e => {
            
            if (this.shelf.textContent == "") {
                
                this.shelf.textContent = "Text";
                
                this.shelf.classList.add("text__default");
                
            }
            
            this.shelf.style.minWidth = "";

            this.shelf.style.minHeight = "";
            
        })
    }
    initialiseFields(data) {
        const value = data.value;

        if (value !== null) {
            this.shelf.textContent = value;
            return
        }
        
        this.shelf.classList.add("text__default");
        this.shelf.textContent = "Text";
    }
}

export const template = {
    "blockType": "Text",
    "value": null
}