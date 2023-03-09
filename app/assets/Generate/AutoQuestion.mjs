import katex from 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.mjs';

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
                    <div class="section__title override__font--times-new-roman">Question #</div>
                </div>
                <div class="auto-area">
                </div>
            </div>
        </div>
        `).children[0];
    }
    constructor(questionNumber, variableOptions, prompt, steps) {
        this.root = this.createRoot();
        this.root.querySelector(".section__title").textContent = `Question ${questionNumber}`;

        this.variables = {};
        this.rollVariables(variableOptions);

        console.log(prompt);
        console.log(steps);

        this.autoArea = this.root.querySelector(".auto-area");

        this.autoArea.appendChild(this.evaluateStep(prompt));

        for (let stepNumber = 1; stepNumber <= steps.length; stepNumber++) {
            const stepSubheading = document.createElement("div");
            stepSubheading.classList.add("override__font--times-new-roman");
            stepSubheading.classList.add("section__sub-title");
            stepSubheading.classList.add("auto-area__sub-title");

            if (stepNumber == steps.length) {
                stepSubheading.textContent = "Answer"
            } else {
                stepSubheading.textContent = `Step ${stepNumber}`
            }

            this.autoArea.appendChild(stepSubheading);
            this.autoArea.appendChild(this.evaluateStep(steps[stepNumber - 1]));
        }
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
    evaluateStep(stepData) {

        const root = document.createElement("div");
        root.classList.add("auto-step");

        stepData.forEach(functionData => {
            console.log(functionData)
            const result = this.evaluateFunction(functionData);

            if (result !== null) {
                console.log(result)
                root.appendChild(result);
            }
        })

        return root
    }
    evaluateFunction(functionData) {
        switch (functionData.functionType) {
            case "Text":
                return this.evaluateTextFunction(functionData)
            case "Render":
                return null
            case "Set":
                return null
        }
    }
    evaluateTextFunction(functionData) {
        const textElement = document.createElement("div");
        textElement.classList.add("auto-step__text");
        textElement.classList.add("override__font--times-new-roman");
        
        textElement.textContent = functionData.value;

        return textElement
    }
}