import { createQuestion as cQ, getQuestionById } from "../../question/question.mjs"

export default async function copyQuestion(req, res) {

    const sharedQuestionId = parseInt(req.params.questionId);

    if (isNaN(sharedQuestionId)) {
        res.sendStatus(400);
        return
    }

    const sharedQuestions = req.user.getSharedQuestions();

    if (!sharedQuestions.includes(sharedQuestionId)) {
        res.sendStatus(400)
        return
    }

    const sharedQuestionInstance = await getQuestionById(sharedQuestionId);

    const newQuestionName = `Copy of ${sharedQuestionInstance.getName()}`

    const newQuestion = await cQ({
        owner: req.session.userId,
        name: newQuestionName,
        variables: sharedQuestionInstance.getVariables(),
        prompt: sharedQuestionInstance.getPrompt(),
        steps: sharedQuestionInstance.getSteps()
    });

    const newQuestionId = newQuestion.getId();

    req.user.addQuestion(newQuestionId);

    res.statusCode = 201;

    res.json({
        message: "Success",
        id: newQuestionId,
        name: newQuestionName
    })
}