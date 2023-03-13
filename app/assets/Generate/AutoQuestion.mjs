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
    rollVariables(variableOptions) { // Method to randomise all variables, parameter takes an array of variable generation options
        variableOptions.forEach(variable => { // Loop through each variable, and roll random values
            this.variables[variable.variableName] = this.roll(variable.minimum, variable.maximum, variable.order);
        });
    }
    roll(min, max, order) { // Method to generate a random, rounded number - the order parameter is in the format 10^n
        let result;

        if (min.equals(max)) { // If the minimum value is exactly the same as the maximum, randomisation is not needed
            result = min;
        } else {
            result = Decimal.random().times(max.minus(min)).plus(min); // Generate a random number between min and max
        }

        const rounded = ((result.dividedBy(order)).round()).times(order); // Round the number to the nearest order

        return rounded; // Return the random number - this will be assigned to the variables
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
        const renderElement = document.createElement("div"); // Create HTML element
        renderElement.classList.add("auto-step__render");

        // Get formatted string in TeX format
        const render = this.evaluateRenderBlock(functionData["fields"][0]["value"]);

        

        // Convert formatted string into rendered equation
        katex.render( // Using the KaTex library to render TeX
            render
            , renderElement, {
            throwOnError: false
        });
        // Return HTML element
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
    evaluateRenderBlock(blockData) { // Takes in a tree of Render Blocks and returns a formatted string result

        if (blockData === null) { // Base case - Empty field - defaults to an empty string when formatting
            return "";
        }

        switch (blockData.blockType) {
            case "Render":
                let renderComponents;

                if (blockData.hasOwnProperty("fields")) { // Some blockTypes don't have fields - like pi
                    renderComponents = blockData.fields.map(fieldData => { // Loop for each child node
                        const nextBlock = fieldData.value; // Move down to child node
    
                        return this.evaluateRenderBlock(nextBlock); // Recurse and return the formatted result
                    });
                }

                const evaluateResult = getBlockEvaluate( // Format - concatenate the strings
                    blockData,
                    renderComponents
                );

                return evaluateResult; // Return the result - a string

            case "Evaluate":
                return this.evaluateOperationBlock(blockData.fields[0].value).toString(); // Convert Operation into a string

            case "Text":
                return blockData.value; // Base case - texts don't have children - must be a leaf node
        }
    }
    evaluateOperationBlock(blockData) { // Takes in a tree of Operation Blocks and returns a calculated integer result
        if (blockData === null) { // Base case - Empty field - defaults to 0 when evaluating
            return new Decimal("0");
        }

        switch (blockData.blockType) {
            case "Operation":
                let operationComponents;

                if (blockData.hasOwnProperty("fields")) { // Some blockTypes don't have fields - like pi
                    operationComponents = blockData.fields.map(fieldData => { // Loop for each child node
                        const nextBlock = fieldData.value; // Move down to child node
    
                        return this.evaluateOperationBlock(nextBlock); // Recurse and return the evaluated result
                    })
                }

                const evaluateResult = getBlockEvaluate( // Calculate - apply the operation
                    blockData,
                    operationComponents
                );

                return evaluateResult; // Return the result - a number

            case "Variable": // Base case - Variables have no children - must be a leaf node
                if (!this.variables.hasOwnProperty(blockData.variableName)) { // If variable does not exist
                    return new Decimal("0"); // Return a default value of 0
                }

                return this.variables[blockData.variableName]; // Return the stored value - a number

            case "Number": // Base case - Numbers have no children - must be a leaf node
                return new Decimal(blockData.value); // Return a number
        }
    }
}