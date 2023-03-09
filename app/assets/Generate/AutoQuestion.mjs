import Decimal from "../../libs/decimal.mjs";

export default class AutoQuestion {
    createRoot() {
        return document.createElement("div");
    }
    constructor(questionNumber, variableOptions) {
        this.root = this.createRoot();

        this.questionNumber = questionNumber;
        this.variableOptions = variableOptions;

        this.root.textContent = this.questionNumber;

        this.variables = {};

        this.rollVariables();
    }
    rollVariables() {
        this.variableOptions.forEach(variable => {
            this.variables[variable.variableName] = this.roll(variable.minimum, variable.maximum, variable.order).toString();
        });
    }
    roll(min, max, order) {
        const result = Decimal.random().times(max.minus(min).plus(min));

        const rounded = ((result.dividedBy(order)).round(order)).times(order);

        return rounded
    }
}