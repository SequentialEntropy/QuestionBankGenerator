export const acceptedBlockTypes = []

export class Prompt {
    constructor(text) {
        this.root = document.createElement("div");
        this.root.classList.add("block__prompt");
        this.root.textContent = text;
    }
}