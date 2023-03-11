import { deleteQuestion as dQ } from "../../question/question.mjs";

export default function deleteQuestion(req, res) {

    const questionId = parseInt(req.params.questionId);

    if (isNaN(questionId)) {
        res.sendStatus(400);
        return
    }

    if (!req.user.removeQuestion(questionId)) {
        res.sendStatus(404);
        return
    }

    if (!dQ(questionId)) {
        res.sendStatus(404);
        return
    }

    res.statusCode = 200;
    
    res.json({
        message: "Success"
    })
}