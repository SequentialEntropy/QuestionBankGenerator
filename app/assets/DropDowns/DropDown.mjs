export default class DropDown {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="drop-down" draggable="false">
            <button class="drop-down__toggle">
            Expand
            </button>

            <div class="drop-down__list">
                <!--
                <button class="drop-down__choice">A</button>
                -->
            </div>
        </div>
        `).children[0];
    }
    constructor() {
        this.root = this.createRoot();
        this.toggle = this.root.querySelector(".drop-down__toggle");
        this.list = this.root.querySelector(".drop-down__list");

        this.toggle.addEventListener("click", () => {
            this.list.classList.add("drop-down__list--show");
        })

        window.addEventListener("click", e => {
            if (e.target != this.toggle) {
                this.list.classList.remove("drop-down__list--show");
            }
        })
    }
}

/**
 * Create a choice element for the dropdown
 * @param {String} prompt
 * @returns {Node} Button element, add to the dropdown by invoking this.list.appendChild()
 */
export function createChoice(prompt) {
    const choice = document.createElement("button");
    choice.classList.add("drop-down__choice");
    
    choice.textContent = prompt;

    return choice;
}