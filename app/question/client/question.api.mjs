export default class QuestionAPI {
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
    static async createFunction(section, functionData) {
        const response = send("POST", `createFunction/${section}`, functionData);
        const json = (await response).json();
        return json;
    }
    static deleteFunction(section, index) {
        return fetch(`/question/api/${getQuestionId()}/deleteFunction/${section}/${index}`);
    }
    static async createBlock(blockAddress, blockData) {
        const response = send("PUT", `createBlock/${blockAddressToEndpoint(blockAddress)}`, blockData);
        const json = (await response).json();
        return json;
    }
    static deleteBlock(blockAddress) {
        return fetch(`/question/api/${getQuestionId()}/deleteBlock/${blockAddressToEndpoint(blockAddress)}`);
    }
    static async editBlock(blockAddress, data) {
        const response = send("PUT", `editBlock/${blockAddressToEndpoint(blockAddress)}`, data);
        const json = (await response).json();
        return json;
    }
    static async editFunction(functionAddress, data) {
        const response = send("PUT", `editFunction/${functionAddressToEndpoint(functionAddress)}`, data);
        const json = (await response).json();
        return json;
    }
}

function blockAddressToEndpoint(blockAddress) {
    return `${blockAddress.sectionIndex}/${blockAddress.functionIndex}/${blockAddress.path.join("_")}`;
}

function functionAddressToEndpoint(functionAddress) {
    return `${functionAddress.sectionIndex}/${functionAddress.functionIndex}`;
}

function getQuestionId() {
    return parseInt(window.location.pathname.match(/([0-9]+)$\/?/g)[0]);
}

async function send(method, endpoint, body) {
    return await fetch(`/question/api/${getQuestionId()}/${endpoint}`, {
        method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}