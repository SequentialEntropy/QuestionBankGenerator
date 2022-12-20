export default class DropDown {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="dropDown" draggable="false">
            <button class="dropDown-toggle">
            Expand
            </button>

            <div class="dropDown-list">
                <!--
                <button class="dropDown-choice">A</button>
                -->
            </div>
        </div>
        `).children[0];
    }
    constructor() {
        this.root = this.createRoot();
        this.toggle = this.root.querySelector(".dropDown-toggle");
        this.list = this.root.querySelector(".dropDown-list");

        this.toggle.addEventListener("click", () => {
            this.list.classList.add("dropDown-list__show");
        })

        window.addEventListener("click", e => {
            if (e.target != this.toggle) {
                this.list.classList.remove("dropDown-list__show");
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
    choice.classList.add("dropDown-choice");
    
    choice.textContent = prompt;

    return choice;
}