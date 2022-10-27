export default class QuestionAPI {
    static questionId = parseInt(window.location.pathname.match(/([0-9]+)$/g)[0]);
    static async get() {
        return (await fetch(`/question/api/${QuestionAPI.questionId}`)).json();
    }
    static async createStep() {
        return parseInt(await (await fetch(`/question/api/${QuestionAPI.questionId}/createStep`)).text());
    }
    static async getSteps() {
        return (await fetch(`/question/api/${QuestionAPI.questionId}/getSteps`)).json();
    }
    static async getPrompt() {
        return (await fetch(`/question/api/${QuestionAPI.questionId}/getPrompt`)).json();
    }
    static moveStep(selected, targeted) {
        fetch(`/question/api/${QuestionAPI.questionId}/moveStep/${selected}/${targeted}`);
    }
    static deleteStep(selected) {
        return fetch(`/question/api/${QuestionAPI.questionId}/deleteStep/${selected}`);
    }
    static async getVariables() {
        return (await fetch(`/question/api/${QuestionAPI.questionId}/getVariables`)).json();
    }
}