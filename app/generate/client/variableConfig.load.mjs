import VariableConfig from "../../assets/VariableMenu/VariableConfig.mjs";
import QuestionAPI from "../../question/client/question.api.mjs";

const variables = QuestionAPI.getVariables();

const variableSection = new VariableConfig(await variables);

const variableConfig = document.querySelector(".variable-config");

variableConfig.appendChild(variableSection.root);