import Decimal from "../../libs/decimal.mjs";

export default class AutoQuestion {
    createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="section theme__background--drop-down">
            <div class="section-drop-zone"></div>
            <div class="section__area theme__color--default">
                <div class="section__heading">
                    <div class="section__title">Question #</div>
                </div>
            </div>
        </div>
        `).children[0];
    }
    constructor(questionNumber, variableOptions) {
        this.root = this.createRoot();
        this.root.querySelector(".section__title").textContent = `Question ${questionNumber}`;

        this.variables = {};
        this.rollVariables(variableOptions);
    }
    rollVariables(variableOptions) {
        variableOptions.forEach(variable => {
            this.variables[variable.variableName] = this.roll(variable.minimum, variable.maximum, variable.order).toString();
        });
    }
    roll(min, max, order) {
        const result = Decimal.random().times(max.minus(min).plus(min));

        const rounded = ((result.dividedBy(order)).round(order)).times(order);

        return rounded
    }
}