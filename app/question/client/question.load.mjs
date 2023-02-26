import QuestionAPI from "./question.api.mjs";
import SectionShelf from "../../assets/Sections/SectionShelf.mjs";

const prompt = QuestionAPI.getPrompt();
const steps = QuestionAPI.getSteps();

const sectionShelf = new SectionShelf(await prompt, await steps);

document.body.appendChild(sectionShelf.root);