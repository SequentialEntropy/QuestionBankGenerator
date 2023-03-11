export default class DashboardAPI {
    static async createQuestion(questionName) {
        const response = await send("POST", "createQuestion", {
            name: questionName
        })
        const result = response.json()
        return result
    }
    
    static deleteQuestion(id) {
        fetch(`/dashboard/api/deleteQuestion/${id}`)
    }
    
    static async shareQuestion(questionId, recipentName) {
        const response = await send("POST", "shareQuestion", {
            id: questionId,
            recipent: recipentName
        })
        const result = response.json()
        return result
    }
    
    static dismissQuestion(id) {
        fetch(`/dashboard/api/dismissQuestion/${id}`)
    }

    static async getQuestions() {
        const response = await fetch("/dashboard/api/getQuestions");
        const result = response.json()
        return result
    }

    static async getSharedQuestions() {
        const response = await fetch("/dashboard/api/getSharedQuestions");
        const result = response.json()
        return result
    }

    static async copyQuestion(questionId) {
        const response = await fetch(`/dashboard/api/copyQuestion/${questionId}`);
        const result = response.json()
        return result
    }
}

async function send(method, endpoint, body) {
    return await fetch(`/dashboard/api/${endpoint}`, {
        method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}