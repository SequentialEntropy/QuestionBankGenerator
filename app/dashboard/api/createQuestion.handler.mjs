import { createQuestion as cQ } from "../../question/question.mjs"

export default function createQuestion(req, res) {
    if (!cQ(req.session.userId)) {
        res.sendStatus(403);
        return
    }

    res.statusCode = 201;
    
    res.json({
        message: "Success"
    })
}