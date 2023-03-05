import QuestionAPI from "./question.api.mjs";
import { VariableSection } from "../../assets/VariableMenu/VariableSection.mjs";

const variableNames = QuestionAPI.getVariables();


const variableSection = new VariableSection(await variableNames);

const variableEditor = document.querySelector(".variable-editor");

variableEditor.appendChild(variableSection.root);