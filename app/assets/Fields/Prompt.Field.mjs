export const acceptedBlockTypes = []

export class Prompt {
    constructor(text) {
        this.root = document.createElement("div");
        this.root.classList.add("Block-prompt");
        this.root.textContent = text;
    }
}