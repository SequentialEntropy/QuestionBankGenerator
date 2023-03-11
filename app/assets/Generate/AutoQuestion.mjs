import katex from 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.mjs';

import Decimal from "../../libs/decimal.mjs";
import { getBlockEvaluate } from '../Blocks/Block.routes.mjs';

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
            this.variables[variable.variableName] = this.roll(variable.minimum, variable.maximum, variable.order);
        });
    }
    roll(min, max, order) {
        const result = Decimal.random().times(max.minus(min)).plus(min);

        const rounded = ((result.dividedBy(order)).round()).times(order);

        return rounded
    }
    evaluateStep(stepData) {

        const root = document.createElement("div");
        root.classList.add("auto-step");

        stepData.forEach(functionData => {

            const result = this.evaluateFunction(functionData);

            if (result !== null) {
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
                return this.evaluateRenderFunction(functionData)
            case "Set":
                return this.evaluateSetFunction(functionData)
        }
    }
    evaluateTextFunction(functionData) {
        const textElement = document.createElement("div");
        textElement.classList.add("auto-step__text");
        textElement.classList.add("override__font--times-new-roman");
        
        textElement.textContent = functionData.value;

        return textElement
    }
    evaluateRenderFunction(functionData) {
        const renderElement = document.createElement("div");
        renderElement.classList.add("auto-step__render");

        const render = this.evaluateRenderBlock(functionData["fields"][0]["value"]);

        katex.render(
            render
            , renderElement, {
            throwOnError: false
        });

        return renderElement
    }
    evaluateSetFunction(functionData) {
        
        if (functionData.fields[0].value === null) {
            return null;
        }
        
        const variableName = functionData.fields[0].value.variableName;

        const operationBlock = functionData.fields[1].value;

        const value = this.evaluateOperationBlock(operationBlock);

        this.variables[variableName] = value;

        return null
    }
    evaluateRenderBlock(blockData) {

        if (blockData === null) {
            return ""
        }

        switch (blockData.blockType) {
            case "Render":
                
                let renderComponents;

                if (blockData.hasOwnProperty("fields")) {
                    renderComponents = blockData.fields.map(fieldData => {
                        const nextBlock = fieldData.value;
    
                        return this.evaluateRenderBlock(nextBlock);
                    })
                }

                const evaluateResult = getBlockEvaluate(
                    blockData,
                    renderComponents
                );

                return evaluateResult
            case "Evaluate":
                return this.evaluateOperationBlock(blockData.fields[0].value).toString()
            case "Text":
                return blockData.value
        }
    }
    evaluateOperationBlock(blockData) {

        const test = parseInt(Math.random() * 100)

        if (blockData === null) {
            return new Decimal("0")
        }

        switch (blockData.blockType) {
            case "Operation":

                let operationComponents;

                if (blockData.hasOwnProperty("fields")) {
                    operationComponents = blockData.fields.map(fieldData => {
                        const nextBlock = fieldData.value;
    
                        return this.evaluateOperationBlock(nextBlock);
                    })
                }

                const evaluateResult = getBlockEvaluate(
                    blockData,
                    operationComponents
                );

                return evaluateResult
            case "Variable":
                if (!this.variables.hasOwnProperty(blockData.variableName)) {
                    return null
                }

                return this.variables[blockData.variableName]
            case "Number":
                return new Decimal(blockData.value)
        }
    }
}