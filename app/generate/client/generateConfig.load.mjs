import VariableConfig from "../../assets/Generate/VariableConfig.mjs";
import GenerateConfig from "../../assets/Generate/GenerateConfig.mjs";
import GenerateButton from "../../assets/Generate/GenerateButton.mjs"

import QuestionAPI from "../../question/client/question.api.mjs";

const generateConfig = document.querySelector(".generate-config");

const variables = QuestionAPI.getVariables();
const variableSection = new VariableConfig(await variables);
generateConfig.appendChild(variableSection.root);

const generateSection = new GenerateConfig();
generateConfig.appendChild(generateSection.root);

const prompt = QuestionAPI.getPrompt();
const steps = QuestionAPI.getSteps();

const generateButton = new GenerateButton(variableSection, generateSection, await prompt, await steps);
generateConfig.appendChild(generateButton.root);