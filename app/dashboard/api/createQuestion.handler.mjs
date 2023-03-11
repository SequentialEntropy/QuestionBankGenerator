import { createQuestion as cQ } from "../../question/question.mjs"

export default async function createQuestion(req, res) {
    const question = await cQ(req.session.userId);

    req.user.addQuestion(question.getId());

    res.statusCode = 201;
    
    res.json({
        message: "Success"
    })
}