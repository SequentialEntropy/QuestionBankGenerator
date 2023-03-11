export default class VariableConfig {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="section theme__background--drop-down">
            <div class="section__area theme__color--variable">
                <div class="section__heading">
                    <div class="section__title">Variables</div>
                </div>
                <div class="function-menu">
                    <div class="function-menu__shelf"></div>
                </div>
            </div>
            <!--
            Dummy section-drop-zone as divider
            -->
            <div class="section-drop-zone"></div>
        </div>
        `).children[0];
    }
    constructor(variables=[]) {
        this.root = this.createRoot();
        this.area = this.root.querySelector(".section__area");
        this.shelf = this.root.querySelector(".function-menu__shelf");
        this.variableInstances = [];

        variables.forEach(variableName => {
            const newVariable = new Variable(variableName);

            this.shelf.appendChild(newVariable.root);

            this.variableInstances.push(newVariable);
        })
    }
}

class Variable {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`

        <div class="function function--full-width" draggable="false">
            <div class="function__shelf theme__color--variable">
                <div class="block__prompt">
                    Randomise
                </div>
                <div class="block">
                    <div class="block__shelf block--variable theme__color--variable"></div>
                </div>
                <div class="block__prompt">
                    to a value between
                </div>
                <div class="block">
                    <input class="block__shelf theme__color--white block--input" type="number" placeholder="Min">
                </div>
                <div class="block__prompt">
                    and
                </div>
                <div class="block">
                    <input class="block__shelf theme__color--white block--input" type="number" placeholder="Max">
                </div>
                <div class="block__prompt">
                    rounded to the nearest
                </div>
                <div class="block">
                    <input class="block__shelf theme__color--white block--input" type="number" placeholder="Order">
                </div>
            </div>
        </div>

        `).children[0];
    }
    constructor(variableName) {
        this.root = this.createRoot();
        this.shelf = this.root.querySelector(".function__shelf");
        this.variable = this.shelf.querySelector(".block--variable");

        const fields = Array.from(this.shelf.querySelectorAll(".block--input"));

        this.minimumField = fields[0];
        this.maximumField = fields[1];
        this.orderField = fields[2];

        this.minimumField.value = "0";
        this.maximumField.value = "10";
        this.orderField.value = "0.1";
        
        this.variable.textContent = variableName;
    }
    getValues() {
        return {
            minimum: this.minimumField.value,
            maximum: this.maximumField.value,
            order: this.orderField.value
        }
    }
    getVariableName() {
        return this.variable.textContent
    }
}