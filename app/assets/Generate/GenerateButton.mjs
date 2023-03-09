import Decimal from "../../libs/decimal.mjs";

import { ButtonSection } from "../Sections/Section.mjs";
import AutoQuestion from "./AutoQuestion.mjs";

export default class GenerateButton extends ButtonSection {
    constructor(variableSection, generateSection) {
        super();
        this.button.classList.add("theme__color--operation");
        this.button.textContent = "Generate Questions";

        this.variableSection = variableSection;
        this.generateSection = generateSection;

        const generatedQuestions = document.querySelector(".generated-questions");

        this.button.addEventListener("click", () => {

            let variableOptions = {};

            for (let index = 0; index < this.variableSection.variableInstances.length; index++) {

                const variableName = this.variableSection.variableInstances[index].getVariableName();

                const values = this.variableSection.variableInstances[index].getValues();

                try {
                    const minimum = new Decimal(values.minimum);

                    const maximum = new Decimal(values.maximum);

                    const order = new Decimal(values.order);

                    const log10 = order.log();

                    if (!log10.isInt()) {
                        alert(`Order of magnitude for variable named "${variableName}" must be a power of 10.`);
                        return;
                    }

                    variableOptions[variableName] = {
                        minimum,
                        maximum,
                        log10
                    }
                } catch (e) {
                    if ( e instanceof Error && /DecimalError/.test(e.message) ) {
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
                const newQuestion = new AutoQuestion(questionNumber, variableOptions);

                generatedQuestions.appendChild(newQuestion.root);
            }
        })
    }
}