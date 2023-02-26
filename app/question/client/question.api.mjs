export default class QuestionAPI {
    static questionId = parseInt(window.location.pathname.match(/([0-9]+)$\/?/g)[0]);
    static async get() {
        return (await fetch(`/question/api/${getQuestionId()}`)).json();
    }
    static async createStep() {
        return parseInt(await (await fetch(`/question/api/${getQuestionId()}/createStep`)).text());
    }
    static async getSteps() {
        return (await fetch(`/question/api/${getQuestionId()}/getSteps`)).json();
    }
    static async getPrompt() {
        return (await fetch(`/question/api/${getQuestionId()}/getPrompt`)).json();
    }
    static moveStep(selected, targeted) {
        fetch(`/question/api/${getQuestionId()}/moveStep/${selected}/${targeted}`);
    }
    static deleteStep(selected) {
        return fetch(`/question/api/${getQuestionId()}/deleteStep/${selected}`);
    }
    static async getVariables() {
        return (await fetch(`/question/api/${getQuestionId()}/getVariables`)).json();
    }
    static createFunction(section, functionType) {
        return fetch(`/question/api/${getQuestionId()}/createFunction/${section}/${functionType}`);
    }
    static deleteFunction(section, index) {
        return fetch(`/question/api/${getQuestionId()}/deleteFunction/${section}/${index}`);
    }
    static createBlock(blockAddress, blockData) {
        return fetch(`/question/api/${getQuestionId()}/createBlock/${blockAddressToEndpoint(blockAddress)}/${blockData.blockType}/${blockDataToParams(blockData)}`);
    }
    static deleteBlock(blockAddress) {
        return fetch(`/question/api/${getQuestionId()}/deleteBlock/${blockAddressToEndpoint(blockAddress)}`);
    }
    static editBlock(blockAddress, newValue) {
        return fetch(`/question/api/${getQuestionId()}/editBlock/${blockAddressToEndpoint(blockAddress)}/${newValue}`);
    }
    static editFunction(functionAddress, newValue) {
        return fetch(`/question/api/${getQuestionId()}/editFunction/${functionAddressToEndpoint(functionAddress)}/${newValue}`)
    }
}

function blockAddressToEndpoint(blockAddress) {
    return `${blockAddress.sectionIndex}/${blockAddress.functionIndex}/${blockAddress.path.join("_")}`;
}

function functionAddressToEndpoint(functionAddress) {
    return `${functionAddress.sectionIndex}/${functionAddress.functionIndex}`;
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

function getQuestionId() {
    return QuestionAPI.questionId;
}