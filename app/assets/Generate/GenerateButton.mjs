import Decimal from "../../libs/decimal.mjs";

import { ButtonSection } from "../Sections/Section.mjs";
import AutoQuestion from "./AutoQuestion.mjs";

export default class GenerateButton extends ButtonSection {
    constructor(variableSection, generateSection, prompt, steps) {
        super();
        this.button.classList.add("theme__color--operation");
        this.button.textContent = "Generate Questions";

        this.prompt = prompt;
        this.steps = steps;
        this.variableSection = variableSection;
        this.generateSection = generateSection;

        const generatedQuestions = document.querySelector(".generated-questions");

        this.button.addEventListener("click", async () => {

            let variableOptions = [];

            for (let index = 0; index < this.variableSection.variableInstances.length; index++) { // Loop through each variable

                const variableName = this.variableSection.variableInstances[index].getVariableName();

                const values = this.variableSection.variableInstances[index].getValues(); // Get user input values

                try {
                    const minimum = new Decimal(values.minimum); // Converts string to Decimal

                    const maximum = new Decimal(values.maximum); // Converts string to Decimal

                    const order = new Decimal(values.order); // Converts string to Decimal

                    const log10 = order.log(); // Converts 10^n to n. If it isn't an integer, line 38 breaks the loop.

                    if (!log10.isInt()) { // Variable randomisation must be rounded to a digit, eg. 10, 100, 0.1
                        alert(`Order of magnitude for variable named "${variableName}" must be a power of 10.`);
                        return;
                    }

                    if (minimum.greaterThan(maximum)) { // Range cannot be min > max
                        alert(`Minimum cannot be greater than maximum for variable named "${variableName}".`);
                        return;
                    }

                    variableOptions.push({ // Processed data - variable ready to be randomised
                        variableName,
                        minimum,
                        maximum,
                        order
                    })
                } catch (err) { // Catches error from conversion in lines 30 ~ 34
                    if ( err instanceof Error && /DecimalError/.test(err.message) ) {
                        alert(`Missing fields for variable named "${variableName}"!`);
                        return;
                    }
                }
            }

            const questionCount = parseInt(generateSection.getCount());

            if (isNaN(questionCount)) {
                alert(`Missing field for number of questions to generate!`);
                return;
            }

            generatedQuestions.textContent = "";

            for (let questionNumber = 1; questionNumber <= questionCount; questionNumber++) {
                const newQuestion = new AutoQuestion(questionNumber, variableOptions, this.prompt, this.steps);

                generatedQuestions.appendChild(newQuestion.root);
            }
        })
    }
}