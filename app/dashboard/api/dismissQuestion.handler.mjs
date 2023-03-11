export default function dismissQuestion(req, res) {

    const questionId = parseInt(req.params.questionId);

    if (isNaN(questionId)) {
        res.sendStatus(400);
        return
    }

    if (!req.user.dismissQuestion(questionId)) {
        res.sendStatus(404);
        return
    }

    res.statusCode = 200;
    
    res.json({
        message: "Success"
    })
}