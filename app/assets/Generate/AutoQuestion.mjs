export default class AutoQuestion {
    createRoot() {
        return document.createElement("div");
    }
    constructor(questionNumber, variableOptions) {
        this.root = this.createRoot();

        this.questionNumber = questionNumber;
        this.variableOptions = variableOptions;

        this.root.textContent = this.questionNumber;
    }
}