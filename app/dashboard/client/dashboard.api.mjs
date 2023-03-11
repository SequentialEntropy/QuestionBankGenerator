export default class DashboardAPI {
    static async createQuestion(questionName) {
        const response = await send("POST", "createQuestion", {
            questionName
        })
        const result = response.json()
        return result
    }
    
    static deleteQuestion(id) {
        fetch(`/dashboard/api/deleteQuestion/${id}`)
    }
    
    static async getQuestions() {
        const response = await fetch("/dashboard/api/getQuestions");
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