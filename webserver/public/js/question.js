import SectionsShelf from "./SectionsShelf.js";

const questionId = parseInt(window.location.pathname.match(/([0-9]+)$/g)[0]);

const sectionEditor = (new SectionsShelf(
    questionId
)).init();