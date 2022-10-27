import DropDown from "./DropDown.js";
import QuestionAPI from "./QuestionAPI.js";

export default class VariableInput extends DropDown {
    constructor() {
        super();
        this.toggle.textContent = "Choose Variable";

        this.toggle.addEventListener("click", async () => {
            this.list.textContent = "";

            const variables = await QuestionAPI.getVariables();

            variables.forEach(v => {
                this.list.appendChild(VariableInput.variableChoice(v, this.toggle));
            });
        })
    }
    static variableChoice(v, toggle) {
        const choice = document.createElement("button");
        choice.classList.add("dropDown-choice");

        choice.textContent = v;

        choice.addEventListener("click", () => {
            toggle.textContent = v;
        });

        return choice;
    }
}