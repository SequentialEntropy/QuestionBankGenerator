import QuestionAPI from "./QuestionAPI.js";
import SectionShelf from "./SectionShelf.js";

const prompt = QuestionAPI.getPrompt();
const steps = QuestionAPI.getSteps();

const sectionShelf = new SectionShelf(await prompt, await steps);

document.body.appendChild(sectionShelf.root);