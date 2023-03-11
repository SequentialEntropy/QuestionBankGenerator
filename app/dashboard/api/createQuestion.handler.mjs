import { createQuestion as cQ } from "../../question/question.mjs"

export default async function createQuestion(req, res) {
    const questionName = req.body.questionName;

    const question = await cQ({
        owner: req.session.userId,
        name: questionName
    });

    const questionId = question.getId();

    req.user.addQuestion(questionId);

    res.statusCode = 201;
    
    res.json({
        message: "Success",
        questionId
    })
}