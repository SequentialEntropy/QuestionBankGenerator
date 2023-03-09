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

const generateButton = new GenerateButton(variableSection, generateSection);
generateConfig.appendChild(generateButton.root);