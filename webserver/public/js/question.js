// console.log(window.location.pathname);

const questionId = parseInt(window.location.pathname.match(/([0-9]+)$/g)[0]);

console.log(questionId);