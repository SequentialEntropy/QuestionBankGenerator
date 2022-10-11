import QuestionAPI from "./QuestionAPI.js";
import SectionShelf from "./SectionShelf.js";

console.log(await QuestionAPI.get());

console.log(await QuestionAPI.getSteps());

// const questionId = parseInt(window.location.pathname.match(/([0-9]+)$/g)[0]);

// const sectionEditor = (new SectionsShelf(
//     questionId
// )).init();

SectionShelf.init();