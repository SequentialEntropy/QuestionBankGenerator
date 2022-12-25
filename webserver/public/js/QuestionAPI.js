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
    static createFunction(section, functionType) {
        return fetch(`/question/api/${QuestionAPI.questionId}/createFunction/${section}/${functionType}`);
    }
    static deleteFunction(section, index) {
        return fetch(`/question/api/${QuestionAPI.questionId}/deleteFunction/${section}/${index}`);
    }
    static createBlock(address, blockData) {
        return fetch(`/question/api/${QuestionAPI.questionId}/createBlock/${addressToEndpoint(address)}/${blockData.blockType}/${blockDataToParams(blockData)}`);
    }
    static deleteBlock(address) {
        return fetch(`/question/api/${QuestionAPI.questionId}/deleteBlock/${addressToEndpoint(address)}`);
    }
}

function addressToEndpoint(address) {
    return `${address.sectionIndex}/${address.functionIndex}/${address.path.join("_")}`
}

function blockDataToParams(blockData) {
    let params;
    switch (blockData.blockType) {
        case "Variable":
            params = blockData.variableName;
            break;
        case "Operation":
            params = blockData.operationName;
            break;
    }
    return params;
}