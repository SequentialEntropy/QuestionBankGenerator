// console.log(window.location.pathname);

import SectionsShelf from "./SectionsShelf.js";

const questionId = parseInt(window.location.pathname.match(/([0-9]+)$/g)[0]);

console.log(questionId);

// let steps;

// async function getSteps() {
//     const response = await fetch(`/question/api/${questionId}/getSteps`);
//     steps = response.json();
//     console.log(await steps);
// }

// getSteps();

const sectionShelf = await SectionsShelf.init(
    document.querySelector(".SectionsShelf"),
    questionId
);

console.log(sectionShelf);